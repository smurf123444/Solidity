import React, { useEffect, useState, Component  } from "react";
import { useQuery, gql } from "@apollo/client";
import { xfEnterAndExitWithAccount, xfExitWithAccount, stakeStartAndEndWithAccount} from "../Querys/Queries";
import Table from 'react-bootstrap/Table';
import Web3 from 'web3'
import '../TransformLobbyOld/styles.css';  
import Popup from '../TransformLobbyOld/PopupXf';
import moment from 'moment';
moment().format();
function strip4(number) {
  return (parseFloat(number).toPrecision(12));
}
export const GetStakeCompStartAndEnd = (props) => {
  const { error, loading, data } = useQuery(stakeStartAndEndWithAccount(props.account));
  let ass = []
  let tits = []
  let s = 0
  let uniqueStake=[]
 if(loading){
   return(<div>Loading...</div>)
 }
 else{
  let i = 0;
  
  data.stakeStarts.map((data) => {
    tits[i] = [data.id, data.stakeId, data.stakedDays, data.stakeTShares, data.startDay,data.endDay, (data.stakedHearts / 100000000)]
   i++
   })
   i = 0;
   data.stakeEnds.map((data) => {
     ass[i] = [data.id,data.stakeId , (data.stakedHearts   / 100000000), (data.payout   / 100000000), (data.penalty / 100000000 ), (data.payout / 100000000)- (data.penalty  / 100000000), data.daysLate, data.servedDays, data.stakedShares, data.prevUnlocked ]
   i++
  })
   uniqueStake = data.stakeStarts.filter(({ id }) =>
  !data.stakeEnds.some(exclude => exclude.id === id)
);
 }

 return(
  <>
  <div>
    <Table striped bordeless hover size="sm">
        <thead style={{color:'white'}}>
          <tr>
            <td>
              Stake ID
            </td>
            <td>
              Amount of HEX Staked: 
            </td>
            <td>
            T-Shares
            </td>
            <td>
              Days Staked
            </td>
            <td>
              Exit Available on Day:
            </td>   <td>
              END STAKE:
            </td>
          </tr>
        </thead>
        <tbody>
        {uniqueStake.map((data,index)=>(
          <tr key={data.id}>
            <td>{data.stakeId}</td>
            <td>{Math.trunc(data.stakedHearts / 100000000)}</td>
    
    
       <td>{strip4(data.stakeTShares) }</td>

       <td>{data.stakedDays}</td>
    
       <td>{data.endDay}</td>
       <td><button onClick={()=> props.func(index,data.stakeId) }> End</button></td>
        </tr>
          
        ))}
</tbody>
      </Table>
  </div>
</>
)
}

export default GetStakeCompStartAndEnd;
