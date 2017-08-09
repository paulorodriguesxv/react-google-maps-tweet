import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {

  constructor(){
    super();
    this.state = {markers: []};
  }

  onMapReady =(mapProps, map) => {
    const {google} = mapProps;
    const service = new google.maps.Geocoder();
    const maps = google.maps;

    this.props.tweets.map((tweet) => {
        this.geocodeAddress(service, maps, tweet);
      }
    );    
  }
  
  renderTweet = (tweet, location) => {

    return <Marker
                key={tweet.id}
                title={tweet.text}
                position={location} />
  }
  
  geocodeAddress = (service, maps, tweet) => {
    let address = tweet.location;

    service.geocode({ 'address': address }, function(results, status) {
          if (status === maps.GeocoderStatus.OK) {
            let location = results[0].geometry.location;

            const markers = this.state.markers.slice();

            markers.push(this.renderTweet(tweet, location));

            this.setState({
              markers: markers
            });
            console.log(location.lat() + " " + location.lng());
            
            return location;
          } else {
            console.log("Geocode unsuccessful:" + address);
          }
        });
  }


  processTweets = (maps, tweets) => {

    tweets.map((tweet) => {
        this.codeAddress(maps, tweet);
      }
    );
    
  }

  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }

    //this.processTweets(this.props.google.maps, this.props.markers);
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