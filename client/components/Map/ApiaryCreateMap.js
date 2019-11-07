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
  const [apiaryCoordinates, setApiaryCoordinates] = useState({
    lng: 0,
    lat: 0
  });

  const onMapCliked = async e => {
    await setApiaryCoordinates({ lng: e.lng, lat: e.lat });
    setNewApiaryCoordinates(apiaryCoordinates);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
        defaultCenter={{ lat, lng }}
        defaultZoom={14}
        onClick={e => onMapCliked(e)}>
        {isMarkerVisible ? (
          <ApiaryCreateMarker
            lat={apiaryCoordinates.lat}
            lng={apiaryCoordinates.lng}
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
