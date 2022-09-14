import React, {} from "react";
import Web3 from 'web3'
import { useQuery } from "@apollo/client";
import {xfLobbyDailyData} from "../Querys/Querys";
import Table from 'react-bootstrap/Table';
import '../TransformLobbyOld/styles.css';  
import moment from 'moment';
moment().format();
let tits = []
let i = 0
export const GetDailyDataList = (props) => {
  const { loading, data } = useQuery(xfLobbyDailyData());


 if(loading){
   return(<div>Loading...</div>)
 }
 else{
  
  
  data.dailyDataUpdates.map((data) => {
    tits[i] = [data.beginDay, data.payoutPerTShare, data.endDay, data.lobbyEth, data.lobbyHexPerEth,data.lobbyHexAvailable, data.shares, data.payout]
   i++
   })
 }
i = 0
let array = []
while (i < tits.length)
{
  array[i] = (
    <>
    <tr key={data.id}>

   <td> {/*beginDay*/tits[i][0]}</td>

   <td>{/*payoutPerTShare*/tits[i][1] }</td>

   <td> {/*lobbyEth*/tits[i][3] }</td>
   <td> {/*lobbyHexPerEth*/parseInt(tits[i][4]) }</td>
   <td> {/*lobbyHexAvailable*/Web3.utils.fromWei(tits[i][5])}</td>
   <td> {/*shares*/tits[i][6] }</td>
   <td> {/*payout*/Web3.utils.fromWei(tits[i][7])}</td>

    </tr>
    </>
   )
i++
}
 return(
  <Table striped bordered variant="dark">
    <thead>
      <tr>
        <td>
         Day
        </td>
        <td>
          Payout per T-share
        </td>
        <td>
          Total Lobby Ethereum for Day
        </td>
        <td>
          DEF / 1 ETH
        </td>
        <td>
          DEF Available
        </td>
        <td>
          Total Shares
        </td>
        <td>
          Total Payout
        </td>
      </tr>
    </thead>
  <tbody>


{array}

 
</tbody>

</Table>
)
}

export default GetDailyDataList;
