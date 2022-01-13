import { program } from 'commander'
//import { raw } from 'core-js/core/string'
import fs from 'fs'
import { parseBalanceMap } from '../src/parse-balance-map'

program
  .version('0.0.0')
  .requiredOption(
    '-i, --input <path>',
    'input JSON file location containing a map of account addresses to string balances'
  )

program.parse(process.argv)
let json = '';
if(json = JSON.parse(fs.readFileSync(program.input, { encoding: 'utf8' })))
{

  console.log("KIM IS ALRIGHT I GUESS, JUST WANTED SOME POON...");
}
else{

  console.log("I LOVE KIMS TITS")
}

if (typeof json !== 'object') throw new Error('Invalid JSON')
// Stringed & Parsed JSON
let fileContents = JSON.stringify(parseBalanceMap(json));
// Parsed, ParsedBalanceMap JSON
let fileContents2 = parseBalanceMap(json);
// Raw Format JSON
let fileContents3 = JSON.stringify(json);

//Parse through JSON to form arrays
let arr =  JSON.parse(fs.readFileSync(program.input, { encoding: 'utf8' }));

fs.writeFileSync('./scripts/data.json', fileContents , 'utf-8');
var rawData = fs.readFileSync('./scripts/data.json', 'utf-8');
//console.log(rawData);
var parsedData = JSON.parse(rawData);

var count = Object.keys(arr).length;


fs.writeFileSync('./scripts/accounts.json', JSON.stringify(parsedData, null, "\t"), 'utf-8');
console.log(count);

console.log(fileContents2.merkleRoot);


 // console.log(map1.values())
/*   for (let [key, value] of rawData) {
    console.log(key + " = " + value);
  } */
//console.log(rawData);