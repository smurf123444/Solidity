import "./styles.css";
import React, { useState, Component } from 'react'
import Table from 'react-bootstrap/Table';
import PopupXf from './PopupXf';
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/' + '885661b2ff2f4167b4c6570a07306408'));


function myDay() {
  var newArray = []
  for (var i = 351; i >= 1; --i)
  {
   newArray.push (<tr><td key={i}>{i}</td></tr>)
  }
  return newArray;
}


function myAvailableHex() {
  var newArray = []
  var amount = ""
  for (var i = 350; i >= 1; --i)
  {
    if(i >= 20)
    {
      amount = "~515m"
      newArray.push (<tr><td>{amount}</td></tr>)
    }
    if(i <= 19 && i >= 1)
    {
      amount = "~516m"
      newArray.push (<tr><td>{amount}</td></tr>)
    }
    if(i < 2 && i >= 1)
    {
      amount = "~1.5b"
      newArray.push (<tr><td>{amount}</td></tr>)
    }
  }
  return newArray;   // The function returns the product of p1 and p2
}


function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
};




function myTotalEth(eth, day, test) {
  let i = 351
  let s = 351 - day + 1
  let newArray= [];
  let string = ""
  do{
    
    if(s >= i && s <= i)
   {
     
     newArray[i--] = (<tr><td className="td-height">{eth}</td></tr>)
   }
   else{
     string = ""
     newArray[i--] = (<tr><td className="td-heightDim">{string}</td></tr>)
   }
   }
   while(i > 0)
   return newArray; 
  // The function returns the product of p1 and p2
  
}

function hexToETHfunc(eth, day) {

  let i = 351
  let s = 351 - day + 1
  let newArray= [];
  let string = ""

  do{
    
   if(s >= i && s <= i)
  {
    string = eth
    newArray[i--] = (<tr><td className="td-height">{string + " HEX / 1 ETH"}</td></tr>)
  }
  else{
    string = ""
    newArray[i--] = (<tr><td className="td-heightDim">{string}</td></tr>)
  }
  }
  while(i > 0)
  return newArray;   
}

function yourHEXcalc(hex, day) {
  let i = 351
  let s = 351 - day + 1
  let newArray= [];
  let string = ""

  do{
   if(s >= i && s <= i)
  {
    string = hex
    newArray[i--] = (<tr><td className="td-height">{string}</td></tr>)
  }
  else{
    string = ""
    newArray[i--] = (<tr><td className="td-heightDim">{string}</td></tr>)
  }
  }
  while(i > 0)
  return newArray;   // The function returns the product of p1 and p2
}


function yourETHcalc(hex, day) {
  let i = 351
  let s = 351 - day + 1
  let newArray= [];
  let string = ""
  do{
    if(s >= i && s <= i)
   {
     string = hex
     newArray[i--] = (<tr><td className="td-height">{string}</td></tr>)
   }
   else{
     string = ""
     newArray[i--] = (<tr><td className="td-heightDim">{string}</td></tr>)
   }
   }
   while(i > 0)
   return newArray;   // The function returns the product of p1 and p2
}
 



var transformer = null;


class TransformTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      day : this.props.day,
      showPopup: false,
      loading: false
    };
    this.xfLobbyExit = this.xfLobbyExit.bind(this);
    transformer = this;
    
  }
  
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  componentDidMount(){
    transformer = this;
  }
  componentWillUnmount(){
    transformer = null;
  }

  // xfLobbyExit(){
  //   console.log('Came to this object ')
  //   this.props.xfLobbyExit(this.state.day);
  // }

  xfLobbyExit(s){
    console.log('Came to this object ')
    this.props.xfLobbyExit(s);
    
  }



  
  render() {






    let popUpXf =
      <div>  
          <button type="popup" onClick={this.togglePopup.bind(this)}> Enter     </button>  
          {this.state.showPopup ? <PopupXf  text='X' closePopup={this.togglePopup.bind(this)} fun={this.props.xfLobbyEnter} account={this.props.yourAddress}/> : null }  
      
      </div>  
    

    function yourButtoncalc(day,account,eth,currentDay,enterDay) {

      // console.log('day: ' + day + ' account: ' + account+' eth: '+eth);
       
       let i = 351
       let initial = i + 1;
       var s = 0
       var temp = day
       s = 351 - day + 1;
     
       let newArray= [];
       let string = ""
       
       do{
         day++;
         
         if(eth[i] !== null && eth[i] === true)
     
         {
          
           s = 351 - day + 1;
          console.log("Found Exit button on day " +  s)
           newArray[i] = (<tr><td className="form-button-height">   
     
                               <form className="form-button-height" id={s} onSubmit={(event) => {
                               
                                 event.preventDefault()
                                 
                                 account(parseInt(event.target.getAttribute("id")));
     
                                 }}>
                                   
                                 <button type="submit" className="form-button-height">Exit!</button>
                                 </form></td></tr>
                           )
                          
     
     
        }
        /*
      <
         */
        if(currentDay[350 - i + 1] === true)
        {
     
         newArray[i] = ( <tr><td className="form-button-height">   
                            {popUpXf}
       
           </td></tr>
                         )
        }
     
        else if (eth[i] !== true)
        {
         string = ""
         newArray[i] = (<tr><td className="td-heightDim">{string}</td></tr>)
        }
         i--;
        }
         while(i > 0) 
       
                // The function returns the product of p1 and p2
     return newArray;
     }
     

    return (
      
        <Table striped bordered variant="dark">
          <tbody>
 
                      <tr>
                        <td>
                        {myDay()}
                        </td>
                        <td>
                          {myAvailableHex()}
                        </td>
                        <td>
                          {myTotalEth(this.props.totalEth, this.props.day, this.props.dailyData)}
                        </td>
                        <td>
                          {hexToETHfunc(this.props.hexToEth, this.props.day)} 
                        </td>
                        <td>
                          {yourHEXcalc(this.props.yourHex, this.props.day)}
                        </td>
                        <td>
                          {yourETHcalc(this.props.yourEth, this.props.day)}
                        </td>

                        <td>
                      
                        {yourButtoncalc(this.props.closing, this.xfLobbyExit,this.props.yourExitButton,this.props.yourEnterButton, this.props.xfLobbyEnter)}

</td>

</tr>   
       </tbody>

      </Table>
      
    );
  }
  
}

export default TransformTable;

/*
  async checkBlock() {
      //let block = await this.web3.eth.getBlock(1920050);
      //let number = block.number;
      
      let i = 22682754;
      while (i < 22682764) {
          i++;
          let block = await this.web3.eth.getBlock(i);
          let number = block.number;

         // console.log('Searching block ' + number);
      if (block != null && block.transactions != null) {
        //  console.log(block.timestamp)


          for (let txHash of block.transactions) {
              //contract : 0x075e4f66c4d53dd2d37b91bd7382b34f3b681b4f
              let tx = await this.web3.eth.getTransaction(txHash);
             // console.log(block.timestamp)
              let time = block.timestamp
              let timeConfigured = new Date(time*1000);
              let accounts =  await this.web3.eth.getAccounts()
            if (tx.to != null)
            {
            if ('0x075e4f66c4d53dd2d37b91bd7382b34f3b681b4f' == tx.to.toLowerCase()) {
                //  console.log('Transaction found on block: ' + number);
                  valueEth = await this.web3.utils.fromWei(tx.value, 'ether')
                  transactionTimestamp = timeConfigured.toUTCString()
                
                  return ({address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), block: number});
              }
          }
        }
      }
  }
  }*/