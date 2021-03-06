import { Address, BigDecimal, BigInt, Bytes, JSONValue, Value } from "@graphprotocol/graph-ts"
import { ExampleEntity} from "../generated/schema"
import { log } from '@graphprotocol/graph-ts'
import {
  Contract,
  Approval,
  Claim,
  ClaimAssist,
  DailyDataUpdate,
  ShareRateChange,
  StakeGoodAccounting,
  StakeEnd,
  StakeStart,
  XfLobbyEnter,
  XfLobbyExit,
  Transfer,
} from "../generated/Contract/Contract"
import { _StakeEnd
        ,_StakeStart 
        ,_StakeGoodAccounting
        ,_ShareRateChange
        ,_Claim
        ,_ClaimAssist
        ,_DailyDataUpdate
        ,_XfLobbyEnter
        ,_XfLobbyExit
        ,_TokenHolder
        ,_Transfer
        ,_MetaCounts
} from '../generated/schema'
import { StakeEndData
        ,StakeStartData
        ,StakeGoodAccountingData
        ,ShareRateChangeData 
        ,ClaimData
        ,ClaimAssistData
        ,DailyDataUpdateData
        ,DailyDataRangeData
        ,XfLobbyEnterData
        ,XfLobbyExitData
} from '../src/eventDataClasses'
 
function convertDecimalToBinary(number: BigInt): string {
  // log.debug('Binary Variable', []);
   var binary = ""; 
   let temp = number;
 
   let zero = BigInt.fromI32(0);
   let two = BigInt.fromI32(2);

   while(temp > zero){
       if((temp % two) == zero){
           binary = "0" + binary;
       }
       else {
           binary = "1" + binary;
       }
 
       temp = temp / two;
   }
   
   return binary;
}

function parseInput(input: Bytes): string {
  //0x96f62b9d - btcAddressClaim
  //0xce7d1f77 - xfLobbyEnter
  //0xcbb151d3 - xfLobbyExit
  //0x343009a2 - stakeEnd
  //0x52a438b8 - stakeStart
  //0x65cf71b2 - stakeGoodAccounting

  var result = ""; 
  let temp = input.toHexString();

  let tempSlice = temp.slice(0,10);    
   
  //log.debug('The tempSlice: {}, the temp: {}', [tempSlice, temp]);

  if(tempSlice == "0x96f62b9d"){
    result = "btcAddressClaim"
  }
  if(tempSlice == "0xce7d1f77"){
    result = "xfLobbyEnter"
  }
  if(tempSlice == "0xcbb151d3"){
    result = "xfLobbyExit"
  } 
  if(tempSlice == "0x343009a2"){
    result = "stakeEnd"
  } 
  if(tempSlice == "0x52a438b8"){
    result = "stakeStart"
  } 
  if(tempSlice == "0x65cf71b2"){
    result = "stakeGoodAccounting"
  }

  return result;
}
 
export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())
 
  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)
  
  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner
  entity.spender = event.params.spender

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  //  let contract = Contract.bind(Address.fromString("0x7BC95158eebAA2A48f6F8eeEad8Aa162996594bD"));
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.allocatedSupply(...)
  // - contract.allowance(...)
  // - contract.approve(...)
  // - contract.balanceOf(...)
  // - contract.btcAddressClaim(...)
  // - contract.btcAddressClaims(...)
  // - contract.btcAddressIsClaimable(...)
  // - contract.btcAddressIsValid(...)
  // - contract.claimMessageMatchesSignature(...)
  // - contract.currentDay(...)
  // - contract.dailyData(...)
  // - contract.dailyDataRange(...)
  // - contract.decimals(...)
  // - contract.decreaseAllowance(...)
  // - contract.globalInfo(...)
  // - contract.globals(...)
  // - contract.increaseAllowance(...)
  // - contract.merkleProofIsValid(...)
  // - contract.name(...)
  // - contract.pubKeyToBtcAddress(...)
  // - contract.pubKeyToEthAddress(...)
  // - contract.stakeCount(...)
  // - contract.stakeLists(...)
  // - contract.symbol(...)
  // - contract.totalSupply(...)
  // - contract.transfer(...)
  // - contract.transferFrom(...)
  // - contract.xfLobby(...)
  // - contract.xfLobbyEntry(...)
  // - contract.xfLobbyMembers(...)
  // - contract.xfLobbyPendingDays(...)
  // - contract.xfLobbyRange(...)
}

export function handleClaim(event: Claim): void {
  let id = event.params.timestamp.toHexString();
  let _claim = _Claim.load(event.params.timestamp.toHexString());

  if (_claim == null) {
    _claim = new _Claim(id);
  }
  
//timestamp
_claim.timestamp = event.params.timestamp;  
//rawAmount
_claim.rawAmount = event.params.rawAmount;  
//adjAmount
_claim.adjAmount = event.params.adjAmount;  
//totalClaimedHearts
_claim.totalClaimedHearts = event.params.totalclaimedHearts;  
//account
_claim.account = event.params.account;  
//referrerAddr
_claim.referrerAddr = event.params.referrerAddr;  
  
  _claim.save();
}

export function handleClaimAssist(event: ClaimAssist): void {
 
  let id = event.params.senderAddr.toHexString();
  let _claimAssist = _ClaimAssist.load(event.params.senderAddr.toHexString());

  if (_claimAssist == null) {
    _claimAssist = new _ClaimAssist(id);
  }

  _claimAssist.senderAddr = event.params.senderAddr;  
  _claimAssist.adjAmount = event.params.adjAmount;
  _claimAssist.rawAmount = event.params.rawAmount;
//timestame
_claimAssist.timestamp = event.params.timestamp;

//referrerAddr
_claimAssist.referrerAddr = event.params.referrerAddr;
//totalClaimedHearts
_claimAssist.totalClaimedHearts = event.params.totalClaimedHearts;


  _claimAssist.save();
}

export function handleDailyDataUpdate(event: DailyDataUpdate): void {
  let d0 = event.params.data0;   
 
  let _d0 = convertDecimalToBinary(d0);
  
  let parsedData = new DailyDataUpdateData(_d0);

  let endDayIndex = parsedData.getEndDay(); 

  let id = endDayIndex.toString();
 
  let _dailyDataUpdate = _DailyDataUpdate.load(endDayIndex.toString());

  if (_dailyDataUpdate == null) {
    _dailyDataUpdate = new _DailyDataUpdate(id);
  }
 
  _dailyDataUpdate.updaterAddr = event.params.updaterAddr; 
  _dailyDataUpdate.data0 = event.params.data0;  


  _dailyDataUpdate.timestamp = parsedData.getTimestamp();
  _dailyDataUpdate.beginDay = parsedData.getBeginDay(); 
  _dailyDataUpdate.endDay = parsedData.getEndDay(); 
  _dailyDataUpdate.isAutoUpdate = parsedData.getIsAutoUpdate();

  let hexContract = Contract.bind(Address.fromString("0x7BC95158eebAA2A48f6F8eeEad8Aa162996594bD"));

  let _beginDay = BigInt.fromI32(parsedData.getBeginDay());
  let _endDay = BigInt.fromI32(parsedData.getEndDay()); 

  let dailyData0 = hexContract.dailyDataRange(_beginDay,_endDay);

  let _dd = convertDecimalToBinary(dailyData0[0]);

  let parsedDailyData = new DailyDataRangeData(_dd);

  _dailyDataUpdate.payout = parsedDailyData.getPayout(); 
  _dailyDataUpdate.shares = parsedDailyData.getShares(); 
  _dailyDataUpdate.sats = parsedDailyData.getSats();

  let parsedPayout = parsedDailyData.getPayout();
  let parsedShares = parsedDailyData.getShares();

  let zero = BigDecimal.fromString("0");
  let payoutHex: BigDecimal = zero; 
  let payoutPerTshare: BigDecimal = zero;
  if (parsedPayout != zero && parsedShares != zero){
    payoutHex = parsedPayout / BigDecimal.fromString("100000000"); 
    let tShares: BigDecimal = parsedShares / BigDecimal.fromString("1000000000000"); 
    payoutPerTshare = payoutHex / tShares;
  } 
  _dailyDataUpdate.payoutPerTShare = payoutPerTshare;
  let blockNumberBigDecimal = BigDecimal.fromString(event.block.number.toString());
  _dailyDataUpdate.blockNumber =  blockNumberBigDecimal;


 

  
  let tft = BigInt.fromI32(352);
  if(_endDay < tft){
    let lobbyEthEntered = hexContract.xfLobbyRange(_beginDay,_endDay);
    let lobbyHexAvailable = hexContract.dailyData(_beginDay);
   

    let _lobbyWeiEntered = lobbyEthEntered[0].toString();
    let _lobbyWeiEnteredDecimal = BigDecimal.fromString(_lobbyWeiEntered);
   
    let _lobbyEthEntered:BigDecimal = _lobbyWeiEnteredDecimal / BigDecimal.fromString("1000000000000000000");
    _dailyDataUpdate.lobbyEth = _lobbyEthEntered;
    
    let _lobbyHexAvailable = lobbyHexAvailable.value2.toString();
    log.debug('the data1: {}, dailyData: {}', [lobbyEthEntered[0].toString(), lobbyHexAvailable.value2.toString()]);
    if (lobbyEthEntered[0].toString() == "0" || lobbyHexAvailable.value2.toString() == "0"){
      _dailyDataUpdate.lobbyHexAvailable = BigDecimal.fromString("0");
      _dailyDataUpdate.lobbyHexPerEth = BigDecimal.fromString("0");
    }
    else {
    let _lobbyHexAvailableDecimal = ( BigDecimal.fromString(_lobbyHexAvailable) / BigDecimal.fromString("350") ) * BigDecimal.fromString("10000");
   
    _dailyDataUpdate.lobbyHexAvailable = _lobbyHexAvailableDecimal;
  
    _dailyDataUpdate.lobbyHexPerEth = (_lobbyHexAvailableDecimal / _lobbyEthEntered) / BigDecimal.fromString("100000000");
    }
  }
  _dailyDataUpdate.save();
} 

export function handleShareRateChange(event: ShareRateChange): void {
  let id = event.params.stakeId.toHexString()

  let _shareRateChange = _ShareRateChange.load(event.params.stakeId.toHexString());

  if (_shareRateChange == null) {
     _shareRateChange = new _ShareRateChange(id);
  }
 
  _shareRateChange.stakeId = event.params.stakeId; 
  _shareRateChange.data0 = event.params.data0;  

  let d0 = event.params.data0;  
  let _d0 = convertDecimalToBinary(d0);
  
  let parsedData = new ShareRateChangeData(_d0);
 
  _shareRateChange.timestamp = parsedData.getTimestamp();
  _shareRateChange.shareRate = parsedData.getShareRate(); 

  let shareRateDecimal = parsedData.getShareRate();
 
  let fiveBigDecimal = BigDecimal.fromString("100000");
  let hexHearts = BigDecimal.fromString("100000000");
  let tShare = BigDecimal.fromString("1000000000000"); 

  let sharesPerHeart = shareRateDecimal / fiveBigDecimal;   
  let _sharesPerHeart = sharesPerHeart.toString();

  let tShareRateHearts = tShare * BigDecimal.fromString(_sharesPerHeart);   
  let tShareRateHex = tShareRateHearts / hexHearts;


  _shareRateChange.tShareRateHearts = tShareRateHearts; 
  _shareRateChange.tShareRateHex = tShareRateHex; 
   let blockNumberBigDecimal = BigDecimal.fromString(event.block.number.toString());
   _shareRateChange.blockNumber =  blockNumberBigDecimal;

  _shareRateChange.save();
}

export function handleStakeStart(event: StakeStart): void {
  let id = event.params.stakeId.toHexString()

  let _stakeStart = _StakeStart.load(event.params.stakeId.toHexString());

  if (_stakeStart == null) {
     _stakeStart = new _StakeStart(id);
  }

  _stakeStart.stakerAddr = event.params.stakerAddr; 
  _stakeStart.stakeId = event.params.stakeId; 
  _stakeStart.data0 = event.params.data0;

  let d = (event.params.data0);  

  let _d = convertDecimalToBinary(d);

  let parsedData = new StakeStartData(_d);
 
  _stakeStart.timestamp = parsedData.getTimestamp();
  _stakeStart.stakedHearts = parsedData.getStakedHearts();
  _stakeStart.stakeShares = parsedData.getStakedShares();
  _stakeStart.stakedDays = parsedData.getStakedDays();
  _stakeStart.isAutoStake = parsedData.getIsAutoStake(); 
  
  let hexHearts = BigDecimal.fromString("100000000");
  let tShare = BigDecimal.fromString("1000000000000"); 
  let sharesBigDecimal = parsedData.getStakedShares(); 

  let tShares = sharesBigDecimal / tShare;
  
  _stakeStart.stakeTShares = tShares; 

  let hexContract = Contract.bind(Address.fromString("0x7BC95158eebAA2A48f6F8eeEad8Aa162996594bD"));
  let currentDay = hexContract.currentDay();
  let _currentDay = currentDay.toBigDecimal();
  let startDay = _currentDay + BigDecimal.fromString("2");

  _stakeStart.startDay = startDay;
  let endDay = startDay + parsedData.getStakedDays();
  _stakeStart.endDay = endDay;

  //log.debug('the _currentDay: {} , startDay: {} , endDay: {}', [currentDay.toString(),_currentDay.toString(),endDay.toString()]);
  let blockNumberBigDecimal = BigDecimal.fromString(event.block.number.toString());
  _stakeStart.blockNumber =  blockNumberBigDecimal;

  _stakeStart.save();
}

export function handleStakeEnd(event: StakeEnd): void {
 
  let id = event.params.stakeId.toHexString();
   
  let _stakeEnd = _StakeEnd.load(event.params.stakeId.toHexString());

  if (_stakeEnd == null) {
     _stakeEnd = new _StakeEnd(id);
  }
   
  _stakeEnd.stakerAddr = event.params.stakerAddr; 
  _stakeEnd.stakeId = event.params.stakeId; 
  _stakeEnd.data0 = event.params.data0;
  _stakeEnd.data1 = event.params.data1; 

  let d0 = event.params.data0; 
  let d1 = event.params.data1; 
  
  let _d0 = convertDecimalToBinary(d0);

  let _d1 = "0";
  let zero = BigInt.fromI32(0);
  if (d1 != zero) _d1 = convertDecimalToBinary(d1);

  let parsedData = new StakeEndData(_d0,_d1);
 
  _stakeEnd.timestamp = parsedData.getTimestamp();
  _stakeEnd.stakedHearts = parsedData.getStakedHearts();
  _stakeEnd.stakedShares = parsedData.getStakedShares();
  _stakeEnd.payout = parsedData.getPayout();
  _stakeEnd.penalty = parsedData.getPenalty();
  _stakeEnd.servedDays = parsedData.getServedDays();
  _stakeEnd.prevUnlocked = parsedData.getPrevUnlocked();
  
  let hexContract = Contract.bind(Address.fromString("0x7BC95158eebAA2A48f6F8eeEad8Aa162996594bD"));
  
  let currentDay = hexContract.currentDay();
  let _currentDay:BigDecimal = BigDecimal.fromString(currentDay.toString());
  let one:BigDecimal = BigDecimal.fromString("1");
  _currentDay = _currentDay + one;
  let startStakeId = event.params.stakeId.toHexString();

  let _stakeStart = _StakeStart.load(startStakeId);
  let dueDay:BigDecimal = _stakeStart.stakedDays + _stakeStart.startDay;
  let daysLate:BigDecimal = BigDecimal.fromString("0");
  let daysEarly:BigDecimal = BigDecimal.fromString("0");
  
  if(_currentDay > dueDay){
    daysLate = _currentDay - dueDay;
  }
  if(_currentDay < dueDay){
    daysEarly = dueDay - _currentDay;
  }
  if(_currentDay == dueDay){
    daysLate = BigDecimal.fromString("0");
    daysEarly = BigDecimal.fromString("0");
  }
  _stakeEnd.daysLate = daysLate;
  _stakeEnd.daysEarly = daysEarly;

  _stakeStart.stakeEnd = event.params.stakeId.toHexString();
  
  let blockNumberBigDecimal = BigDecimal.fromString(event.block.number.toString());
  _stakeEnd.blockNumber =  blockNumberBigDecimal;

   _stakeEnd.save(); 
   _stakeStart.save();
}

export function handleStakeGoodAccounting(event: StakeGoodAccounting): void {
  let id = event.params.stakeId.toHexString();

  let _stakeGoodAccounting = _StakeGoodAccounting.load(event.params.stakeId.toHexString());

  if (_stakeGoodAccounting == null) {
     _stakeGoodAccounting = new _StakeGoodAccounting(id);
  }

  _stakeGoodAccounting.stakerAddr = event.params.stakerAddr; 
  _stakeGoodAccounting.stakeId = event.params.stakeId; 
  _stakeGoodAccounting.data0 = event.params.data0;
  _stakeGoodAccounting.data1 = event.params.data1;
 
  let d0 = event.params.data0; 
  let d1 = event.params.data1;
  //log.debug('About to Convert To Binary: {}', [
  //  d.toString()
  //]);
  
  let _d0 = convertDecimalToBinary(d0);

  let _d1 = "0";
  let zero = BigInt.fromI32(0);
  if (d1 != zero) _d1 = convertDecimalToBinary(d1);

  let parsedData = new StakeGoodAccountingData(_d0,_d1);
 
  _stakeGoodAccounting.timestamp = parsedData.getTimestamp();
  _stakeGoodAccounting.stakedHearts = parsedData.getStakedHearts();
  _stakeGoodAccounting.stakedShares = parsedData.getStakedShares();
  _stakeGoodAccounting.payout = parsedData.getPayout();
  _stakeGoodAccounting.penalty = parsedData.getPenalty(); 

  
  let startStakeId = event.params.stakeId.toHexString();

  let _stakeStart = _StakeStart.load(startStakeId);
  _stakeStart.stakeGoodAccounting = event.params.stakeId.toHexString();

  let blockNumberBigDecimal = BigDecimal.fromString(event.block.number.toString());
  _stakeGoodAccounting.blockNumber =  blockNumberBigDecimal;

  _stakeGoodAccounting.save();
  _stakeStart.save();
   
}

export function handleXfLobbyEnter(event: XfLobbyEnter): void {

  let id = event.params.entryId.toHexString() + event.params.memberAddr.toHexString();

  let _xfLobbyEnter = _XfLobbyEnter.load(event.params.entryId.toHexString() + event.params.memberAddr.toHexString());

  if (_xfLobbyEnter == null) {
    _xfLobbyEnter = new _XfLobbyEnter(id);
  } 

  _xfLobbyEnter.data0 = event.params.data0; 
  _xfLobbyEnter.memberAddr = event.params.memberAddr; 
  _xfLobbyEnter.entryId = event.params.entryId; 
  _xfLobbyEnter.referrerAddr = event.params.referrerAddr; 

  let d0 = event.params.data0; 
  
  let _d0 = convertDecimalToBinary(d0);

  let parsedData = new XfLobbyEnterData(_d0);
 
  _xfLobbyEnter.timestamp = parsedData.getTimestamp();
  _xfLobbyEnter.rawAmount = parsedData.getRawAmount();

  let hexContract = Contract.bind(Address.fromString("0x7BC95158eebAA2A48f6F8eeEad8Aa162996594bD"));
  let currentDay = hexContract.currentDay();
  let _currentDay = currentDay.toBigDecimal();
  let day = _currentDay + BigDecimal.fromString("1");

  _xfLobbyEnter.enterDay = day;

  _xfLobbyEnter.save();
}

export function handleXfLobbyExit(event: XfLobbyExit): void {
  let id = event.params.entryId.toHexString() + event.params.memberAddr.toHexString();

  let _xfLobbyExit = _XfLobbyExit.load(event.params.entryId.toHexString() + event.params.memberAddr.toHexString());

  if (_xfLobbyExit == null) {
    _xfLobbyExit = new _XfLobbyExit(id);
  } 

  _xfLobbyExit.data0 = event.params.data0; 
  _xfLobbyExit.memberAddr = event.params.memberAddr; 
  _xfLobbyExit.entryId = event.params.entryId; 
  _xfLobbyExit.referrerAddr = event.params.referrerAddr;  

  let d0 = event.params.data0; 
  
  let _d0 = convertDecimalToBinary(d0);

  let parsedData = new XfLobbyExitData(_d0);
 
  _xfLobbyExit.timestamp = parsedData.getTimestamp();
  _xfLobbyExit.xfAmount = parsedData.getXfAmount();
  
  let _XfLobbyEnterId = event.params.entryId.toHexString() + event.params.memberAddr.toHexString();

  let _xfLobbyEnter = _XfLobbyEnter.load(_XfLobbyEnterId);
  _xfLobbyEnter.xfLobbyExit = event.params.entryId.toHexString() + event.params.memberAddr.toHexString();

  _xfLobbyEnter.save();
  _xfLobbyExit.save();
  
} 

export function handleTransfer(event: Transfer): void { 
  let _metaCount = _MetaCounts.load("Transfer");
  if (_metaCount == null) {
    _metaCount = new _MetaCounts("Transfer");
    let zero = BigInt.fromI32(0);
    _metaCount.count = zero;
  }
  let one = BigInt.fromI32(1);
  _metaCount.count = _metaCount.count.plus(one);
  _metaCount.save();

  let id = _metaCount.count.toString() + event.transaction.hash.toHexString();

  let _transfer = _Transfer.load(id);

  if (_transfer == null) {
    _transfer = new _Transfer(id);
  }

  let hexContract = Contract.bind(Address.fromString("0x7BC95158eebAA2A48f6F8eeEad8Aa162996594bD"));
  let currentDay = hexContract.currentDay();

  _transfer.numeralIndex = _metaCount.count;
  _transfer.transactionHash = event.transaction.hash;
  _transfer.gasUsed = event.transaction.gasUsed;
  _transfer.gasPrice = event.transaction.gasPrice;

  _transfer.input = event.transaction.input.toHexString();
  let methodId = parseInput(event.transaction.input);
  if(methodId != ""){
    _transfer.methodId =  methodId;
  }
  else{
    _transfer.methodId =  null; 
  }
  _transfer.from = event.params.from; 
  _transfer.to = event.params.to; 
  _transfer.value = event.params.value;
  _transfer.hexDay = currentDay;
  _transfer.timestamp = event.block.timestamp;
  _transfer.save();
 
  ///////TokenHolder from Update/////// 
  updateTokenHolder(event.params.from, event.params.value.toString(), '-', event.block.timestamp, event.block.number);

  ///////TokenHolder to Update///////
  updateTokenHolder(event.params.to, event.params.value.toString(), '+', event.block.timestamp, event.block.number);

}

function updateTokenHolder(address:Address, value: string, operator:string, eventTimestamp:BigInt, eventBlockNumber:BigInt): void {
  let Id = address.toHexString();

  let _tokenHolder = _TokenHolder.load(Id);
  let currentTokenBalance = BigDecimal.fromString("0"); 
  let currentTotalSent = BigDecimal.fromString("0"); 
  let currentTotalReceived = BigDecimal.fromString("0"); 
  let hexContract = Contract.bind(Address.fromString("0x7BC95158eebAA2A48f6F8eeEad8Aa162996594bD"));
  let currentDay = hexContract.currentDay();
  
  if (_tokenHolder == null) {
    _tokenHolder = new _TokenHolder(Id);
    _tokenHolder.totalSent = currentTotalSent;
    _tokenHolder.totalReceived = currentTotalReceived;
    _tokenHolder.createdTimeStamp = eventTimestamp;
    _tokenHolder.createdBlocknumber = eventBlockNumber;
    _tokenHolder.createdHexDay = currentDay;
    let _metaCount = _MetaCounts.load("TokenHolder");
    if (_metaCount == null) {
      _metaCount = new _MetaCounts("TokenHolder");
      let zero = BigInt.fromI32(0);
      _metaCount.count = zero;
    }
    let one = BigInt.fromI32(1);
    _metaCount.count = _metaCount.count.plus(one);
    _metaCount.save();
    _tokenHolder.numeralIndex = _metaCount.count;
  }
  else{
    currentTokenBalance = _tokenHolder.tokenBalance;
    if(operator == '+'){
      currentTotalReceived = _tokenHolder.totalReceived; 
    }
    if(operator == '-'){
      currentTotalSent = _tokenHolder.totalSent; 
    }
  }



  let valueBigDecimal:BigDecimal = BigDecimal.fromString(value);
  let newTokenBalance:BigDecimal = BigDecimal.fromString("0"); 
  let newTotalSent:BigDecimal = BigDecimal.fromString("0"); 
  let newTotalReceived:BigDecimal = BigDecimal.fromString("0"); 

  if(operator == '+'){
    newTokenBalance = currentTokenBalance + valueBigDecimal; 
    newTotalReceived = currentTotalReceived + valueBigDecimal; 
    _tokenHolder.totalReceived = newTotalReceived;
  }
  if(operator == '-'){
    newTokenBalance = currentTokenBalance - valueBigDecimal; 
    newTotalSent = currentTotalSent + valueBigDecimal;
    _tokenHolder.totalSent = newTotalSent;
  }
  _tokenHolder.lastModifiedHexDay = currentDay;
  _tokenHolder.lastModifiedTimeStamp = eventTimestamp;
  _tokenHolder.holderAddress = address;
  _tokenHolder.tokenBalance = newTokenBalance;
  
  _tokenHolder.save(); 
}