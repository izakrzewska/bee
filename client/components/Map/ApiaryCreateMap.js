import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import ApiaryCreateMarker from "./Markers/ApiaryCreateMarker";
import { GOOGLE_API_KEY } from "../../constants";

class ApiaryCreateMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newApiaryCoordinates: {
        lng: 0,
        lat: 0
      }
    };
  }

  onMapCliked(e) {
    this.setState(
      {
        newApiaryCoordinates: {
          lng: e.lng,
          lat: e.lat
        }
      },
      () => this.props.setNewApiaryCoordinates(this.state.newApiaryCoordinates)
    );
  }

  render() {
    const {
      userCoordinates: { lat, lng },
      isMarkerVisible
    } = this.props;

    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
          defaultCenter={{ lat, lng }}
          defaultZoom={14}
          onClick={e => this.onMapCliked(e)}>
          {isMarkerVisible ? (
            <ApiaryCreateMarker
              lat={this.state.newApiaryCoordinates.lat}
              lng={this.state.newApiaryCoordinates.lng}
              text='My Marker'
            />
          ) : null}
        </GoogleMapReact>
      </div>
    );
  }
}

export default ApiaryCreateMap;
