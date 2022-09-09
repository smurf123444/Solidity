import React, { Component, useState } from 'react'
import dai from './dai.png'
import { Button, Navbar, Nav, NavDropdown, Image, FormControl, Card, CardColumns, CardGroup, Row, Container, Col, Modal} from 'react-bootstrap';
import './TransformLobbyOld/styles.css'; 
import Collapse from 'react-bootstrap/Collapse'; 

class Main extends Component {
  
  render() {

    return (
      
      <div id="content" className="mt-3">

<br></br>



      <Col className="container-lg mt-5" >
      <Card style={{borderStyle:'none', width: "30rem", color:'black',backgroundColor: 'transparent', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);'}}>
    
        <Card.Body>
 <center>          <Card.Title style={{color:'black'}}>STAKE HEX</Card.Title>
          &nbsp;<img src={require('./Loaders/HEXagon.png')} style={{width: 55, height: 45}}></img> 
   </center>

          <Card.Body tyle={{ width: "30rem", color:'black',backgroundColor: '#transparent'}}>
                <div>
                <label className="float-left" style={{color:'black'}}><b>Stake HEX Tokens</b></label>
                <span className="float-right text-muted">
                  <br></br>Balance: <br></br>{this.props.dappTokenBalance}
                </span>
                &nbsp;<img src={require('./Loaders/HEXagon.png')} style={{width: 18, height: 15}}></img> 
                </div>
                </Card.Body>
          <Card.Text style={{borderStyle:'none'}}>
            Stake Hex for ANY amount of days (between 1 - 5555) 
          </Card.Text>
          <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let amount
                let day
                amount = this.input.value.toString()
                amount = amount * 100000000
                day = this.day.value.toString()
                this.props.stakeTokens(amount, day)
              }}>        
              <div className="input-group mb-2">
                <input
                  type="text"
                  ref={(input) => { this.input = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">  
                  <img src={require('./Loaders/HEXagon.png')} style={{width: 20, height: 18}}></img>  &nbsp;Token
                  </div>
                </div>
              </div>
              <div className="input-group-append">
                  <div className="input-group-text">
              <label className="float-left"><b>Days</b>&nbsp;</label>
              <input
                  type="text"
                  ref={(input) => { this.day = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
              </div>
              </div>
              <button type="submit" className="btn btn-secondary btn-block btn-lg">STAKE!</button>
            </form>
        </Card.Body>
{/*         <Card.Footer>
          <small className="text-muted"></small>
        </Card.Footer> */}
      </Card>
      </Col>




</div>
    );
  }
}

export default Main;
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