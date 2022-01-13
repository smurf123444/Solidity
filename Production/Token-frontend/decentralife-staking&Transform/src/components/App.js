import React, { Component, useState } from 'react'
import Web3 from 'web3'

import { withWeb3 } from 'react-web3-provider';
import { toast } from "react-toastify";
import GetXfCompEntersAndExit from './Loaders/getXfCompEntersAndExit'
import GetXfExits from './Loaders/getXfExits'
import GetXfLobbyTable from './Loaders/getXfLobbyTable'
import GetXfLobbyDailyDataList from './Loaders/getXfLobbyDailyDataList'
import GetAccountDailyDataGraph from './Loaders/getAccountDailyPayoutGraph'
import GetPayoutDailyDataGraph from './Loaders/getDailyPayoutPerTShareGraph'
import GetStakeEnd from './Loaders/getStakeEnd'
import { PieChart } from 'react-minimal-pie-chart';
import { Button, Navbar, Nav, NavDropdown, Image, FormControl, Card, CardColumns, CardGroup, Row, Container, Col, Modal} from 'react-bootstrap';
import GetStakeCompStartAndEnd from './Loaders/getStakeCompStartAndEnd'
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



//import decodeClaim from './Test'
import { onError } from "@apollo/client/link/error";
import './App.css'

import PopupXf from './TransformLobby/PopupXf';

import PopupStakeEnd from './Loaders/PopupStakeEnd.js'


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


 // Load State Variables.
      let personalBalance = await tokenFarm.methods.balanceOf(this.state.account).call()
      this.setState({ dappTokenBalance:  (personalBalance / 100000000)})

      let day = await tokenFarm.methods.currentDay().call()
      this.setState({ currentDay:  day})


      let globals_ = await tokenFarm.methods.globals().call()
      this.setState({ shareRate: globals_.shareRate})
      this.setState({globals: globals_})


      let yourAddress_ = accounts[0]
      this.setState({ account: yourAddress_.toString()})

      let totalSupply_ = await tokenFarm.methods.totalSupply().call()
      this.setState({ totalSupply: totalSupply_.toString()})
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

//NOTHING TO INITIATE...

}




  changeFirst = (newValue) => {
    this.setState({
      yourButtonDay: newValue,
    })
  }
  transfer = (amount, day) => {
    this.setState({ loading: false })
    //    this.state.tokenFarm.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.state.tokenFarm.methods.transfer(amount, day).send({ from: this.state.account }).on('confirmation', (hash) => {
            this.setState({ loading: true })
          })
     //   })
      }


  stakeTokens = (amount, day) => {
    this.setState({loading: false})
    //    this.state.tokenFarm.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.state.tokenFarm.methods.stakeStart(amount, day).send({ from: this.state.account }).on('confirmation', (hash) => {
            this.setState({ loading: true })
           // console.log(hash)
          })
     //   })
      }


  unstakeTokens = (stakeIDparam, stakeID) => {
    this.setState({loading: false})
   // console.log('stakeIdparam',stakeIDparam,'stakeId',stakeID)
    this.state.tokenFarm.methods.stakeEnd(stakeIDparam, stakeID).send({ from: this.state.account }).on('confirmation', (hash) => {
      this.setState({ loading: true })
      this.setState({ showPopup: false })
    })
  }
//!!!!!!
  exitDay = (day) => {
    this.setState({ loading: false })
    //console.log('Came to ExitDay Function and DAY is ', day);

    this.state.tokenFarm.methods.xfLobbyExit(day ,'0').send({ from: this.state.account }).on('confirmation', (hash) => {
      this.setState({ loading: true })
    })
  }

  enterDay = (value) => {
    this.setState({ loading: false })
    this.state.tokenFarm.methods.xfLobbyEnter(this.state.account).send({ from: this.state.account, value: value}).on('confirmation', (hash) => {
      this.setState({ loading: true })
    })
  }

  getPopup = (input1, input2) => {
    this.setState({input1,input2,showPopup:true})
  }


  render() {
    
    const { account, dappToken, progressValue, burned, currentDay, shareRate, globals, totalEthByDay, lockedHearts, dailyDataUpdate, totalEthXL, hexToEth, yourHex, yourEth, yourExitButton, yourAddress, yourEnterButton, totalSupply, initSupply, xfLobbyMembers, loading} = this.state;

    let initSupply_ = Web3.utils.fromWei(initSupply, "Gwei")
    let totalSupply_ = Web3.utils.fromWei(totalSupply, "Gwei")

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

    let stakeComp
    if(!this.state.loading) {
      stakeComp = <p id="loader" className="text-center">Loading...</p>
    } else {
      stakeComp =
      <ApolloProvider client={client}>
        {this.state.showPopup?<PopupStakeEnd  text='X' closePopup={this.togglePopup.bind(this)} func={this.unstakeTokens} stakeIndex={this.state.input1} stakeID={this.state.input2}/>:null}
        <GetStakeCompStartAndEnd account={this.state.account} func={this.getPopup} func2={this.unstakeTokens} />
      </ApolloProvider>
    }

    let stakeEnds
    if(!this.state.loading) {
      stakeEnds = <p id="loader" className="text-center">Loading...</p>
    } else {
      stakeEnds =
      <ApolloProvider client={client}>
        <GetStakeEnd account={this.state.account}/>
      </ApolloProvider>
    }
  
    let dailyDataList
    if(!this.state.loading) {
      dailyDataList = <p id="loader" className="text-center">Loading...</p>
    } else {
      dailyDataList =
      <ApolloProvider client={client}>
        <GetXfLobbyDailyDataList />
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

    let transform
    if(!this.state.loading) {
      transform = <p id="loader" className="text-center">Loading...</p>
    } else {
 
      transform = <Transform 
      account={this.state.account}
      day={this.state.currentDay}
      balance={this.state.dappTokenBalance}
      enterDay = {this.enterDay}
      exitDay = {this.exitDay}
      loading={this.state.loading}
      
      />
    }

    return (
      <div>
        <body>
                      <Router basename="/frontend">
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
        <NavDropdown.Item as={Link} to="/stake">Stake</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/transfer">Transfer</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/transform">transform</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Trade</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>

    <Nav.Link href="#Day">Day : {currentDay}</Nav.Link>
    <Nav.Link href="#deets">
     {/*   <Wallet /> */}
       </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    </nav>
    </div>
              <Switch>
          <Route path="/stake">
          <div>

          </div>
            {this.stakeCount}
<CardColumns >
  <Card style={{ backgroundColor: '#3a3a3a', color: 'white'}}>
  {content} 
  </Card>
  <Card style={{ backgroundColor: '#3a3a3a', color: 'white'}}>
  <Card.Body>
    <Card.Text>
      <small className="text-muted"> Share Rate: &nbsp; </small>
      <medium> {strip8(shareRate / 100000)} </medium>
      </Card.Text>
    </Card.Body>
  </Card>
</CardColumns>
<CardColumns>

<Card style={{ width: '100vw', height: 'auto', margin: 'auto', marginTop: '0.05vh', backgroundColor: '#3a3a3a', color: 'white'}}>
  <Card.Header as="h5">Stakes Info</Card.Header>
  <Card.Body>
    <Card.Title>Current Stakes</Card.Title>
    <Card.Text>
      New stakes that are not finished or are ready to be claimed.
    </Card.Text>
    {stakeComp}
    <Card.Title>Ended Stakes</Card.Title>
    <Card.Text>
      List of stakes that have ended previously.
    </Card.Text>
    {stakeEnds}

  </Card.Body>
</Card>
</CardColumns>
            <main role="main" className="col-lg-12 " style={{ maxWidth: '600px' }}>                 
            </main>
            <div className="content mr-auto ml-auto">
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
          </Route>
          <Route path="/transform">
          {/* xfTable */}
          {transform}
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
            <Col> <h1>{/* <Wallet / >*/}</h1></Col>
    
  </Row>
  <Card>
<div className="footer">
    <p>HEX Token </p>
    <p><a href="https://etherscan.io/token/0x2b591e99afe9f32eaa6214f7b7629768c40eeb39">Etherscan</a></p>
  </div>
</Card>
</Container>
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
        </Router>
        </body>
      </div>
    );
  }
  }
  
//}
const params = queryString.parse(document.location.search);
const redirect = params.redirect; // this would be "abcdefg" if the query was "?redirect=abcdefg"
if (document.location.pathname === '/' && redirect) {
  document.location.assign(`${document.location.origin}/${redirect}`);
}

export default App;

/*
  async checkBlock() {

    //let block = await this.web3.eth.getBlock(1920050);
    //let number = block.number;
    let i = 22682745;
    let to = 0
    while (i < 22769388 ) {
        i++;
        let block = await this.web3.eth.getBlock(i);
        let number = block.number;
       // console.log('Searching block ' + number);
    if (block != null && block.transactions != null) {
      //  console.log(block.timestamp)
  
  
        for (let txHash of block.transactions) {
            //contract : 0x075e4f66c4d53dd2d37b91bd7382b34f3b681b4f
            let tx = await this.web3.eth.getTransaction(txHash);
            let time = block.timestamp
            let timeConfigured = new Date(time*1000);
            console.log("SEARCHING...")
            console.log(this.state.account + " " + tx.from.toLowerCase() + " " + timeConfigured)
          if (tx.to != null)
          {
          if ('0x075e4f66c4d53dd2d37b91bd7382b34f3b681b4f' === tx.to.toLowerCase() && this.state.account.toLowerCase() === tx.from.toLowerCase()) {
                console.log('Transaction found on block: ' + number);
                console.log({address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: timeConfigured});
                JSONarray[to++] = ({address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: timeConfigured})
            }
        }
      }
    }
  }

  //set up new array to use the JSON array and take the timestamp and compare with the timestamp of the contract start day to get a proper day calibration.

  }
  */