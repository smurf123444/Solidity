import React, {} from "react";
import { useQuery } from "@apollo/client";
import {xfLobbyDailyData} from "../Querys/Querys";
import Plot from 'react-plotly.js';
import '../TransformLobbyOld/styles.css';  
import moment from 'moment';
moment().format();
var ass = [];
let i = 0;

const getStuff = (days) => {
  const {loading, data } = useQuery(xfLobbyDailyData(days));
  i=days;
 if(loading){
   return(<div>Loading...</div>)
 }
 else{
  data.dailyDataUpdates.map((data) => {
    ass[i] = [data.beginDay, data.payoutPerTShare, data.endDay, data.lobbyEth, data.lobbyHexPerEth,data.lobbyHexAvailable, data.shares, data.payout]

   i++
   })
  } 
}
export const GetPayoutDailyDataGraph = (props) => {
  const { loading, data } = useQuery(xfLobbyDailyData(999));
  getStuff(0)
 if(loading){
   return(<div>Loading...</div>)
 }
 else{
  data.dailyDataUpdates.map((data) => { 
    ass[i] = [data.beginDay, data.payoutPerTShare, data.endDay, data.lobbyEth, data.lobbyHexPerEth,data.lobbyHexAvailable, data.shares, data.payout]
   i++
   })
 }

i = 0;

let yPayout = []

while(i < ass.length)
{
yPayout[i] = ass[i][1];
i++;
}

let plot =

<Plot
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
  width:670, height: 500, title: 'Total Payout Per T-Share',
  }}
  style={{
    marginTop:'1rem',
    position :'absolute',
    zIndex:1
  }}/> 

return(
  <div>
    <center>{plot}</center>
</div>
)
}
export default GetPayoutDailyDataGraph;
