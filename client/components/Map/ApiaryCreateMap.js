import React, { useState } from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import ApiaryCreateMarker from "./Markers/ApiaryCreateMarker";
import { GOOGLE_API_KEY } from "../../constants";

const ApiaryCreateMap = ({
  setNewApiaryCoordinates,
  userCoordinates: { lat, lng },
  isMarkerVisible
}) => {
  const [markerCoordinates, setMarkerCoordinates] = useState({
    lat: 0,
    lng: 0
  });

  const onMapCliked = ({ lat, lng }) => {
    setMarkerCoordinates({ lat, lng });
    setNewApiaryCoordinates({ lat, lng });
  };

  const mapOptions = {
    fullscreenControl: false,
    disableDefaultUI: true,
    keyboardShortcuts: false,
    panControl: false,
    zoomControl: false,
    gestureHandling: "greedy"
  };

  return (
    <div style={{ height: "100%", width: "100%", marginTop: "15px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
        center={{ lat, lng }}
        defaultZoom={14}
        options={mapOptions}
        onClick={e => onMapCliked(e)}
      >
        {isMarkerVisible ? (
          <ApiaryCreateMarker
            lat={markerCoordinates.lat}
            lng={markerCoordinates.lng}
            text="My Marker"
          />
        ) : null}
      </GoogleMapReact>
    </div>
  );
};

ApiaryCreateMap.propTypes = {
  setNewApiaryCoordinates: PropTypes.func.isRequired,
  isMarkerVisible: PropTypes.bool.isRequired,
  userCoordinates: PropTypes.object.isRequired
};

export default ApiaryCreateMap;
