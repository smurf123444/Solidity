import React, { Component, useState, Redirect } from 'react'
import Web3 from 'web3'

import { withWeb3 } from 'react-web3-provider';
import { toast } from "react-toastify";
import GetXfCompEntersAndExit from './Loaders/getXfCompEntersAndExit'
import GetXfExits from './Loaders/getXfExits'
import TransformTable from './Loaders/getXfLobbyTable'
import GetXfLobbyDailyDataList from './Loaders/getXfLobbyDailyDataList'
import GetAccountDailyDataGraph from './Loaders/getAccountDailyPayoutGraph'
import GetPayoutDailyDataGraph from './Loaders/getDailyPayoutPerTShareGraph'

import { PieChart } from 'react-minimal-pie-chart';
import { Button, Navbar, Nav, NavDropdown, Image, FormControl, Card, CardColumns, CardGroup, Row, Container, Col, Modal} from 'react-bootstrap';

import Table from 'react-bootstrap/Table';
import Plot from 'react-plotly.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";

import TokenFarm from '../assets/TokenFarm.json'
import CanvasJSReact from '../assets/canvasjs.react';



import Main from './Main'
import Transform from './Transform'


import TransformList from './TransformLobby/TransformList'
//import decodeClaim from './Test'
import { onError } from "@apollo/client/link/error";
import './App.css'
import Logo from '../dai.png'
import PopupXf from './TransformLobby/PopupXf';
import Wallet from './metamask'

import { xfLobbyDailyData } from './Querys/Queries';
import "./style.scss";
const MetaMaskOnboarding = require('@metamask/onboarding');
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var Chart = require('chart.js');
var bigDecimal = require('js-big-decimal');
const queryString = require('query-string');
var BigNumber = require('big-number');
//require('./hexDecoders.js');
let JSONarray = []


/*
THIS IS FOR FINDING THE 
1. XFAMOUNT EARNED.
{

xfLobbyExits(where: {memberAddr: "0x5bc8bf5a75d221ff30b2c2b2a7235d6aeeff4a84"}){
  id
  timestamp
	xfAmount
  memberAddr
  data0
}
    
  
}

THIS IS FOR FINDING THE 
1. RAW ETH AMOUNT INPUT FOR XFDAY
2. THE DAY IT SELF.
    xfLobbyEnters(where: {memberAddr: "0x5bc8bf5a75d221ff30b2c2b2a7235d6aeeff4a84"}){
  id
  timestamp
  memberAddr
  data0
    rawAmount
    enterDay
}
  
THIS IS FOR FINDING
1. Staked Days
2. Amount staked
3. End Day

  stakeStarts(where: {stakerAddr: "0x5bc8bf5a75d221ff30b2c2b2a7235d6aeeff4a84"}) {
    id
    stakerAddr
    stakeId
    data0
    stakedDays
    stakeShares
    startDay
    endDay
    stakedHearts
  }

THIS IS FOR FINDING
1.servedDays 
2. penalty paid
3. Stake Payout.
{

  stakeEnds(where: {stakerAddr: "0x5bc8bf5a75d221ff30b2c2b2a7235d6aeeff4a84"}) {
    id
    stakerAddr
    stakedHearts
    payout
    penalty
    daysLate
    servedDays
    stakedHearts
    stakedShares
    prevUnlocked
  }
}
THIS IS FOR FINDING
1. Available HEx for day
2. Hex per Eth calculation
3. Total ETH in lobby
4. Payout per tshare (for calculating daily rewards)
5. day for which this information is valid.
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

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      progressValue: 0,
      totalEthByDay: [],
      dappToken: {},
      globals:[],
      dappTokenBalance: '0',
      burned: '0',
      dailyDataUpdate: [],
      currentDay: '0',
      day: '0',
      tokenFarm: {},
      totalEthXL: '0',
      hexToEth: '0',
      yourHex:'0',
      yourEth: '0',
      yourExitButton: '0',
      yourEnterButton: '0',
      yourButtonDay: '0',
      yourAddress:'0x0',
      xfLobbyMembers: '0',
      totalSupply: '0',
      initSupply: '0',
      loading: true,
      input1:null,
      input2:null,
      showPopup: false 
      };
    this.exitDay = this.exitDay.bind(this);
    this.web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/885661b2ff2f4167b4c6570a07306408'));
  }
  togglePopup() {  
    this.setState({  
         showPopup: !this.state.showPopup  
    });  

     }  
  web3;
  account;
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    await this.initiate()
  }

  async loadBlockchainData() {


    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
 
    const tokenFarm = new web3.eth.Contract(TokenFarm, '0x7BC95158eebAA2A48f6F8eeEad8Aa162996594bD')
    this.setState({ tokenFarm })
      let i = 351

 // Load State Variables.
      let personalBalance = await tokenFarm.methods.balanceOf(this.state.account).call()
      console.log(personalBalance)
      this.setState({dappTokenBalance: (personalBalance / 100000000 )})
      let totalSupply_ = await tokenFarm.methods.totalSupply().call()
      let day = await tokenFarm.methods.currentDay().call()
    //  console.log(day)
      this.setState({ currentDay: day})
      let globals_ = await tokenFarm.methods.globals().call()
      this.setState({globals: globals_})
      let yourAddress_ = accounts[0]
      this.setState({ account: yourAddress_.toString()})

     
      this.setState({ dappTokenBalance:  (personalBalance / 100000000)})
      //this.setState({ currentDay:  day.toString()})
      this.setState({ yourAddress:  yourAddress_.toString()})
      this.setState({ totalSupply: totalSupply_.toString()})
      this.setState({ shareRate: globals_.shareRate.toString()})
      this.setState({ lockedHearts: globals_.lockedHeartsTotal.toString()})
    console.log(this.state.currentDay)
  }

  
  async loadWeb3() {

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable().then((accounts) => {
          this.connectMainnet(accounts);
        });
      } catch (err) {
        console.log(err);
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      this.web3 = new Web3(Web3.currentProvider);
      try {
        await this.web3.eth.getAccounts().then((accounts) => {
          this.connectMainnet(accounts);
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }


  async initiate(){


//https://api.thegraph.com/subgraphs/name/smurf123444/decentralife
//0x4587D1BCd8eC397A473D4Ae31F5862705bA67f7D

    let i = 351
    const web3 = window.web3
    
    const tokenFarm = new web3.eth.Contract(TokenFarm, '0x7BC95158eebAA2A48f6F8eeEad8Aa162996594bD')
    let currentDay = await tokenFarm.methods.currentDay().call()
    
    let currentReversed = 351 - currentDay
    function myTotalHex() {
      var newArray = []
      var amount = ""
     for (var i = 351; i >= 1; --i)
     {
     if(i > 19)
     {
     amount = 515000000
     newArray.push (amount)
     }
     if(i <= 19 && i >= 2)
     {

     amount = 525000000
     newArray.push (amount)
     }
     if(i >= 1 && i < 2)
     {
     amount = 1500000000
     newArray.push (amount)
     }
 }
 return newArray;   // The function returns the product of p1 and p2
}
i = 351
     //gives total ETH from current day.
    let totalEth = await tokenFarm.methods.xfLobby(currentDay).call()
    
     //variable for totalEthByDay to make array with date and value of that day.
     let totalEthByDay = []
     let personalEthByDay = 0
     let checkTotalEthByDay = []
     let checkPersonalEthByDay = []
     //total hex for all days available (hardcoded)
     let hexAvailableArray = myTotalHex();
     
     //Used to store today's value that has value stored (kinda simplistic)
     let hexToEth = []
     let yourHex = []
     let yourEth = []
    let progressValue = 0
     let tempValue = 0
     let checkCurrentDay = []

     let xfLobbyMembersWrite = []
     let xfLobbyMembersRead = []
    
   
//Check each day for for total Eth spent on that day.
/*       while (i >= 1)
     {
      if(currentReversed === i)
      {
        checkCurrentDay[349 - i + 1] = true
      }
      else
      {
        checkCurrentDay[349 - i + 1] = false
      }
    //    xfLobbyMembersRead  = await tokenFarm.methods.xfLobbyMembers(i, this.state.account).call()
        totalEthByDay[i] = await tokenFarm.methods.xfLobby(i).call()
       if(totalEthByDay[i] > 0){
         tempValue = parseInt(hexAvailableArray[351 - i]) * totalEthByDay[i]
         hexToEth[i] = hexAvailableArray[351 - i] - (parseInt(hexAvailableArray[351 - i]) * Web3.utils.fromWei(totalEthByDay[i], "Ether"))
         yourEth[i] = Web3.utils.fromWei(totalEthByDay[i], "Ether")
       }
       else
       {
         hexToEth[i] = hexAvailableArray[351 - i] * 1
         yourEth[i] = 0
       }
      xfLobbyMembersRead[i]  = await tokenFarm.methods.xfLobbyMembers(i, this.state.account).call()

      console.log(xfLobbyMembersRead[i])
       if(xfLobbyMembersRead[i][1] > 0){
         checkTotalEthByDay[351 - i + 1] = true
       }
       else{
        checkTotalEthByDay[351 - i + 1] = false
       } 
     
    //  console.log(personalEthByDay)
       if(yourEth[i] > 0){
         
         yourHex[i] = hexAvailableArray[351 - i] * yourEth[i]
       //  console.log(yourHex[i])
         checkPersonalEthByDay[351 - i + 1] = true
       }
       else{
         yourHex[i] = 0
         checkPersonalEthByDay[351 - i + 1] = false
       }
       this.setState({progressValue: progressValue++})
       i--
     }  */

  }

  changeFirst = (newValue) => {
    this.setState({
      yourButtonDay: newValue,
    })
  }
  transfer = (amount, day) => {
    //    this.state.tokenFarm.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.state.tokenFarm.methods.transfer(amount, day).send({ from: this.state.account }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
          })
     //   })
      }



//!!!!!!
  exitDay = (day) => {
    let s = 351 - day + 1;
   // console.log('Came to ExitDay Function and DAY is ', s - this.state.currentDay);
   // console.log(s - this.state.currentDay)
    this.state.tokenFarm.methods.xfLobbyExit(s - this.state.currentDay, '0').send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  enterDay = (value) => {
    this.state.tokenFarm.methods.xfLobbyEnter(this.state.account).send({ from: this.state.account, value: value}).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  } 

  stakeCount = () => {
    this.state.tokenFarm.methods.stakeCount(this.state.account).send({ from: this.state.account}).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }
  
  getPopup = (input1, input2) => {
    this.setState({input1,input2,showPopup:true})
  }


  render() {
    
    const { account, dappToken, progressValue, currentDay, shareRate, globals, totalEthByDay, lockedHearts, dailyDataUpdate, totalEthXL, hexToEth, yourHex, yourEth, yourExitButton, yourAddress, yourEnterButton, totalSupply, initSupply, xfLobbyMembers, loading} = this.state;

    let initSupply_ = Web3.utils.fromWei(initSupply, "Gwei")
    let totalSupply_ = Web3.utils.fromWei(totalSupply, "Gwei")
   // console.log(currentDay)
    function strip4(number) {
      return (parseFloat(number).toPrecision(4));
  }
  function strip8(number) {
    return (parseFloat(number).toPrecision(8));
}
  function strip12(number) {
    return (parseFloat(number).toPrecision(12));
}
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

     


    let popUpXf
    if(!this.state.loading) {
      popUpXf = <p id="loader" className="text-center">Loading...</p>
    } else {
      popUpXf =
      <div>  
          <h1> Simple Popup Example </h1>  
          <button onClick={this.togglePopup.bind(this)}> Click To Open</button>  
          {this.state.showPopup ? <PopupXf  text='X' closePopup={this.togglePopup.bind(this)} /> : null }  
      </div>  
    }


    let content
    if(!this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        dappTokenBalance={this.state.dappTokenBalance}
        
        totalSupply={this.state.totalSupply}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
        account={this.state.account}
      />
    }
    let transform
    if(!this.state.loading) {
      transform = <p id="loader" className="text-center">Loading...</p>
    } else {
 
      transform = <Transform 
      account={this.state.account}
      day={this.state.currentDay}
      balance={this.state.dappTokenBalance}
      enterDay = {this.enterDay}
      loading={this.state.loading}
      
      />
    }



    
         


    let xfLobbyEnters
    if(!this.state.loading) {
      xfLobbyEnters = <p id="loader" className="text-center">Loading...</p>
    } else {
   
      xfLobbyEnters =
      <ApolloProvider client={client}>
        <GetXfCompEntersAndExit
        account={this.state.account}
      />
      </ApolloProvider>
    }
    let xfLobbyExits
    if(!this.state.loading) {
      xfLobbyExits = <p id="loader" className="text-center">Loading...</p>
    } else {

      xfLobbyExits =
      <ApolloProvider client={client}>
        <GetXfExits
        account={this.state.account}
      />
      </ApolloProvider>
    }


  
    let dailyDataList
    if(!this.state.loading) {
      dailyDataList = <p id="loader" className="text-center">Loading...</p>
    } else {
      dailyDataList =
      <ApolloProvider client={client}>
        <GetXfLobbyDailyDataList 
        togglePopup = {this.togglePopup.bind(this)}
        />
      </ApolloProvider>
    }

    let dailyDataGraph
    if(!this.state.loading) {
      dailyDataGraph = <p id="loader" className="text-center">Loading...</p>
    } else {
      dailyDataGraph =
      <ApolloProvider client={client}>
        <GetPayoutDailyDataGraph />
      </ApolloProvider>
    }

    let accountDailyDataGraph
    if(!this.state.loading) {
      accountDailyDataGraph = <p id="loader" className="text-center">Loading...</p>
    } else {
      accountDailyDataGraph =
      <ApolloProvider client={client}>
        <GetAccountDailyDataGraph account={this.state.account} currentDay={this.state.currentDay}/>
      </ApolloProvider>
    }



    let xfTable
    if(!this.state.loading) {
      xfTable = <p id="loader" className="text-center">Loading...</p>
    } else {
      xfTable =
      <ApolloProvider client={client}>
      
        <TransformTable
        
        func={this.enterDay}
        account={this.state.account} 
        day={this.state.currentDay} 
        yourEnterButton={this.state.yourEnterButton} 
        yourExitButton={this.state.yourExitButton}
        enteredDays={this.state.yourExitButton}
        />
      </ApolloProvider>
    }

 
    const tits = Number(this.state.currentDay.toString()) + 1;
 

    return (
      
      <div>
    
        <body>
               
        <div>
    <nav>
      <Navbar  bg="dark" variant="dark">
  <Navbar.Brand href="#home">Decentralife</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link as={Link} to="/" >Home</Nav.Link>
      <Nav.Link href="https://decentralife.medium.com/decentralife-token-846cfd424901">Info</Nav.Link>

      <NavDropdown title="Solutions" id="basic-nav-dropdown">

        <NavDropdown.Item as={Link} to="/transform">Transform</NavDropdown.Item>

        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Trade</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>
    {/* console.log(currentDay) */}
    <Nav.Link href="#Day">Day : {currentDay}</Nav.Link>
    <Nav.Link href="#deets">
     {  <Wallet /> }
       </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    </nav>
    </div>
        <Switch>
          <Route path="/transform">
          { transform }
          </Route>

          <Route path="/" exact>
    <Container>
  <Row xs={2} md={4} lg={6}>
  <Image src="https://i.imgur.com/UoMFVsj.jpg" fluid />
  </Row>
  <Row xs={1} md={2}>
    <Col>    <div style={{color:"white"}}>
            <h1 >Welcome to Hex frontend</h1>
             <p>Certificate of Deposit on the Blockchain.</p>
            </div></Col>
            <Col> <h1>{<Wallet / >}</h1></Col>
  </Row>
  <Card>
    
<div className="footer">
    <p>HEX Token </p>
    <p><a href="https://etherscan.io/token/0x2b591e99afe9f32eaa6214f7b7629768c40eeb39">Etherscan</a></p>
  </div>

</Card>
</Container>
          </Route>
          <Route path="/airdrop">
          {/* airdrop */}
          </Route>
          <Route path="/transfer" exact>
            <Card style={{ backgroundColor: '#3a3a3a', color: 'white'}}>
            <Card.Body> 
          <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let address
                let amount
                address = this.input.value.toString()
                amount = this.amount.value.toString()
                amount = (amount * 100000000).toString()
                this.transfer(address, amount)
              }}>
              <div>
                <label className="float-left"><b>Transfer HEX Tokens</b></label>
                <span className="float-right text-muted">
                  Balance: {this.state.dappTokenBalance}
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    Ethereum
                    Address
                  </div>
                </div>
              </div>
              <div className="input-group mb-4">
              <div className="input-group-append">
                  <div className="input-group-text">
              <label className="float-left"><b>Amount</b>&nbsp;</label>
              <input
                  type="text"
                  ref={(input) => { this.amount = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
           
              </div>
              </div>
              </div>
              <button type="submit" className="btn btn-secondary btn-block btn-lg">TRANSFER</button>
            </form>
            </Card.Body>
            </Card>

          </Route>
        </Switch>
  
        </body>
      </div>
    );
  }
  }
  
const params = queryString.parse(document.location.search);
const redirect = params.redirect; // this would be "abcdefg" if the query was "?redirect=abcdefg"
if (document.location.pathname === '/' && redirect) {
  document.location.assign(`${document.location.origin}/${redirect}`);
}

export default App;
