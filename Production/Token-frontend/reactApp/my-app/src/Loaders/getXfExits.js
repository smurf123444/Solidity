import React from "react";
import { useQuery } from "@apollo/client";
import {  xfExitWithAccount} from "../Querys/Querys";
import Table from 'react-bootstrap/Table';
import moment from 'moment';
moment().format();

export const GetXfExits = (props) => {
 // console.log(props)
  const { loading, data } = useQuery(xfExitWithAccount(props.account));

 if(loading){
   return(<div>Loading...</div>)
 }
 else{
  let array = data.xfLobbyExits.map((data) => (
    <tr key={data.id}>
    <td>{  moment.unix(data.timestamp).format('dddd, MMMM Do, YYYY h:mm:ss A')}</td>
    <td>{data.xfAmount / 1000000000}</td>
    <td>{data.id}</td>
</tr>
  
))
  return(
    <>
    <div>
      <Table striped bordered hover size="dark">
          <thead>
            <tr>
              <td>
                Date and Time of Tranform Lobby Exit Transaction.
              </td>
              <td>
                Transform Amount Total (DEF)
              </td>
              <td>
                ID
              </td>
            </tr>
          </thead>
          {array}


        </Table>
    </div>
</>
    )
 }
}

export default GetXfExits;
