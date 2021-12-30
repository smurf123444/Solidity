import React, {} from "react";
import { useQuery, gql } from "@apollo/client";
import {xfLobbyDailyData} from "../Querys/Queries";
import Table from 'react-bootstrap/Table';
import Plot from 'react-plotly.js';
import '../TransformLobby/styles.css';  
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

let s = 0
let item1 = []
function strip20(number) {
  return (parseFloat(number).toPrecision(20));
}
function strip12(number) {
return (parseFloat(number).toPrecision(12));
}
let string = (tits[0][0]).toString()
i = 0
let array = []
while (i < tits.length)
{
  array[i] = (
      tits[i][1]
   )
i++

}

s=0
 return(
  <div>
    

<Plot
data={[
{
  y: array,
  type: 'scatter',
  mode: 'markers',
  marker: {color: 'red'},
},

]}
layout={{width: 1000, height: 500, title: 'Global Daily Payout per T-SHARE'}}
/>
</div>
)
}

export default GetPayoutDailyDataGraph;
