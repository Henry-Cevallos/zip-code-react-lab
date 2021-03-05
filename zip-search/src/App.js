import React, { Component } from 'react';
import './App.css';
function City({city, state}) {
  return (
    <div>
      This is the City component for {city}, {state}
    </div>
  );
}
function ZipSearchField({ onZipChange }) {
  return (
    <div>
      <label>Zip Code:</label>
      <input type="text" onChange={onZipChange} />
    </div>
  );
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: '',
      cities: [],
    }
  }
  
  zipChanged(e) {
    let zip = e.target.value;
    this.setState({
      zipCode: zip
    })

    // Make GET request for the zip resource
    // then, when you receive the result, store it in state
    fetch(`http://ctp-zip-api.herokuapp.com/zip/${zip}`)
      .then(res => res.json())
      .then(jsonData => {
        console.log(jsonData);
        this.setState({
          cities: jsonData
        })
      })
      
     
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField onZipChange={(e) => this.zipChanged(e)} />
        <div>
          {/*
            Instead of hardcoding the following 3 cities,
            Create them dynamically from this.state.cities
          */}
          {
            this.state.cities.map(c => {
              return <City city={c.City} state={c.State}/>;
            })
          }
        </div>
      </div>
    );
  }
}

export default App;