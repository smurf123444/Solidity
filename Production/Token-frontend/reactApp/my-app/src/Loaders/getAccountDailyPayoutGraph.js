import React, {} from "react";
import { useQuery, gql } from "@apollo/client";
import {xfAccountDailyData} from "../Querys/Queries";
import Table from 'react-bootstrap/Table';
import Plot from 'react-plotly.js';
import '../TransformLobby/styles.css';  
import moment from 'moment';


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
  stakedTshares: new Number,
  stakeCounter: 0,
  data: {
    tsharesArray: new Number()
  }
};
export const GetAccountDailyDataGraph = (props) => {
  const { error, loading, data } = useQuery(xfAccountDailyData(props.account, props.currentDay));
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
    starts[i] = [data.id, data.stakeId, data.stakedDays, data.stakeTShares, data.startDay,data.endDay, (data.stakedHearts / 100000000)]
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
//assign values of earned HEX for each day of specific stake, within a two dimmensional array called "graph"
while (i < userActivity.stakeCounter){
  h = userActivity.endDay[i]
  //make sure not to exceed current day
  if (h >= props.currentDay)
  {
    h = props.currentDay - 1
  }
  //set t-shares for stake
  r = userActivity.stakedTshares[i]
  for (let j = userActivity.startDay[i]; j < daily.length; j++) {
    //daily tshare payout * amount of tshares held
    graph[i][j] = userActivity.stakedTshares[i] * daily[j][1]
  }
i++;
}

i = 0;

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
    marker: {color: 'black'},
   
  },
  
  ]}
  layout={{width: 390, height: 250, title: 'Stake # ' + ++index }}
  config={{responsive: true}}
  /> 
  )
})

 console.log(graph) 

 return(
  <div>
{itemList}
</div>
)
}
export default GetAccountDailyDataGraph;
