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
/* let json = '';
if(json = JSON.parse(fs.readFileSync('./scripts/data.json', { encoding: 'utf8' })))
{

  console.log("FUCK NIGGERS AND ASIAN PEOPLe");
}
else{

  console.log("NIGGERS!!!")
} */

//if (typeof json !== 'object') throw new Error('Invalid JSON')
//Parse through JSON to form arrays
let arr =  fs.readFileSync('./scripts/data.json', { encoding: 'utf8' });

//fs.writeFileSync('./scripts/data.json', fileContents , 'utf-8');
var rawData = fs.readFileSync('./scripts/data.json', 'utf-8');

var formatedData = parseBalanceMap(JSON.parse(rawData));

var stringedFormatedData = String(formatedData);
fs.writeFileSync('./scripts/data.json', JSON.stringify(formatedData, null, 2) , 'utf-8');
//console.log(rawData);
console.log(formatedData);
//console.log(stringedFormatedData);
//console.log(rawData);
//console.log(rawData);
//var parsedData = rawData);
/* const map1 = new Map();
var count = Object.entries(json).length;
for (let [key, value] of Object.entries(arr)) {
  //console.log(`${key}: ${value}`);
  map1.set(key, value);
}  
console.log(count); */

//console.log(arr.merkleRoot);


 // console.log(map1.values())
/*   for (let [key, value] of rawData) {
    console.log(key + " = " + value);
  } */
//console.log(rawData);