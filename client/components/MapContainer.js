import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
  
export class MapContainer extends Component {

    onMapCliked(mapProps, map, clickEvent) {
        console.log('mapa kliknieta');
        // tu musze pobrac koordynaty z kliku i wyslac jako argument do setNewApiary
        this.props.setNewApiaryCoordinates('hej');
    }

    render() {
        
        const marker = (
            <Marker />
        );
        
        return (
        
            <Map 
                google={this.props.google} 
                zoom={17}
                initialCenter={{
                    lat: this.props.coordinates.lat,
                    lng: this.props.coordinates.long
                }}
                onClick={(mapProps, map, clickEvent) => this.onMapCliked(mapProps, map, clickEvent)}
            >
                

                { this.props.isMarkerVisible ? marker : null}

        
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