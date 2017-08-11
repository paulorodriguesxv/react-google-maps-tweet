import React from 'react'

import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      markers: [],
      locations: []
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.loaded == false) return
 
    const google = nextProps.google;
    const service = new google.maps.Geocoder();

    nextProps.tweets.map((tweet) => {
        this.geocodeAddress(google, service, tweet);
      }
    );    
        
  }

  componentDidMount(){
  }

  shouldComponentUpdate(nextProps, nextState) {
    // You can access `this.props` and `this.state` here
    // This function should return a boolean, whether the component should re-render.
  
    console.log("updating...");
    return true;
  }
  
  // On map ready, process geocoder for each tweet
  onMapReady = (mapProps, map) => {
    const {google} = mapProps;
    const service = new google.maps.Geocoder();

    this.props.tweets.map((tweet) => {
        this.geocodeAddress(service, tweet);
      }
    );    
  }
  
  // Create a marker
  renderTweet = (tweet, location) => {
    return <Marker
                key={tweet.id}
                title={tweet.text}
                position={location} />
  }
  
  // Return location (google maps api) from given address
  geocodeAddress = (google, service, tweet) => {
  
    if (tweet == null) return;
    if (tweet.location == "") return;
    if (this.state.locations.indexOf(tweet.location) > -1) return;

    let address = tweet.location;
    const maps = google.maps;

    const locations = this.state.locations.slice();
    locations.push(address);
    this.setState({
      locations: locations
    })

    service.geocode({ 'address': address }, (results, status) => {
          if (status === maps.GeocoderStatus.OK) {
            let location = results[0].geometry.location;

            // lets keep markers immutable
            const markers = this.state.markers.slice();            

            markers.push(this.renderTweet(tweet, location));

            this.setState({
              markers: markers,
            });
            
          } else {
            // Oops, something was wrong
            console.log("Geocode unsuccessful:" + address + " status: " + status);
          }
        });
  }

  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }

    return (
      <Map google={this.props.google} zoom={5}
        onReady={this.onMapReady}
        centerAroundCurrentLocation={true}>       
        {this.state.markers}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBPmwTKNsgKrNr-rCbJIHgOFu47ZZGcJ0Y"
})(MapContainer)