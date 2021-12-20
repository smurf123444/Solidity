
import fs from 'fs'
//var json = require('./data.json'); 
let i = 0;
let j = 0;
//create function that takes in list of addresses , then itterates through each of them for the array.
var test = fs.readFileSync('./scripts/data.json', { encoding: 'utf8' })
const cipherChars = [...test];
var arr = Array();
let map1 = new Map();

function createArrayWithAddresses(jsonObject: JSON){
   for (let [key, value] of Object.entries(jsonObject)) {
    console.log(`${key}: ${value}`);
    arr[i++] = value;
  }  
}
createArrayWithAddresses(JSON.parse(test));

var count = Object.keys(arr).length;

 var length = test.length

 while (j < count)
 {
  console.log(arr[2]['0xfB6F3F88D11206439db6E6D5c5277E53b866d002'])
 }
console.log(arr[2]['0xfB6F3F88D11206439db6E6D5c5277E53b866d002'])

/* while(j < length)
{
  if(j >= 957 && j % 841 === 0)
  {
    console.log("itteration : " + j + "  Out of : " + test.length)
/*     cipherChars[j] = ',';
    test = cipherChars.join() 
    test = test.substring(0, j) + "TEST" + test.substring(j, test.length);

  }
  j++;
} 
 */

//test = test.substring(0, 849) + "," + test.substring(849, test.length);

//fs.writeFileSync('./scripts/data.json', test, 'utf-8');
//const cipherChars = [...json];
/* var arr = Array();
let map1 = new Map();
function createArrayWithAddresses(jsonObject: JSON){
   for (let [key, value] of Object.entries(jsonObject)) {
    console.log(`${key}: ${value}`);
    arr[i++] = value;
  }  
}
var count = Object.keys(arr).length;
createArrayWithAddresses(json); */
/* while(j < json.length)
{
  if(j >= 849 || j % 722 === 0)
  {
    cipherChars[j] = ',';
    json = cipherChars.join()
  }
} */

fs.writeFileSync('./scripts/data.json', test , 'utf-8');
//createArrayWithAddresses(json);
/* for (let [key] of Object.entries(merkle)) {
    //console.log(`${key}: ${value}`);
    //arr[i++] = key;
  }  */ 
//console.log(arr[j].toString())
/* while (j < arr.length){
while(i < json.claims[arr[j].toString()].proof.length)
{
    
    if (i % 17 == 0)
    {
        json.claims[arr[j].toString()].proof = json.claims[arr[j].toString()].proof + ',';
    }
    i++;
}
j++;
} */
//console.log("%j",json.claims['0xc9c47745D1C7dAC5bc8Abb44c17470e98d3E58AC'].proof)
/* if(parsed.proof[i] < parsed.proof.length){
   // console.log(parsed.proof[i++]);
} */