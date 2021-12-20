import * as utils from './utils'
import * as fs from 'fs'
import _ from 'lodash'
import neatCsv from "neat-csv"
import * as path from 'path'
import * as os from 'os'

interface Sacrifice {
  minedTimestamp: Date;
  transactionHash: string;
  creditAddressId: number;
  network: string;
  blockId: number;
  currency: string;
  source: string;
  creditAddress: string;
  amount: bigint;
  ignore: boolean;
  usdPrice: bigint;

  value: bigint;
  isSens: boolean;
}

const rootDir = path.join(os.homedir(), 'go', 'src', 'gitlab.com', 'pulsechaincom', 'compressed-allocations')
const input = path.join(rootDir, 'raw.csv')
const output = path.join(rootDir, 'credits.csv')

main().catch(console.error)

async function main() {
  const csv = await readCsv()
  const transformed = toPoints(appendUSDValue(csv))
  await writeCsv(transformed)
}

async function writeCsv(rows) {
  console.log('output', output, rows.length)
  return await fs.promises.writeFile(output, toCSV(rows))
}

function rowToKey(row) {
  return `${row.transactionHash}-${row.network}-${row.currency}-${row.blockId}-${row.creditAddress}`
}

function rankSource(source) {
  if (source.includes('sales/')) {
    return 0
  } else if (source.includes('dexs/')) {
    return 1
  } else if (source.includes('ccxt/')) {
    return 2
  } else {
    return 3
  }
}

function appendUSDValue(csv: Sacrifice[]): Sacrifice[] {
  // ignore prices lower than sales if a sale exists
  const values = Object.values(
    csv.reduce((cache, row) => {
      const key = rowToKey(row)
      if (!cache[key]) {
        cache[key] = row
      } else {
        // check source priority
        const currentPriority = rankSource(cache[key].source)
        const challengerPriority = rankSource(row.source)
        if (currentPriority > challengerPriority) {
          cache[key] = row
        }
      }
      // if we should ignore, and the rank source is not from a dump
      if (cache[key].ignore && rankSource(cache[key].source)) {
        delete cache[key]
      }
      return cache
    }, {} as { [key: string]: Sacrifice })
  ) as Sacrifice[]
  return values.map<Sacrifice>(({
    amount,
    usdPrice,
    source,
    blockId,
    creditAddressId,
    creditAddress,
    network,
    minedTimestamp,
    transactionHash,
    currency,
    isSens,
  }) => {
      return {
        source,
        blockId,
        creditAddressId,
        creditAddress,
        network,
        minedTimestamp: new Date(minedTimestamp),
        transactionHash,
        amount,
        usdPrice,
        value: (10000n * amount * usdPrice) / utils.decimalToBigInt('1'),
        currency,
        isSens, // TODO: identify these
      } as Sacrifice
    }) as Sacrifice[]
}

async function readCsv() {
  const file = fs.createReadStream(input)
  return await neatCsv<Sacrifice>(file, {
    mapHeaders: ({ header }) => _.camelCase(header),
    mapValues: ({ header, value }) => {
      switch(header) {
        case 'minedTimestamp':
          return new Date(value)
        case 'transactionHash':
          return value
        case 'creditAddressId':
          return +value
        case 'network':
          return value
        case 'blockId':
          return +value
        case 'currency':
          return value
        case 'source':
          return value
        case 'creditAddress':
          return value.trim()
        case 'ignore':
          return value === 't' || value === 'true'
        case 'amount':
          return utils.decimalToBigInt(value)
        case 'isSens':
          return value === 'true'
        case 'usdPrice':
          return utils.decimalToBigInt(value)
      }
    }
  })
}

function toCSV(rows: string[][]) {
  return rows.map(row => row.join(',')).join('\n')
}

function toPoints(someSacrifices: Sacrifice[]) {
  const ADDRESS_VOLUME_MAP = {
    totalVolume: 0n,
    addressToVolume: {} // add address : volume entries here
  }

  const SACRIFICE_AUDIT = {
    // add address : [audit entries], audit entry format is [date, input (dollars), points]
  }

  const FINAL_POINTS = {
    // add address : points pairs here
  } as {
    [key: string]: bigint
  }

  console.log('iterating txs')
  someSacrifices.forEach(s => {
    if (s.value === 0n) {
      return
    }
    let credits = utils.sacrificeCredits(s.value, +s.minedTimestamp, s.isSens)
    switch(utils.getBonusType(+s.minedTimestamp)) {
      case utils.BONUS_TYPE.VOLUME:
        // add to aggregate by address and increment total
        ADDRESS_VOLUME_MAP.addressToVolume[s.creditAddress] =
          (ADDRESS_VOLUME_MAP.addressToVolume[s.creditAddress] || 0n) + credits
        ADDRESS_VOLUME_MAP.totalVolume += credits
        break
      case utils.BONUS_TYPE.FLAT:
        credits = (credits * 7n) / 4n
        break
      default:
        break
    }
    FINAL_POINTS[s.creditAddress] = (FINAL_POINTS[s.creditAddress] || 0n) + credits
    // audit stuff
    SACRIFICE_AUDIT[s.creditAddress] = SACRIFICE_AUDIT[s.creditAddress] || []
    SACRIFICE_AUDIT[s.creditAddress].push([
      (new Date(Math.max(+s.minedTimestamp, utils.SACRIFICE_BEGIN))).toLocaleString('en-US', { timeZone: 'UTC' }),
      s.value,
      credits,
    ])
  })

  // convert key:value pairs into list of tuples [key, value] so we can sort by the value
  const volumesAsList = Object.keys(ADDRESS_VOLUME_MAP.addressToVolume)
    .map(k => [k, ADDRESS_VOLUME_MAP.addressToVolume[k]])
  // sort by the value (ascending)
  // cannot return a BigInt. must return a number type

  volumesAsList.sort((a, b) => a[1] > b[1] ? 1 : -1)

  let initialCoinPosition = 0n

  // Pulling tuples of [address, points]
  const bonuses = volumesAsList.map(tuple => {
    const bonus = utils.volumeBonus(ADDRESS_VOLUME_MAP.totalVolume, initialCoinPosition, tuple[1])
    initialCoinPosition += tuple[1]
    // Produce a tuple of [address, bonus]
    return [tuple[0], bonus]
  })

  // was useful to find outliers and weird stuff (junk coins resulting to 10x - 100,000x next highest)
  // fs.writeFileSync('volume-map.csv', `${volumesAsList.map(t => t.join(',')).join('\n')}`);

  // apply bonus for each address to its final points (redundant but lets you emit the bonuses separately if desired)
  bonuses.forEach(tuple => {
    SACRIFICE_AUDIT[tuple[0]].push([
      (new Date(0)).toLocaleString('en-US', { timeZone: 'UTC' }),
      ADDRESS_VOLUME_MAP.addressToVolume[tuple[0]],
      tuple[1],
    ])
    FINAL_POINTS[tuple[0]] += tuple[1]
  })

  console.log('getting points')
  const rows = Object.keys(FINAL_POINTS).map(element => (
    [element, '0x' + FINAL_POINTS[element].toString(16), FINAL_POINTS[element].toString(10)]
  )).sort((a, b) => a[0] > b[0] ? 1 : -1)
  return rows
}
