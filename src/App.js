import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapContainer from './Container';
import ReactFileReader from 'react-file-reader';
import Papa from 'papaparse';

class App extends Component {
 
  constructor(){
    super();
    this.state = {
      tweets: []
    }
  } 
  
  componentDidMount(){
    this.setState({
      tweets: [
        {id:"1", text:"Ola mmundo", location:"Florianópolis"},
        {id:"2", text:"Ola mmundo", location:"São Paulo" },
        {id:"3", text:"Ola mmundo", location:"Curitiba" }]      
    })
  }

  handleFiles = files => {
      var reader = new FileReader();

      reader.onload = (e) => {
        var text = reader.result;
        console.log(this.state.tweets);
        Papa.parse(text, {
            step: (row) => {
              
              const tweet = {id: row.data[0][0], text: row.data[0][1], location: row.data[0][2] };
              const tweets = this.state.tweets.slice();
              tweets.push(tweet);
              
              console.log("Row:", tweet);

              this.setState({
                tweets: tweets
              });               
            }
          }
        )        
      }
      
      reader.readAsText(files[0]);
  }

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

        <MapContainer tweets={this.state.tweets}/>
      </div>
    );
  }
}

export default App;
