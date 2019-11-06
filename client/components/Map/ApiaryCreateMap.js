import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import ApiaryCreateMarker from "./Markers/ApiaryCreateMarker";

class ApiaryCreateMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newApiaryCoordinates: {
        long: 0,
        lat: 0
      }
    };
  }

  onMapCliked(e) {
    this.setState(
      {
        newApiaryCoordinates: {
          long: e.lng,
          lat: e.lat
        }
      },
      () => this.props.setNewApiaryCoordinates(this.state.newApiaryCoordinates)
    );
  }

  render() {
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyB3NaWrODZ83svVrKyDxwB_tiW8f7y7xBg" }}
          defaultCenter={{
            lat: this.props.userCoordinates.lat,
            lng: this.props.userCoordinates.long
          }}
          defaultZoom={14}
          onClick={e => this.onMapCliked(e)}>
          {this.props.isMarkerVisible ? (
            <ApiaryCreateMarker
              lat={this.state.newApiaryCoordinates.lat}
              lng={this.state.newApiaryCoordinates.long}
              text='My Marker'
            />
          ) : null}
        </GoogleMapReact>
      </div>
    );
  }
}

ApiaryCreateMap.defaultProps = {};

export default ApiaryCreateMap;
