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
 let yourAddress_ = accounts[0]
 console.log(accounts[0])
      this.setState({ account: accounts[0]})
      let personalBalance = await tokenFarm.methods.balanceOf(accounts[0]).call()
      console.log(personalBalance)
      this.setState({dappTokenBalance: (personalBalance / 100000000 )})
      let totalSupply_ = await tokenFarm.methods.totalSupply().call()
      let day = await tokenFarm.methods.currentDay().call()
    //  console.log(day)
      this.setState({ currentDay: day})
      let globals_ = await tokenFarm.methods.globals().call()
      this.setState({globals: globals_})


     
      this.setState({ dappTokenBalance:  (personalBalance / 100000000)})
      //this.setState({ currentDay:  day.toString()})
      this.setState({ yourAddress:  yourAddress_.toString()})
      this.setState({ totalSupply: totalSupply_.toString()})
      this.setState({ shareRate: globals_.shareRate.toString()})
      this.setState({ lockedHearts: globals_.lockedHeartsTotal.toString()})
    console.log(this.state.currentDay)
  }

  
  async loadWeb3() {
/* global BigInt */
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
    

        const web3 = window.web3
        
        const tokenFarm = new web3.eth.Contract(TokenFarm, '0x7BC95158eebAA2A48f6F8eeEad8Aa162996594bD')
        let currentDay = await tokenFarm.methods.currentDay().call()

    
      }


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
             console.log(amount)
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
            
             
                this.exitDay(day)
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