import React, { Component } from 'react'
import dai from '../dai.png'
import './TransformLobby/styles.css';  
class Transform extends Component {
  render() {

    return (
      <div id="content" className="mt-3">



        <div className="card mb-4" >

          <div className="card-body" style={{border:'inset', backgroundColor: '#3a3a3a', color: 'metalic'}}>

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let amount
                let day
                amount = this.input.value.toString()
                amount = amount * 100000000
                day = this.day.value.toString()
                this.props.stakeTokens(amount, day)
              }}>
              <div>
                <label className="float-left"><b>Account: </b></label>
                <span className="float-right text-muted">
                  account: {this.props.account}
                </span>
              </div>
              <div className="input-group mb-4">

                <div className="input-group-append">
                  <div className="input-group-text">
                    
                    HEX
                    &nbsp;&nbsp;&nbsp; Token
                  </div>
                </div>
              </div>
              <div className="input-group-append">
                  <div className="input-group-text">
              <label className="float-left"><b>Day</b>&nbsp;</label>
              <span className="float-right text-muted">
                  {this.props.day}
                </span>
           
              </div>
              </div>
              <button type="submit" className="btn btn-secondary btn-block btn-sm">TRANSFORM</button>
            </form>


          </div>
        </div>
        <div>
          
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