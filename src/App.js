import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapContainer from './Container';
import ReactFileReader from 'react-file-reader';
import Papa from 'papaparse';

class App extends Component {
  handleFiles = files => {
      var reader = new FileReader();

      reader.onload = function(e) {
        var text = reader.result;

        Papa.parse(text, {
            step: function (row) {
              console.log("Row:", row.data);
            }
          }
        )        
      }
      
      reader.readAsText(files[0]);
  }
  
  tweets = [
    {id: 1, location: "Santa Catarina, SC", text: "tweet 1"},
    {id: 2, location: "São Paulo, SP", text: "tweet 2"},
    {id: 3, location: "Barbacena, MG", text: "tweet 3"}
  ]

  render() {
    
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
    <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
      <button className='btn'>Upload</button>
    </ReactFileReader>    

        <MapContainer tweets={this.tweets}/>
      </div>
    );
  }
}

export default App;
