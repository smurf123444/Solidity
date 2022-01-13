import React, { Component } from 'react'
import dai from '../dai.png'
import './TransformLobby/styles.css'; 
import PopupXf from './TransformLobby/PopupXf';
import GetXfCompEntersAndExit from './Loaders/getXfCompEntersAndExit';
import GetXfExits from './Loaders/getXfExits'
import TokenFarm from '../assets/TokenFarm.json'
import { toast } from "react-toastify";
import Wallet from './metamask'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Web3 from 'web3'
import { Button, Navbar, Nav, NavDropdown, Image, FormControl, Card, CardColumns, CardGroup, Row, Container, Col, Modal} from 'react-bootstrap';
class Transform extends Component {


/*       enterDay = (value) => {
        this.state.tokenFarm.methods.xfLobbyEnter(this.state.account).send({ from: this.state.account, value: value}).on('transactionHash', (hash) => {
          this.setState({ loading: false })
        })
      } */



  render() {
    const errorLink = onError(({ graphqlErrors, networkError }) => {
      if (graphqlErrors) {
        graphqlErrors.map(({ message, location, path }) => {
          alert(`Graphql error ${message}`);
        });
      }
    });
    
    //https://api.thegraph.com/subgraphs/name/smurf123444/decentralife
    //https://api.thegraph.com/subgraphs/name/codeakk/hex
    const link = from([
      errorLink,
      new HttpLink({ uri: "https://api.thegraph.com/subgraphs/name/smurf123444/decentralife" }),
    ]);
    
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: link,
    });

    let xfLobbyEnters
    if(!this.props.loading) {
      xfLobbyEnters = <p id="loader" className="text-center">Loading...</p>
    } else {
      xfLobbyEnters =
      <ApolloProvider client={client}>
        <GetXfCompEntersAndExit
        account={this.props.account}
      />
      </ApolloProvider>
    }
    let xfLobbyExits
    if(!this.props.loading) {
      xfLobbyExits = <p id="loader" className="text-center">Loading...</p>
    } else {
      xfLobbyExits =
      <ApolloProvider client={client}>
        <GetXfExits
        account={this.props.account}
      />
      </ApolloProvider>
    }
    const tits = Number(this.props.day.toString()) + 1;
    return (
      <div id="content" className="mt-3">
<Card style={{ backgroundColor: '#3a3a3a', color: 'white'}}>
  <Card.Header as="h5">Transform Lobby Info</Card.Header>
  <Card.Body>
    <Card.Title>Enters</Card.Title>
    <Card.Text>
     Information for Entered ETH to Transform into HEX Token (minting)
    </Card.Text>
    <Card.Text>
     (Items will disapear when Transformed... If no items, Try inserting ETH Below!)
    </Card.Text>
    {xfLobbyEnters}
    <Card.Title>Exits</Card.Title>
    <Card.Text>
      Information for Total amount recieved from Day in Transform lobby, Based on the amount of ETH transformed.
    </Card.Text>
    <Card.Text>
     (Items will appear when Transformed...)
    </Card.Text>
    {xfLobbyExits}
  </Card.Body>
</Card>
        <div className="card mb-4" >
          <div className="card-body" style={{border:'inset', backgroundColor: '#3a3a3a', color: 'metalic'}}>
          <div>
<span className="float-right text-muted">
  Account: {this.props.account}
  <br></br>
  Balance: {this.props.balance}
</span>
</div>
<br></br>
          <input
                  type="text"
                  ref={(input1) => { this.input1 = input1 }}
                  className="form-control form-control-lg"
                  placeholder="1"
                  required />
            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let amount
                amount = this.input1.value.toString()
                amount = Number(amount) * 1000000000000000000
            // console.log(amount)
                this.props.enterDay(amount)
              }}>
              <div className="input-group mb-4">
                <div className="input-group-append">
                  <div className="input-group-text">
                    ETH Coin
                  </div>
                </div>
              </div>
              <div className="input-group-append">
                  <div className="input-group-text">
              <label className="float-left"><b>Deposit Day (Today): </b>&nbsp;</label>
              <span className="float-right text-muted">
                 <h3> {this.props.day}</h3>
                </span>
              </div>
              <div className="input-group-text">
              <label className="float-left"><b>Next Available Transform Day (Tommorow): </b>&nbsp;</label>
              <span className="float-right text-muted">
                 <h3> {tits}</h3>
                </span>
              </div>
              </div>
              <button type="submit" className="btn btn-secondary btn-block btn-lg">START TRANSFORM (Transform ETH)</button>
            </form>
          <input
                  type="text"
                  ref={(input2) => { this.input2 = input2 }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let day
                day = this.input2.value.toString()
                this.props.exitDay(day)
              }}>
              <div>
                <span className="float-right text-muted">
                </span>
              </div>
              <div className="input-group mb-4">
                <div className="input-group-append">
                 <div className="input-group-text">
                   Day to Transform
                 </div>
                </div>
                </div>
              <div className="input-group-append">
              <div>
                <br/>
              </div>
              <div className="input-group-text">
              <label className="float-left"><b>Last Available Transform Day (Yesterday): </b>&nbsp;</label>
              <span className="float-right text-muted">
                 <h3> {tits - 2}</h3>
                </span>
              </div>
              </div>
              <div className="input-group-append">
      {/*             <div className="input-group-text">
            <label className="float-left"><b>Day</b>&nbsp;</label>
              <span className="float-right text-muted">
                  {this.props.day}
                </span> 
           
              </div> */}
              </div>
              <button type="submit" className="btn btn-secondary btn-block btn-lg">END TRANSFORM (Withdraw DEF)</button>
            </form>
          </div>
          <div>
          </div>
        </div>
      </div>  
    );
  }
}

export default Transform;
/*
         
            <form onSubmit={(event) => {
                event.preventDefault()
                let tits
                let tits2
                tits = this.tits.value.toString()
                tits2 = this.tits2.value.toString()
                this.props.unstakeTokens(tits, tits2)
              }}>
                <label className="float-centerHead"><b>⚠️Warning⚠️ </b></label>
                <br/>
                <label className="float-centerLine"><b>Unstaking early imposes a penalty!</b></label>
                <br />

                <label className="float-centerLine"><b> Be sure its <bold class="red">DUE</bold> for Exit...</b></label>
                <label className="float-left"><b>"Index of Stake" within <span>&nbsp;&nbsp;</span>⬇️ <span>&nbsp;&nbsp;</span> StakeList <span>&nbsp;&nbsp;</span>⬇️<span>&nbsp;&nbsp;<b>{"\n"}(Located Below)</b></span></b></label>
            <input
                  type="text"
                  ref={(input) => { this.tits = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                  <label className="float-left"><b>"Stake ID" within <span>&nbsp;&nbsp;</span>⬇️ <span>&nbsp;&nbsp;</span> StakeList <span>&nbsp;&nbsp;</span>⬇️ <span>&nbsp;&nbsp;<b>{"\n"}(Located Below)</b></span></b></label>
                    <input
                  type="text"
                  ref={(input) => { this.tits2 = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                              <button
              type="submit"
              className="btn btn-primary btn-block btn-lg">
                UN-STAKE...
              </button>
            </form>
*/