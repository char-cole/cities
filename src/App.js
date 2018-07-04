import React, { Component } from 'react';
import './App.css';
import CountryMenu from './CountryMenu'

/*
List of countries called from bAPI and saved to state as objects with .name and .code

User selects country from (list?)
User selects region from (list?)
User selects city/county from (list?)

Take lat/long coords from bAPI for given city an store in state.lat and state.lon
Using .lat and .lon, call ISS tracker
Display next 3 passes of the ISS over chosen city

Separately, display current ISS coordinates
*/

const citySearch = "http://battuta.medunes.net/api/city/"+"code"+"/search/?city="+"hint"+"&key=";
const battutaKey = "ad3486b7c0cf4595f01223963f58f91a";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
    };
  };


  componentDidMount() {
    fetch("http://api.open-notify.org/iss-pass.json?lat=70&lon=100&n=1")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
              });
              const passDate = new Date(result.response[0].risetime*1000);
              console.log("Next pass: "+passDate+" (duration: "+(result.response[0].duration/60).toFixed(2)+" minutes)");
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )


  }

  render() {
    const { error, isLoaded, countries } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>{<CountryMenu/>}</div>
      );
    }
  }
}

export default App;
