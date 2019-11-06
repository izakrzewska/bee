import React from "react";

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

export default ApiaryCreateMarker;
