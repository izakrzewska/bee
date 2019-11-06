import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

const ApiariesListMarker = ({ text, id }) => (
  <Link to={`/apiaries/${id}`}>
    <div
      style={{
        height: "25px",
        width: "25px",
        borderRadius: "50%",
        backgroundColor: "red"
      }}>
      {text}
    </div>
  </Link>
);

ApiariesListMarker.propTypes = {
  id: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
};

export default ApiariesListMarker;
