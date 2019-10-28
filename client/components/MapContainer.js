import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
  
export class MapContainer extends Component {



    onMarkerClick() {
        console.log('clicked')
    }

    render() {

        console.log(this.props.coordinates, 'kooo')
       
        
        return (
        
            <Map 
                google={this.props.google} 
                zoom={17}
                initialCenter={{
                    lat: this.props.coordinates.lat,
                    lng: this.props.coordinates.long
                }}
            >
        
                {/* <Marker onClick={this.onMarkerClick}
                        name={'Current location'} 
                        initialCenter={{
                            lat: 40.854885,
                            lng: -88.081807
                        }}
                /> */}
        
                {/* <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                    <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow> */}
            </Map>
        );
      }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyB3NaWrODZ83svVrKyDxwB_tiW8f7y7xBg')
})(MapContainer)