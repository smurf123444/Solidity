import React, { Component } from 'react'
import './TransformLobbyOld/styles.css'; 
import GetXfCompEntersAndExit from './Loaders/getXfCompEntersAndExit';
import GetXfExits from './Loaders/getXfExits'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { Card} from 'react-bootstrap';
class Transform extends Component {
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
            // console.log(amount)
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
                this.props.exitDay(day)
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
