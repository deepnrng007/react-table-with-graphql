import React from "react";

const Loader = () => {
  return (
    <img
      src={require("../../assets/spinner.gif")}
      alt="Loader"
      className="object-cover"
    />
  );
};

export default Loader;
