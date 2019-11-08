import React from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import ApiariesListMarker from "./Markers/ApiariesListMarker";
import { GOOGLE_API_KEY } from "../../constants";

const ApiariesListMap = ({ apiaries }) => {
  const getMapBounds = (maps, apiaries) => {
    const bounds = new maps.LatLngBounds();

    apiaries.forEach(({ coordinates: { lat, lng } }) => {
      bounds.extend(new maps.LatLng(lat, lng));
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
      const bounds = getMapBounds(maps, apiaries);
      map.fitBounds(bounds);
      bindResizeListener(map, maps, bounds);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) =>
          handleApiLoaded(map, maps, apiaries)
        }
        defaultCenter={{ lng: 0, lat: 0 }}
        defaultZoom={13}>
        {apiaries.map(({ coordinates: { lat, lng }, name, id }) => {
          return (
            <ApiariesListMarker
              lat={lat}
              lng={lng}
              text={name}
              key={id}
              id={id}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

ApiariesListMap.propTypes = {
  apiaries: PropTypes.arrayOf(PropTypes.object)
};

export default ApiariesListMap;
