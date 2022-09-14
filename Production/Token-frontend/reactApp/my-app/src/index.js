import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
/* 
fs.writeFile('account.txt', String('0x5bC8bf5A75D221fF30b2c2B2a7235D6aeEFF4A84'), function(err) {
  console.log("Data written successfully!");
  console.log("Let's read newly written data");

  // Read the newly written file and print all of its content on the console
  fs.readFile('account.txt', function (err, data) {
     console.log("Asynchronous read: " + data.toString());
  });
}); */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
