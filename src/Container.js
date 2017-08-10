import React from 'react'

import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {

  constructor(){
    super();
    this.state = {markers: []};
  }

  componentWillReceiveProps(nextProps) {

    //console.log("executing componentWillReceiveProps....");

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
  geocodeAddress = (service, tweet) => {
    let address = tweet.location;
    const {google} = this.props;
    const maps = google.maps;

    service.geocode({ 'address': address }, (results, status) => {
          if (status === maps.GeocoderStatus.OK) {
            let location = results[0].geometry.location;

            // lets keep markers immutable
            const markers = this.state.markers.slice();
            markers.push(this.renderTweet(tweet, location));

            this.setState({
              markers: markers
            });
            
          } else {
            // Oops, something was wrong
            console.log("Geocode unsuccessful:" + address);
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