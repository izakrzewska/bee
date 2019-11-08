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

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
        center={{ lat, lng }}
        defaultZoom={14}
        onClick={e => onMapCliked(e)}>
        {isMarkerVisible ? (
          <ApiaryCreateMarker
            lat={markerCoordinates.lat}
            lng={markerCoordinates.lng}
            text='My Marker'
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
