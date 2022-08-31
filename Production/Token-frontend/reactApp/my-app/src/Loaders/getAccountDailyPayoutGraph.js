import React, {} from "react";
import { useQuery, gql } from "@apollo/client";
import {xfAccountDailyData} from "../Querys/Queries";
import Table from 'react-bootstrap/Table';
import Plot from 'react-plotly.js';
import '../TransformLobby/styles.css';  
import moment from 'moment';


moment().format();

var plotArrayX = []

export const GetAccountDailyDataGraph = (props) => {
  const { error, loading, data } = useQuery(xfAccountDailyData(props.account, props.currentDay));

  var daily = new Array();

for (var i = 0; i < daily.length; i++) {
  daily[i] = new Array();
}

var starts = new Array();

for (var i = 0; i < starts.length; i++) {
  starts[i] = new Number();
}

let userActivity = {
  id: new Array,
  startDay: new Number,
  endDay: new Number,
  stakedTshares: new Number,
  stakeCounter: 0,
  data: {
    tsharesArray: new Number()
  }
};


var graph = new Array;

for (var i = 0; i < graph.length; i++) {
  graph[i] = new Number();
}




 if(loading){
   return(<div>Loading...</div>)
 }
 else{
  
  /*
  THIS IS FOR FINDING
1. Available HEx for day (Transform)
2. Hex per Eth calculation (Transform)
3. Total ETH in lobby (Transform)
4. Payout per tshare (for calculating daily rewards) (Stake)
5. day for which this information is valid. (Transform & Stake)
 dailyDataUpdates(orderDirection:desc)
  {
    beginDay
    payoutPerTShare
    endDay
    lobbyEth
    lobbyHexPerEth
    lobbyHexAvailable
    shares
    payout
  }
  */
  data.dailyDataUpdates.map((data) => {
    daily[i] = [data.beginDay, data.payoutPerTShare, data.endDay, data.lobbyEth, data.lobbyHexPerEth,data.lobbyHexAvailable, data.shares, data.payout]
   i++
   })
   i = 0
   data.stakeStarts.map((data) => {
    starts[i] = [data.id, data.stakeId, data.stakedDays, data.stakeTShares, data.startDay,data.endDay, (data.stakedHearts / 100000000)]
   i++
   })
  }

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

  let allStakes = multiDimensionalUnique(starts);
  let dailyInfo = multiDimensionalUnique(daily);
  var i, j, entry

i=0;

while(i < starts.length) {
  userActivity.id[i] = starts[i][0];
  userActivity.startDay[i] = starts[i][4];
  userActivity.endDay[i] = starts[i][5];
  userActivity.stakedTshares[i] = starts[i][3];
  i++;
} 

//console.log(dailyInfo.length)
i = 0;

var another = new Number;

while (i < dailyInfo.length)
{
  another[i] = dailyInfo[i++][1];
}
i = 0;
//console.log(starts.length)
userActivity.stakeCounter = starts.length
while(i < starts.length)
{
  userActivity.data.tsharesArray[i]= another;
  userActivity.stakeCounter = userActivity.stakeCounter++;
  i++
}

var another1 = [];
var j, h , r = 0
i=0;
while (i < userActivity.stakeCounter){
  graph[i] = {}
  i++;
}
i=0;
while (i < userActivity.stakeCounter){
 // debugger;

 
    
  h = userActivity.endDay[i]
  if (h >= props.currentDay)
  {
    h = props.currentDay - 1
  }
  r = userActivity.stakedTshares[i]
/* 
  while (j < h){
  graph[i][j] = another1[j] = r * Number(userActivity.data.tsharesArray[i][j])
    //graph[i][j] = another1[j] = another1[j] + r * Number(userActivity.data.tsharesArray[i][j])
    if(another1[j]>0)
    { 
   
  //  graph[i][j] = another1[j] = another1[j] + r * Number(userActivity.data.tsharesArray[i][j])
    }else{
      another1[j] =  r * Number(userActivity.data.tsharesArray[i][j])
    }

 if(j < props.currentDay - 1)
 {
 plotArrayX[j] = another1[j]
 }
 j++;
  } */
  for (let j = userActivity.startDay[i]; j < h; j++) {
    graph[i][j] = another1[j] = r * Number(userActivity.data.tsharesArray[i][j])
    //graph[i][j] = another1[j] = another1[j] + r * Number(userActivity.data.tsharesArray[i][j])
    if(another1[j]>0)
    { 
   
  //  graph[i][j] = another1[j] = another1[j] + r * Number(userActivity.data.tsharesArray[i][j])
    }else{
      another1[j] =  r * Number(userActivity.data.tsharesArray[i][j])
    }

 if(j < props.currentDay - 1)
 {
 plotArrayX[j] = another1[j]
 }
  }







i++;
}
i = 0;
/* while(i < props.currentDay)
{
if(plotArrayX[i] == undefined)
{
  plotArrayX[i] = 0
  i++
}
i++;
} */
console.log(userActivity)
console.log(graph)
console.log(userActivity.startDay[1])

plotArrayX = plotArrayX.slice(userActivity.startDay[1])
/* 
write the array into the userActivity structure for the loop that takes in
 daily info length and displays daily info tshare for each of those days */
 return(
  <div>
<Plot
data={[
{

  y: plotArrayX,
  x0: userActivity.startDay[1],
  type: 'scatter',
  mode: 'markers+lines',
  marker: {color: 'blue'},
},
]}
layout={{width: 1000, height: 500, title: 'TESTING'}}
/>
</div>
)
}
export default GetAccountDailyDataGraph;
