import React from "react";
import PropTypes from "prop-types";
import PlaceIcon from "@material-ui/icons/Place";
import useApiaryMapMarkerStyle from "./ApiaryMarker.style";

const ApiaryCreateMarker = () => {
  const classes = useApiaryMapMarkerStyle();
  return <PlaceIcon fontSize="large" className={classes.apiaryMarker} />;
};

ApiaryCreateMarker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
};

export default ApiaryCreateMarker;
