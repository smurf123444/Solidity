import React, {} from "react";
import { useQuery, gql } from "@apollo/client";
import {xfAccountDailyData} from "../Querys/Queries";
import Plot from 'react-plotly.js';
import '../TransformLobbyOld/styles.css';  
import moment from 'moment';
import Web3 from 'web3'
import {Card} from 'react-bootstrap';
let GLOBAL = require('../globals.js');
moment().format();
var daily = [];

for (var i = 0; i < daily.length; i++) {
  daily[i] = [];
}

var starts = [];

for (var i = 0; i < starts.length; i++) {
  starts[i] = [];
}
let userActivity = {
  id: new Array,
  startDay: new Number,
  endDay: new Number,
  totalHexEarned: new Number,
  stakedTshares: new Number,
  stakeCounter: 0,
  stakedHex: new Number,
 
  data: {
    tsharesArray: new Number()
  }
};

let earnedHex = new Number;
//0x5bC8bf5A75D221fF30b2c2B2a7235D6aeEFF4A84

export const GetAccountDailyDataGraph = (props) => {
  const { error, loading, data } = useQuery(xfAccountDailyData(window.sessionStorage.getItem("account")), '1000');
  var graph = new Array();
  for (var i = 0; i < graph.length; i++) {
    graph[i] = new Array();
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
   // console.log(daily[i])
   i++
   })
   i = 0
   data.stakeStarts.map((data) => {
    starts[i] = [data.id, data.stakeId, data.stakedDays, data.stakeTShares, data.startDay,data.endDay, Web3.utils.fromWei(data.stakedHearts,"gwei")]
   i++
   })
  }


  var i;

i=0;
//assign vars to object
userActivity.stakeCounter = starts.length
while(i < starts.length) {
  userActivity.id[i] = starts[i][0];
  userActivity.startDay[i] = starts[i][4];
  userActivity.endDay[i] = starts[i][5];
  userActivity.stakedTshares[i] = starts[i][3];
  userActivity.stakedHex[i] = starts[i][6];
  i++;
} 

i = 0;
//create array of all days
var another = [];

while (i < daily.length)
{
  another[i] = daily[i++][1];
}
i = 0;
//assign days array to each object for computation access
while(i < starts.length)
{
  userActivity.data.tsharesArray[i]= another;
  i++
}
//write out the graph array as empty to initalize
var j, h , r = 0
i=0;
while (i < userActivity.stakeCounter){
  graph[i] = []
  i++;
}
i=0;
console.log(daily)
//assign values of earned HEX for each day of specific stake, within a two dimmensional array called "graph"
while (i < userActivity.stakeCounter){
  h = Number(userActivity.endDay[i])
  let debugJ=userActivity.startDay[i]
  console.log(h)
  //make sure not to exceed current day

  if (Number(userActivity.endDay[i]) > Number(props.currentDay))
  {
    h = 1000
  }
  else{
    h = userActivity.endDay[i]
  }
  //set t-shares for stake
  r = userActivity.stakedTshares[i]
  for (let j = Number(userActivity.startDay[i]); j < h; j++) {
    //daily tshare payout * amount of tshares held
    graph[i][j] = userActivity.stakedTshares[i] * daily[j][1]

   
  }
i++;
}


i = 0;
var totalEarnedHex = 0
//total hex accumulated for EACH stake
for(var i=0, n=graph.length; i < n; i++) 
{ 
  earnedHex[i] = graph[i].reduce(function(pv, cv) { return pv + cv; }, 0);

}


//Total hex accumulated with ALL stakes. 
for(var i=0, n=userActivity.stakeCounter; i < n; i++) 
{ 
  totalEarnedHex = Number(earnedHex[i]) + Number(totalEarnedHex)

}


//console.log(totalEarnedHex)


let itemList=[];

//create a plot component for each stake, where itemList is the component array for rendering...
graph.forEach((item,index)=>{
  itemList.push(
  <Plot
  data={[
  {
    y: graph[index],
    type: 'scatter',
    mode: 'markers',
    marker: {color: 'cyan'},
   
  },
  ]}
  layout={
    {

      width: 500, 
    height: 500,
     title: 'Stake # ' + ++index + "<br> Stake ID: " + Web3.utils.hexToNumberString(userActivity.id[--index]) +  " <br>Start: DAY " + 
     userActivity.startDay[index] + "  End: DAY " 
     + userActivity.endDay[index]
      + "<br> Staked T-Shares: "+ userActivity.stakedTshares[index] + "<br> Staked Hex:  " 
      + userActivity.stakedHex[index] * 10 + " <br> Hex earned: " 
      +   earnedHex[index++], 
  margin:{
    l: 30,
    r:30,
    b: 30,
    t: 250,
    pad: 1
  },
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
    yaxis: {
      showline: false,
      showgrid: true,
      showticklabels: true,
    },
    font:{
      family: 'Arial',
      size: 12,
      color: 'rgb(255,255,255)'
    },
    xaxis: {
      showgrid: false,
      zeroline: false,
      showline: false,
      showticklabels: true
    },
  }}
  config={{responsive: true}}
  /> 
  )
})

 //console.log(graph) 

 return(

  <div>
<br></br>




<center>
<img src={require('./lacyClaireInDesert.png')} style={{width: 900, height: 1000, marginLeft: -530, marginTop: -455, position: 'absolute', zIndex:0}} ></img> 
  <Card style={{ 
    backgroundColor: '#transparent', 
    opacity: ".65",
    width: "45rem",
    zIndex:1,
    postion: 'relative' }}>
<br></br>
  <center> <h1 style={{color: "black"}}> Total Hex Earned: <br></br> Day 1 - 1000<br></br>{totalEarnedHex}  <img src={require('./HEXagon.png')} style={{width: 55, height: 50}}></img> </h1> 
<br></br>
</center>

  </Card>
  </center>



<h2 style={{color: "white"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Stake Stats : </h2>
<center>{itemList}</center>
</div>
)
}
export default GetAccountDailyDataGraph;