import React from "react";
import PropTypes from "prop-types";

const ApiaryCreateMarker = ({ text }) => (
  <div
    style={{
      height: "5px",
      width: "5px",
      borderRadius: "50%",
      backgroundColor: "black"
    }}>
    {text}
  </div>
);

ApiaryCreateMarker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
};

export default ApiaryCreateMarker;
