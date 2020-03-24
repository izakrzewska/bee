import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import PlaceIcon from "@material-ui/icons/Place";
import useApiaryMapMarkerStyle from "./ApiaryMarker.style";

const ApiariesListMarker = ({ id }) => {
  const classes = useApiaryMapMarkerStyle();

  return (
    <Link to={`/apiaries/${id}`}>
      <PlaceIcon fontSize="large" className={classes.apiaryMarker} />
    </Link>
  );
};

ApiariesListMarker.propTypes = {
  id: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
};

export default ApiariesListMarker;
