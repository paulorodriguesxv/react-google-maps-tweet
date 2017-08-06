import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {

  renderTweet = (tweet, location) => {

    return <Marker
                key={tweet.id}
                title={tweet.text}
                position={location} />
  }
  
  codeAddress = (maps, tweet, onResp) => {

    let address = tweet.location;
    let geocoder = new maps.Geocoder();
    let renderTweet = this.renderTweet; 

    geocoder.geocode({ 'address': address }, function(results, status) {
          if (status === maps.GeocoderStatus.OK) {
            let location = results[0].geometry.location;

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

    let markers = [
      this.renderTweet(this.props.markers[0], {lat: -27, lng:-48})  
    ]

    this.processTweets(this.props.google.maps, this.props.markers);
    
    return (
      <Map google={this.props.google} zoom={5}
        centerAroundCurrentLocation={true}>       
        {markers}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBPmwTKNsgKrNr-rCbJIHgOFu47ZZGcJ0Y"
})(MapContainer)