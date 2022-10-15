import React, { Component } from 'react'
import Web3 from 'web3'
import { toast } from "react-toastify";
/* import GetXfCompEntersAndExit from './Loaders/getXfCompEntersAndExit'
import GetXfExits from './Loaders/getXfExits'
import GetXfLobbyDailyDataList from './Loaders/getXfLobbyDailyDataList' */
import GetAccountDailyDataGraph from './Loaders/getAccountDailyPayoutGraph'
import GetPayoutDailyDataGraph from './Loaders/getDailyPayoutPerTShareGraph'
import GetStakeEnd from './Loaders/getStakeEnd'
import {  Navbar, Nav, NavDropdown, Card, CardGroup} from 'react-bootstrap';
import GetStakeCompStartAndEnd from './Loaders/getStakeCompStartAndEnd'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";

import TokenFarm from './assets/TokenFarm.json'


import Main from './Main'
import Transform from './Transform'
import { onError } from "@apollo/client/link/error";
import './App.css'
import PopupStakeEnd from './Loaders/PopupStakeEnd.js'
const queryString = require('query-string');


/* const fs = require('fs');

let student = { 
    name: 'Mike',
    age: 23, 
    gender: 'Male',
    department: 'English',
    car: 'Honda' 
};
 
let data = JSON.stringify(student);
fs.writeFileSync('student-2.json', data);
 */
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
1. RAW ETH AMOUNT INPUT FOR XFDAY for Personal Wallet (Transform)
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
1. ServedDays 
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
1. Available HEx for day (Transform)
2. Hex per Eth calculation (Transform)
3. Total ETH in lobby (Transform)
4. Payout per tshare (for calculating daily rewards) (Stake)
5. day for which this information is valid. (Transform & Stake)
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
let hexPrice =0.0

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      globals:[],
      dappTokenBalance: '0',
    
      currentDay: '0',
      day: '0',
      tokenFarm: {},
      client: 0,
      skippedDays: 0,
      xfLobbyMembers: '0',
      totalSupply: '0',
      initSupply: '0',
      loading: true,
      input1:null,
      input2:null,
      showPopup: false 
      };
    this.exitDay = this.exitDay.bind(this);
    this.web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/e272d9d07a2e489d94cee678fede6768'));
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
    await this.loadGraph()
    //await this.initiate()
  }

  async loadBlockchainData() {
 
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=HEX&vs_currencies=USD";
    fetch(url)
    .then( res => res.json() )
    .then( data => hexPrice=data);
   // const obj = JSON.parse();
//0x2e49E2B3FeBf5D64010D65E020729ec4228eC397
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    window.sessionStorage.setItem("account", accounts[0]);
    const tokenFarm = new web3.eth.Contract(TokenFarm, '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39')
    this.setState({ tokenFarm })

 // Load State Variables.
      let personalBalance = await tokenFarm.methods.balanceOf(this.state.account).call()
      this.setState({ dappTokenBalance:  (Web3.utils.fromWei(personalBalance,"gwei") * 10)})


  

      let day = await tokenFarm.methods.currentDay().call()
      this.setState({ currentDay:  day})
      window.currentDay = day
      let skippedDays = day - 1000
      window.sessionStorage.setItem("skippedDays", skippedDays)
      let globals_ = await tokenFarm.methods.globals().call()
      this.setState({ shareRate: globals_.shareRate})
      this.setState({globals: globals_})

      let yourAddress_ = accounts[0]
      this.setState({ account: yourAddress_.toString()})

      let totalSupply_ = await tokenFarm.methods.totalSupply().call()
      this.setState({ totalSupply: totalSupply_.toString()})


/*       const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)

// note that you may want/need to handle this async code differently,
// for example if top-level await is not an option
const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId])

const route = new Route([pair], WETH[DAI.chainId])

console.log(route.midPrice.toSignificant(6)) // 201.306
console.log(route.midPrice.invert().toSignificant(6)) // 0.00496756 */
  } 
async loadGraph() {
/* 
  this.setState({ client: client})
 */
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
          this.state.tokenFarm.methods.transfer(amount, day).send({ from: this.state.account })
          .on('confirmation', (hash) => {
            this.setState({ loading: true })
          }).on("transactionHash",  (hash) =>  {
            console.log("Hash")
            this.setState({ loading: true })
        })
        .on("receipt",  (hash) =>  {
            console.log("Receipt");
            this.setState({ loading: true })
        })
        .on("confirmation",  (hash) => {
            console.log("Confirmed");
            this.setState({ loading: true })
        })
        .on("error", (hash) => {
            console.log("Error");
            this.setState({ loading: true })
        });
     //   })
      }


  stakeTokens = (amount, day) => {
    this.setState({loading: false})
    //    this.state.tokenFarm.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.state.tokenFarm.methods.stakeStart(amount, day).send({ from: this.state.account })
          .on('confirmation', (hash) => {
            this.setState({ loading: true })
          }).on("transactionHash", (hash) => {
            console.log("Hash")
            this.setState({ loading: true })
        })
        .on("receipt", (hash) => {
            console.log("Receipt");
            this.setState({ loading: true })
        })
        .on("confirmation", (hash) => {
            console.log("Confirmed");
            this.setState({ loading: true })
        })
        .on("error", (hash) => {
            console.log("Error");
            this.setState({ loading: true })
        });
        
        
        }


  unstakeTokens = (stakeIDparam, stakeID) => {
    this.setState({loading: false})
   // console.log('stakeIdparam',stakeIDparam,'stakeId',stakeID)
    this.state.tokenFarm.methods.stakeEnd(stakeIDparam, stakeID).send({ from: this.state.account })
    .on('confirmation', (hash) => {
      this.setState({ loading: true })
      this.setState({ showPopup: false })
    })
    .on("transactionHash", (hash) => {
      console.log("Hash")
      this.setState({ loading: true })
      this.setState({ showPopup: false})
  })
  .on("receipt", (hash) => {
      console.log("Receipt");
      this.setState({ loading: true })
      this.setState({ showPopup: false})
  })
  .on("confirmation", (hash) => {
      console.log("Confirmed");
      this.setState({ loading: true })
      this.setState({ showPopup: false})
  })
  .on("error", (hash) => {
      console.log("Error");
      this.setState({ loading: true })
      this.setState({ showPopup: false})
  });
  
  }

  exitDay = (day) => {
    this.setState({ loading: false })


    this.state.tokenFarm.methods.xfLobbyExit(day ,'0').send({ from: this.state.account })
    .on('confirmation', (hash) => {
      this.setState({ loading: true })

    })
    .on("transactionHash", (hash) => {
      console.log("Hash")
      this.setState({ loading: true })

  })
  .on("receipt", (hash) => {
      console.log("Receipt");
      this.setState({ loading: true })

  })
  .on("confirmation", (hash) => {
      console.log("Confirmed");
      this.setState({ loading: true })

  })
  .on("error", (hash) => {
      console.log("Error");
      this.setState({ loading: true })

  });
  }

  enterDay = (value) => {
    this.setState({ loading: false })
    this.state.tokenFarm.methods.xfLobbyEnter(this.state.account).send({ from: this.state.account, value: value})
    .on('confirmation', (hash) => {
      this.setState({ loading: true })
    })
    .on("transactionHash", (hash) => {
      console.log("Hash")
      this.setState({ loading: true })
  })
  .on("receipt", (hash) => {
      console.log("Receipt");
      this.setState({ loading: true })
  })
  .on("confirmation", (hash) => {
      console.log("Confirmed");
      this.setState({ loading: true })
  })
  .on("error", (hash) => {
      console.log("Error");
      this.setState({ loading: true })
  });
  }

  getPopup = (input1, input2) => {
    this.setState({input1,input2,showPopup:true})
  }


  render() {
    
    const { account, currentDay, shareRate,  totalSupply} = this.state;


  function strip8(number) {
    return (parseFloat(number).toPrecision(8));
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
    new HttpLink({ uri: "https://api.thegraph.com/subgraphs/name/codeakk/hex"}),
  ]);
  
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });

    let content
    if(!this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = 
      <Main
        dappTokenBalance={this.state.dappTokenBalance}
        
        totalSupply={this.state.totalSupply}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
        account={this.state.account}
      />
    }



/*     let xfLobbyEnters
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
    } */

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
  
/*     let dailyDataList
    if(!this.state.loading) {
      dailyDataList = <p id="loader" className="text-center">Loading...</p>
    } else {
      dailyDataList =
      <ApolloProvider client={client}>
        <GetXfLobbyDailyDataList />
      </ApolloProvider>
    } */

    let dailyDataGraph
    if(!client) {
      dailyDataGraph = <p id="loader" className="text-center">Loading...</p>
    } else {
      dailyDataGraph =
      <ApolloProvider client={client}>
        <GetPayoutDailyDataGraph />
      </ApolloProvider>
    }

   let accountDailyDataGraph
    if(!client) {
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
    
    //const [open, setOpen] = useState(false);
    return (
      
      <div>
        <body>
                      <Router basename="/frontend">
        <div>
    <nav>
      <Navbar  bg="dark" variant="dark">
  <Navbar.Brand href="#home"><img src={require('./Loaders/HEXagon.png')} style={{width: 45, height: 37}} alt={""}></img>&nbsp;HEX</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link as={Link} to="/" >Home</Nav.Link>
      <Nav.Link href="https://decentralife.medium.com/decentralife-token-846cfd424901">Info</Nav.Link>
      <NavDropdown title="Solutions" id="basic-nav-dropdown">
        <NavDropdown.Item as={Link} to="/stake">Stake</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/stats">Stats</NavDropdown.Item>
{/*         <NavDropdown.Item as={Link} to="/transform">Transform</NavDropdown.Item> */}
        <NavDropdown.Divider />
        <NavDropdown.Item as={Link} to="/transfer">Transfer</NavDropdown.Item>
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
  <iframe title="song" src="https://open.spotify.com/embed/track/3bORtU89mmxzrRy32Elv02?utm_source=generator" width="250" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
</Navbar>
    </nav>
    </div>
              <Switch>
              <Route path="/stats">
            
{/* statsPage*/}
<div className="twerk">
              <center>
              <Card style={{ 
    backgroundColor: 'white', 
    opacity: ".45",
    width: "70rem" }}>
    <center>
            
                  <br></br> 
                  <h1 style={{color:'black'}}>Total&nbsp;<img src={require('./Loaders/HEXagon.png')} style={{width: 45, height: 37}} alt={""}></img>&nbsp;Circulating Supply : {Web3.utils.fromWei(totalSupply,"gwei") * 10}</h1>  <br></br> 
        

           </center>
           
{/*      {   console.log(hexPrice.hex)} */}
           </Card>

  </center>
  {dailyDataGraph}
  <center>
  <Card style={{ 
    backgroundColor: '#transparent', 
    opacity: ".45",
    width: "40rem",
    bottom:"-10rem",
    right: "-28rem", }}>
             <br></br> 
         <h5 style={{color:'black'}}> Account: {account}</h5>   
         <br></br>  
         <h2 style={{color:'black'}}>  Current&nbsp;<img src={require('./Loaders/HEXagon.png')} style={{width: 45, height: 37}} alt={""}></img>&nbsp;Balance:   {this.state.dappTokenBalance}</h2>
           <br></br> 
  </Card>
  </center>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
               {accountDailyDataGraph}
               </div>
                </Route>
          <Route path="/stake">
{/*           <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        click
      </Button>


        <Collapse in={open} dimension="width">
          <div id="example-collapse-text">
            <Card body style={{ width: '400px' }}>
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </Card>
          </div>
          
        </Collapse> */}
            {/* {this.stakeCount} */}

<div className="twerk">
<CardGroup>
      <Card style={{
  backgroundColor: 'transparent',
  borderColor: 'transparent'
}}>

        <Card.Body>
        <img src={require('./Loaders/lacyCLaire.png')} style={{width: 1000, height: 550, marginLeft: 230, marginTop: -25 }} alt={""}></img> 

        </Card.Body>

      </Card>
   

 
        <center>
  <Card style={{ 
    backgroundColor: 'transparent',
    color: 'white',
    width: "35rem",
    top: "1rem",
    bottom:"20rem",
    borderColor: 'transparent'
    }}>
        {content} 
        <small style={{color:'white'}}> Share Rate: &nbsp; </small>
      <medium> {strip8(shareRate)/10}&nbsp;&nbsp;<img src={require('./Loaders/HEXagon.png')} style={{width: 20, height: 17, marginLeft: 10}} alt={""}></img>&nbsp; / &nbsp;1 T-SHARE</medium>
        </Card>
    </center>
<br></br>
      <Card style={{
  backgroundColor: 'transparent',
  borderColor: 'transparent'
}}>

        <Card.Body>
        <img src={require('./Loaders/lacyClaire2.png')} style={{maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 50%, transparent 100%)', width: 445, height: 565, marginLeft: -180, marginTop: 70}} alt={""} ></img> 
        </Card.Body>

      </Card>
    </CardGroup>


  <br></br>



{/*         <img src={require('./Loaders/HEXagon.png')} style={{width: 55, height: 50}}></img>  */}
<CardGroup>
 <center>
  <Card style={{ 
    backgroundColor: 'transparent', 

    width: "80rem",
    left: "20rem",
    color: 'white',
    zIndex: 1, 
    position: 'relative'}}>
            <Card.Header as="h5">Stakes Info</Card.Header>
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
 
  </Card>  
  </center>  
  <Card style={{
  backgroundColor: 'transparent',
  borderColor: 'transparent',

}}>

        <Card.Body>
        <img src={require('./Loaders/LacyClaireTheSplits.png')} 
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 50%, transparent 100%)',
         width: 445,
          height: 565, 
          marginLeft: 170,
          marginTop: 70,
          zIndex: 0,
          position: 'absolute'}} 
          alt={""}></img> 
        </Card.Body>

      </Card>
      </CardGroup>

  </div>
{/*   <img src={require('./Loaders/HEXagon.png')} style={{width: 55, height: 50}}></img>  */}
  <br></br>

            <main role="main" className="col-lg-12 " style={{ maxWidth: '600px' }}>                 
            </main>
            <div className="content mr-auto ml-auto">
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
          </Route>
          <Route path="/transform">
          {transform}
               </Route>
          <Route path="/" exact>

    <center>
<br></br>
    <Card style={{ 
    backgroundColor: 'Transparent', 
    color: 'white',
    width: "35rem",
    height: ""  }}>
<br></br>
<br></br>
<center>
{/* <Image src="https://i.imgur.com/UoMFVsj.jpg" fluid style={{width: 300, height: 300}}/> */}&nbsp;&nbsp;&nbsp;
<img src={require('./Loaders/HEXagon.png')} style={{width: 200, height: 200}} alt={""}></img>
</center>
<br></br>
{/* <center>  <img src={require('./Loaders/HEXagon.png')} style={{width: 200, height: 200}}></img> </center> */}
<br></br>
</Card>
<br></br>
<Card style={{ 
    backgroundColor: 'transparent', 
    color: 'white',
    width: "35rem",
    height: ""  }}>

            <h1 >Welcome to Hex frontend</h1>
             <p>Certificate of Deposit on the Blockchain.</p>
 
             </Card>

    </center>
<br></br>
  <Card>
<div className="footer">
    <p>HEX Token </p>
    <p><a href="https://etherscan.io/token/0x2b591e99afe9f32eaa6214f7b7629768c40eeb39">Etherscan</a></p>
  </div>
</Card>

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
                &nbsp;&nbsp;<img src={require('./Loaders/HEXagon.png')} style={{width: 20, height: 17}} alt={""}></img> 
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