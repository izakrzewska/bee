import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Link } from "react-router";

const Marker = ({ text, id }) => (
  <Link to={`/apiaries/${id}`}>
    <div
      style={{
        height: "25px",
        width: "25px",
        borderRadius: "50%",
        backgroundColor: "red"
      }}>
      {text}
    </div>
  </Link>
);

class ApiariesListMap extends Component {
  render() {
    const getMapBounds = (map, maps, apiaries) => {
      const bounds = new maps.LatLngBounds();

      apiaries.forEach(apiary => {
        bounds.extend(
          new maps.LatLng(apiary.coordinates.lat, apiary.coordinates.long)
        );
      });
      return bounds;
    };

    const bindResizeListener = (map, maps, bounds) => {
      maps.event.addDomListenerOnce(map, "idle", () => {
        maps.event.addDomListener(window, "resize", () => {
          map.fitBounds(bounds);
        });
      });
    };

    const handleApiLoaded = (map, maps, apiaries) => {
      if (map) {
        const bounds = getMapBounds(map, maps, apiaries);
        map.fitBounds(bounds);
        bindResizeListener(map, maps, bounds);
      }
    };

    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyB3NaWrODZ83svVrKyDxwB_tiW8f7y7xBg" }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) =>
            handleApiLoaded(map, maps, this.props.apiaries)
          }
          center={{ lng: 0, lat: 0 }}
          defaultZoom={13}>
          {this.props.apiaries.map(apiary => {
            return (
              <Marker
                lat={apiary.coordinates.lat}
                lng={apiary.coordinates.long}
                text={apiary.name}
                key={apiary.id}
                id={apiary.id}
              />
            );
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default ApiariesListMap;
