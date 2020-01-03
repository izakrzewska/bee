import React from "react";
import PropTypes from "prop-types";
import PlaceIcon from "@material-ui/icons/Place";
import useApiaryCreateMarkerStyles from "./ApiaryCreateMarker.style";

const ApiaryCreateMarker = () => {
  const classes = useApiaryCreateMarkerStyles();
  const { apiaryMarker } = classes;
  return <PlaceIcon fontSize="large" className={apiaryMarker} />;
};

ApiaryCreateMarker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
};

export default ApiaryCreateMarker;
