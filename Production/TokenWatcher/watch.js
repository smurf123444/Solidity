const ethers = require("ethers");
const hexABI = require("../TokenBackend2/artifacts/contracts/hexTesting.sol/Airdrop.json")
require("dotenv").config();

async function main(){
  const hexAddress = "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39"
  const provider = new ethers.providers.WebSocketProvider('https://mainnet.infura.io/v3/e272d9d07a2e489d94cee678fede6768');


  const contract = new ethers.Contract(hexAddress,hexABI, provider)

  contract.on("StakeStart", (_message, _value) =>{
    let info ={
      message: _message,
      value: _value,
    };
    console.log(JSON.stringify(message, null, 10))
  });
}

main();


/* import web3 from 'web3'
  
  async function  checkBlock() {

    //let block = await this.web3.eth.getBlock(1920050);
    //let number = block.number;
    let i = 22682745;
    let to = 0
    while (i < 22769388 ) {
        i++;
        let block = await this.Web3.eth.getBlock(i);
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

checkBlock(); */