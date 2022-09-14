import React from 'react';  
import '../TransformLobbyOld/styles.css';  
/* eslint-disable jsx-a11y/accessible-emoji */
class PopupStakeEnd extends React.Component {  
  web3;

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      tokenFarm: '',
      account:''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {  


       let s = this.props.stakeID
return (  
<div className='popup'>  
<div className='popup_open'>  
<button onClick={this.props.closePopup}>X</button>  

<center><h1 class="h1_popup"><span role="img">⚠️</span>xWarning <span>⚠️</span></h1>  </center>

<center><h4 class="h1_popup">-</h4>  </center>
<center><h4 class="h1_popup">Ending a Stake EARLY or LATE can cause a penalty (up to 100%)</h4>  </center>

<center><h4 class="h1_popup">-</h4>  </center>
<center><h4 class="h1_popup">Make Absolutely SURE that your stake is DUE today!</h4>  </center>

<center><h4 class="h1_popup">-</h4>  </center>
<center><h4 class="h1_popup">WE DO NOT ISSUE REFUNDS AND CANNOT ROLLBACK TRANSACTIONS ON ETHEREUM</h4>  </center>
<center><h4 class="h1_popup">-</h4>  </center>
<center><h4 class="h1_popup">Click "Submit" if you confirm or EXIT this popup...</h4>  </center>
<br></br>
<form className="form-button-height" id={s} onSubmit={(event) => {
                               
                               event.preventDefault()
                                console.log(s)
                               this.props.func(this.props.stakeIndex, this.props.stakeID);
   
                               }}>
                   <button type="submit" className="btn btn-primary btn-block btn-sm">Submit</button>


</form>
<br></br>
<form className="form-button-height" id={s} onSubmit={(event) => {
                               
                               event.preventDefault()
                                console.log(s)
                               this.props.func(this.props.stakeIndex + 1, this.props.stakeID);
   
                               }}>
                   <button type="submit" className="btn btn-secondary btn-block btn-sm">Problems? (Temporary Transaction Reject Fix)</button>

                   </form>

</div>  

</div>  
);  
}  

}  

export default PopupStakeEnd;