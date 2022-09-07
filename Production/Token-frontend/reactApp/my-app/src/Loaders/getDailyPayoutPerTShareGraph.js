import React, {} from "react";
import Web3 from 'web3'
import { useQuery, gql } from "@apollo/client";
import {xfLobbyDailyData} from "../Querys/Queries";
import Table from 'react-bootstrap/Table';
import Plot from 'react-plotly.js';
import '../TransformLobbyOld/styles.css';  
import moment from 'moment';
moment().format();
var BigNumber = require('big-number');
let tits = []
let i = 0
export const GetPayoutDailyDataGraph = (props) => {
  const { error, loading, data } = useQuery(xfLobbyDailyData());


 if(loading){
   return(<div>Loading...</div>)
 }
 else{
  
  
  data.dailyDataUpdates.map((data) => {
    
    tits[i] = [data.beginDay, data.payoutPerTShare, data.endDay, data.lobbyEth, data.lobbyHexPerEth,data.lobbyHexAvailable, data.shares, data.payout]
   i++
   })
 }

i = 0;
function multiDimensionalUnique(arr) {
  var uniques = [];
  var itemsFound = {};
  for(var i = 0, l = arr.length; i < l; i++) {
      var stringified = JSON.stringify(arr[i]);
      if(itemsFound[stringified]) { continue; }
      uniques.push(arr[i]);
      itemsFound[stringified] = true;
  }
  return uniques;
}

/* while (i < ass.length){
console.log("Ass length: " + ass.length)
console.log("beginDay:  " + ass[i][0]);
console.log("payoutPerTShare " + ass[i][1]);
console.log("endDay " + ass[i][2]);
console.log("lobbyEth " + ass[i][3]);
console.log("lobbyHexPerEth " + ass[i][4]);
console.log("lobbyHexAvailable " + ass[i][5]);
console.log("shares: "+ ass[i][6]);
console.log("payout " + ass[i][7]); 
i++;
} */
i = 0
let xPayout = []
let yPayout = []
let xlobbyHexAvailable = []
let ylobbyHexAvailable = []
let ass = multiDimensionalUnique(tits);
while(i < ass.length)
{
xPayout[i] = ass[i][0];
yPayout[i] = ass[i][1];
/* console.log(ass.length);
console.log("xPayout : " + xPayout)
console.log("yPayout : " + yPayout) */
i++;
}
i = 0;
while(i < ass.length)
{
  xlobbyHexAvailable[i] = ass[i][0];
  ylobbyHexAvailable[i] = ass[i][5];
/* console.log(ass.length);
console.log("xlobbyHexAvailable : " + xlobbyHexAvailable)
console.log("ylobbyHexAvailable : " + ylobbyHexAvailable) */
i++;
}
let plot = <Plot
data={[
{
y: yPayout,
  type: 'scatter',
  mode: 'markers',
  marker: {color: 'cyan'},
},

]}
layout={{
  font:{
    family: 'Arial',
    size: 12,
    color: 'rgb(255,255,255)'
  },
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
  width: 1000, height: 500, title: 'Total Payout Per T-Share'}}
/> 

return(
  <div>

    <center>{plot}</center>

</div>

)
}
export default GetPayoutDailyDataGraph;
