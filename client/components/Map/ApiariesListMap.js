import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const Marker = ({ text }) => (
  <div
    style={{
      height: "25px",
      width: "25px",
      borderRadius: "50%",
      backgroundColor: "red"
    }}
  >
    {text}
  </div>
);

class ApiariesListMap extends Component {
  render() {
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyB3NaWrODZ83svVrKyDxwB_tiW8f7y7xBg" }}
          // defaultCenter={defaultProps.center}
          center={{ lng: 21, lat: 52 }}
          defaultZoom={13}
          // onClick={(e) => this.onMapCliked(e)}
        >
          {this.props.apiaries.map(apiary => {
            return (
              <Marker
                lat={apiary.coordinates.lat}
                lng={apiary.coordinates.long}
                text={apiary.name}
              />
            );
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default ApiariesListMap;
