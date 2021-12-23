import React, {} from "react";
import { useQuery, gql } from "@apollo/client";
import {xfAccountDailyData} from "../Querys/Queries";
import Table from 'react-bootstrap/Table';
import Plot from 'react-plotly.js';
import '../TransformLobby/styles.css';  
import moment from 'moment';


moment().format();
let earningFromStakes = []
var BigNumber = require('big-number');
let daily = []
let starts = []
let ends = []
let bang = []
let uniqueStake=[]
//collecting data
let totalAccountTShare = 0
let totalAccountTSharePayout = [[null], [null]]
let shareRates = []
let startDays = []
let endDays = []
let stakePayout = []
let copy = []
//combining data
let payoutPerDay = []
let t = 0
let d = 0
let foundDay = false


let i = 0
export const GetAccountDailyDataGraph = (props) => {
  const { error, loading, data } = useQuery(xfAccountDailyData(props.account));


 if(loading){
   return(<div>Loading...</div>)
 }
 else{
  
  
  data.dailyDataUpdates.map((data) => {
    daily[i] = [data.beginDay, data.payoutPerTShare, data.endDay, data.lobbyEth, data.lobbyHexPerEth,data.lobbyHexAvailable, data.shares, data.payout]
    stakePayout[i] = [data.endDay,data.payoutPerTShare]
   i++
   })
   i = 0
   data.stakeStarts.map((data) => {
    starts[i] = [data.id, data.stakeId, data.stakedDays, data.stakeTShares, data.startDay,data.endDay, (data.stakedHearts / 100000000)]
   i++
   })
   i = 0;
   data.stakeEnds.map((data) => {
     ends[i] = [data.id,data.stakeId , (data.stakedHearts   / 100000000), (data.payout   / 100000000), (data.penalty / 100000000 ), (data.payout / 100000000)- (data.penalty  / 100000000), data.daysLate, data.servedDays, data.stakedShares, data.prevUnlocked ]
   i++
  })
  uniqueStake = data.stakeStarts.filter(({ id }) =>
  !data.stakeEnds.some(exclude => exclude.id === id)
  );
  i = 1;
   data.dailyDataUpdates.map((data) => {
    shareRates[i] = data.payoutPerTShare
    i++
   })
   i = 0
  data.stakeStarts.map((data) => {

     totalAccountTSharePayout[i] = [(parseFloat(data.stakeTShares) + parseFloat(totalAccountTShare)), data.startDay, data.endDay]
     //console.log(data.beginDay)
     
     startDays[i] = data.startDay
     endDays[i] = data.endDay
     i++
  })
i = 0
let stakesExpanded = []

data.dailyDataUpdates.map((data) => {
 // console.log(data.stakeTShares)
    //console.log(startDays[i])
  if(startDays[i] > 0)
  {
    stakesExpanded[i] = [ startDays[i], endDays[i] ]

  }
  i++

 })
 
 i = 0
 let lengthOfStakes = []
 
 let earningsFromStakes = []
 /*
 while (totalAccountTSharePayout[i][1] <= totalAccountTSharePayout[i][2])
 {
   if (totalAccountTSharePayout[i][1] ===
 }
*/
//console.log(stakesExpanded)
   // totalAccountTShare = parseFloat(data.payoutPerTShare) * parseFloat(starts[i])
   data.stakeStarts.map((data) => {
   // console.log("END DAY: " + data.endDay + " COMPARED : " + stakesExpanded[i][1])
   // console.log("START DAY: " + data.startDay + " COMPARED : " + stakesExpanded[i][0])
    
    if(stakesExpanded[i][1] === data.endDay && stakesExpanded[i][0] === data.startDay)
    {
      lengthOfStakes[i] =  stakesExpanded[i][1] - stakesExpanded[i][0] 
    }

    i++
 })
 i = 0

  console.log(stakePayout)
i = 0
 while (i < lengthOfStakes.length)
{
  t = stakesExpanded[i][0] 
  while(t <= stakesExpanded[i][0] )
  {
   /* if(t === stakesExpanded[i][0] )
    {
      console.log("SPIT THIS")
    }
    if(t === daily.length)
    {
      console.log("SPIT THat")
      t = stakesExpanded[i][0]
    }
  */ 
  console.log("LENGTH OF STAKE " + lengthOfStakes[i])

   //console.log("DAILY " + endDays[t])
   // console.log("STAKES EXPANDED: "+ stakesExpanded[t][1])
   //console.log(t)

  //  console.log(earningFromStakes.length)
  //  console.log(daily.length)
    //earningFromStakes[i] = [daily[t][1], daily[t][0], daily[t][2]]
    earningFromStakes[i] = [i ,lengthOfStakes[i],stakesExpanded[i][0]]
    t++
  }
  t=0
  i++
 }
 i = 0
 t = 0
 //  stakePayout[i] = [data.endDay,data.payoutPerTShare]
while (i < earningFromStakes.length)
{
 // console.log(" Stake Payout = " + stakePayout[i][0] + " Earning From Stake Variable " + earningFromStakes[t][2])

  //if end day equals 

  if(earningFromStakes[i][2].toString() > 0)
  {
    t = earningFromStakes[i][2]
    console.log(props.currentDay)
    while(t < props.currentDay)
    {
    //console.log(stakePayout[i][2])
    console.log("execute math")
    t++
    }

  }
  i++
}









  console.log(earningFromStakes)
 
//console.log(totalAccountTSharePayout)

 }

let s = 0
let item1 = []
function strip20(number) {
  return (parseFloat(number).toPrecision(20));
}
function strip12(number) {
  return (parseFloat(number).toPrecision(12));
}
//let string = (starts[0][0]).toString()
i = 0
let array = []
let output = []


  while (i < totalAccountTSharePayout.length)
  {
 output =  <Plot
  data={[
  {
    y: totalAccountTSharePayout[i][1],
  //  x: totalAccountTSharePayout,
    type: 'scatter',
    mode: 'markers',
    marker: {color: 'blue'},
  },
  
  ]}
  layout={{width: 1000, height: 500, title: 'TESTING'}}
  />
  i++
  }

console.log(output)
s=0
 return(
  <div>
    


<Plot
data={[
{
  y: earningFromStakes,
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
