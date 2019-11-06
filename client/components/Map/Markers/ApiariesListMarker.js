import React from "react";
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

export default ApiariesListMarker;
