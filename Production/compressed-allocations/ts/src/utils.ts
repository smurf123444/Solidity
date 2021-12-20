import _ from 'lodash'
/**
 * This is the bonus calc function for any sacrifice from an ordered list of sacrifice sizes
 *
 * Here's an example that uses it
 *
 * const total_sacrifices = ordered_ascending.sum()
 * const bonused = ordered_ascending.map(sac_size => {
     const bonus = slice_sum2(total_sacrifices, initial_coin_position, sac_size)
     initial_coin_position += sac_size
     return [sac_size, bonus]
   })
   // this would return a list of tuples, the sacrifice size and its bonus
 *
 * @param {Number} total is the total number of points for which we are calculating bonuses
 *                   e.g. if the sacrifices were [1, 2, 3, 4, 5], then `t` = 15
 * @param {Number} s is the number points "smaller" than this block
 *                   e.g. if the sacrifices were [1, 2, 3, 4, 5] and you are calculating
 *                        the bonus for the address sacrificing `4`, then `s` = 5
 * @param {Number} magnitude is the magnitude of the sacrifice you are examining
 *                   e.g. if the sacrifices were [1, 2, 3, 4, 5] and you are calculating
 *                        the bonus for the address sacrificing `3`, then `m` = 3 (and `s` = 2)
 * @returns
 */

/**
  *   3      1          ( ( 2 * s ) + m - 1 )     m   1
  * ( - * ------- ) * ( --------------------- ) * - * -
  *   2   (t - 1)                1                1   2
  *
  */
export const volumeBonus = (total: bigint, s: bigint, magnitude: bigint) => {
  // (MAX_VOLUME_BONUS_MULTIPLIER/(t-1))*(2*s+m-1)*(m)/2
  const totalFactor = total - 1n
  const mag = ((2n * s) + magnitude - 1n)
  return (mag * magnitude * 3n) / (2n * 2n * totalFactor)
}

export const SACRIFICE_BEGIN = 1626324540000 // 2021-07-15T04:49:00Z epoch-milliseconds
const dayMs = 86400000
/**
 *
 * @param {*} ts epoch time in milliseconds for the sacrifice
 * @returns the sacrifice day for "rate" calculation minimum of day 0 (first day) for early SENS donators
 */
export const sacrificeDay = (ts) => Math.max(0, Math.floor((ts - SACRIFICE_BEGIN) / dayMs))

const fullValueDays = 5 // first 5 days of sacrifice phase
/**
 *
 * @param {Number} dollarValue value of sacrifice in USD
 * @param {Number} ts epoch time in milliseconds for the sacrifice
 * @param {boolean} fromSens flag for whether this is a SENS donation credit
 * @returns the scaled sacrifice credits, accounting for the rate of conversion based on day
 */

/**
 * we have to multiply by 100n ** (sacDay - 4) and divide by 105n ** (sacDay - 4)
 * to do the same 5% price increase that we could normally do with Math.pow(1.05, sacDay-4)
 *
 *   dollarValue   3 or 4 (sens or not)         100n ** (sacDay - 4)
 * ( ----------- * -------------------  *  ---------------------------- )
 *        1          4                          105n ** (sacDay - 4)
 */
export const sacrificeCredits = (dollarValue: bigint, ts: number, fromSens: boolean) => {
  const sacDay = sacrificeDay(ts)
  const dollarValueMultiplier = fromSens ? 3n : 4n
  // The minimum here is actually 0 since you want numerator and denominator to be 1n
  // if we're within the "full value" days
  const sacRatePower = BigInt(Math.max(0, sacDay - fullValueDays + 1))
  const sacrificeRateNumerator = (100n ** sacRatePower)
  const sacrificeRateDenominator = (105n ** sacRatePower)
  return ((dollarValue * dollarValueMultiplier * sacrificeRateNumerator) / (sacrificeRateDenominator * 4n))
}

/**
 * VOLUME bonus type must be aggregated by address so that a total volume curve can be calculated
 * FLAT bonus is a 75% bonus
 * NONE bonus is for late comers who get no bonus
 */
export const BONUS_TYPE = {
  VOLUME: 0,
  FLAT: 1,
  NONE: 2,
}

/**
 * The rules for sacrifice phase were
 *   - the first 16 days would be bonused on a "volume curve"
 *   - with days 17 to 19 getting a "flat" bonus
 *   - given the immense participation after the "end" of the sac phase,
 *     late sacrifices are allowed but are not bonused
 * @param {Number} ts epoch time in milliseconds for the sacrifice
 * @returns
 */
export const getBonusType = (ts) => {
  const sacDay = sacrificeDay(ts)
  if (sacDay < 16) {
    // first day through day 16
    return BONUS_TYPE.VOLUME
  } else if (sacDay < 19) {
    // days 17 to 19
    return BONUS_TYPE.FLAT
  } else {
    // late people
    return BONUS_TYPE.NONE
  }
}

const eighteenZeros = '0'.repeat(18)
export const decimalToBigInt = (num: string) => {
  const d = num.indexOf('.')
  if (d < 0) {
    return BigInt(num + eighteenZeros)
  }
  return BigInt(num.slice(0, d) + num.slice(d + 1, d + 1 + 18).padEnd(18, '0'))
}

export const ONEn = decimalToBigInt('1')
