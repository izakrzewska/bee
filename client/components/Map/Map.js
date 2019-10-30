import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => <div style={{ height: '5px', width: '5px', borderRadius: '50%', backgroundColor: 'black' }}>{text}</div>;

class Map extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      newApiaryCoordinates: {
        long: 0,
        lat: 0
      }
    }
  }

    onMapCliked(e) {
      this.setState({
        newApiaryCoordinates: {
          long: e.lng,
          lat: e.lat
        }
      }, () => this.props.setNewApiaryCoordinates(this.state.newApiaryCoordinates))
    }
  
    render() {
      const defaultProps = {
        center: {
          lat: 59.95,
          lng: 30.33
        },
        zoom: 15
      };
      
      const userLocation = {
        lat: this.props.userCoordinates.lat,
        lng: this.props.userCoordinates.long
      }

      return (
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyB3NaWrODZ83svVrKyDxwB_tiW8f7y7xBg' }}
            defaultCenter={defaultProps.center}
            center={userLocation}
            defaultZoom={defaultProps.zoom}
            onClick={(e) => this.onMapCliked(e)}
          >

            { this.props.isMarkerVisible ?
              <Marker
                lat={this.state.newApiaryCoordinates.lat}
                lng={this.state.newApiaryCoordinates.long}
                text="My Marker"
              />  
            : null }

          </GoogleMapReact>
        </div>
      );
    }
  }
  
export default Map;