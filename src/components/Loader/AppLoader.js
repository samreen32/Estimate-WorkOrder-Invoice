import React from "react";
import Lottie from "lottie-react";

const AppLoader = () => {
  return (
    <div className="app-loader-animation">
      <Lottie
        animationData={require("../../assets/img/progress.json")}
        loop
        autoplay
        className="app-loader"
      /> 
    </div>
  );
};

export default AppLoader;
