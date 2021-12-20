import * as fs from 'fs';
let obj = [];
  let i = 0;
 let file = fs.readFile('./exportTest.json', (err, data) => {
    if (err) throw err;
  
while (i < data.length)
{obj[i] = data.toString().split(",")[i]

i++;
}
 


})
fs.writeFile('./exported.js', obj, (err) => {
    // In case of a error throw err.
    if (err) throw err;
    
})
//let obj = JSON.stringify(file);
// opens the file for writing

