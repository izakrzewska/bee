import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import PlaceIcon from "@material-ui/icons/Place";
import useApiariesListMarkerStyle from "./ApiariesListMarker.style";

const ApiariesListMarker = ({ id }) => {
  const classes = useApiariesListMarkerStyle();
  const { apiaryMarker } = classes;
  return (
    <Link to={`/apiaries/${id}`}>
      <PlaceIcon fontSize='large' className={apiaryMarker} />
    </Link>
  );
};

ApiariesListMarker.propTypes = {
  id: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
};

export default ApiariesListMarker;
