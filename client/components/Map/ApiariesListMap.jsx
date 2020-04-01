import React from 'react';
import { arrayOf } from 'prop-types';
import GoogleMapReact from 'google-map-react';
import ApiariesListMarker from './Markers/ApiariesListMarker';
import constants from '../../constants';
import useApiariesListMapStyles from './ApiariesListMap.style';


import { apiaryType } from '../../types/types';

const ApiariesListMap = ({ apiaries }) => {
  const getMapBounds = (maps, availableApiaries) => {
    const bounds = new maps.LatLngBounds();

    availableApiaries.forEach(({ coordinates: { lat, lng } }) => {
      bounds.extend(new maps.LatLng(lat, lng));
    });
    return bounds;
  };

  const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, 'idle', () => {
      /* global window */
      maps.event.addDomListener(window, 'resize', () => {
        map.fitBounds(bounds);
      });
    });
  };

  const handleApiLoaded = (map, maps, availableApiaries) => {
    if (map) {
      const bounds = getMapBounds(maps, availableApiaries);
      map.fitBounds(bounds);
      bindResizeListener(map, maps, bounds);
    }
  };

  const mapOptions = {
    fullscreenControl: false,
    disableDefaultUI: true,
    keyboardShortcuts: false,
    panControl: false,
    zoomControl: false,
    gestureHandling: 'greedy',
  };

  const classes = useApiariesListMapStyles();
  const { mapContainer } = classes;

  return (
    <div className={mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: constants.GOOGLE_API_KEY }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, apiaries)}
        defaultCenter={{ lng: 0, lat: 0 }}
        defaultZoom={13}
        options={mapOptions}
      >
        {apiaries.map(({ coordinates: { lat, lng }, id }) => (
          <ApiariesListMarker lat={lat} lng={lng} key={id} id={id} />
        ))}
      </GoogleMapReact>
    </div>
  );
};

ApiariesListMap.propTypes = {
  apiaries: arrayOf(apiaryType).isRequired,
};

export default ApiariesListMap;
