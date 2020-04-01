import React, { useState } from 'react';
import {
  func, bool, shape, number,
} from 'prop-types';
import GoogleMapReact from 'google-map-react';
import ApiaryCreateMarker from './Markers/ApiaryCreateMarker';
import constants from '../../constants';


const ApiaryCreateMap = ({
  setNewApiaryCoordinates,
  userCoordinates: { lat, lng },
  isMarkerVisible,
}) => {
  const [markerCoordinates, setMarkerCoordinates] = useState({
    lat: 0,
    lng: 0,
  });

  const onMapCliked = (event) => {
    const coordinates = {
      lat: event.lat,
      lng: event.lng,
    };
    setMarkerCoordinates(coordinates);
    setNewApiaryCoordinates(coordinates);
  };

  const mapOptions = {
    fullscreenControl: false,
    disableDefaultUI: true,
    keyboardShortcuts: false,
    panControl: false,
    zoomControl: false,
    gestureHandling: 'greedy',
  };

  return (
    <div style={{ height: '100%', width: '100%', marginTop: '15px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: constants.GOOGLE_API_KEY }}
        center={{ lat, lng }}
        defaultZoom={14}
        options={mapOptions}
        onClick={(e) => onMapCliked(e)}
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
  setNewApiaryCoordinates: func.isRequired,
  isMarkerVisible: bool.isRequired,
  userCoordinates: shape({
    lat: number.isRequired,
    lng: number.isRequired,
  }).isRequired,
};

export default ApiaryCreateMap;
