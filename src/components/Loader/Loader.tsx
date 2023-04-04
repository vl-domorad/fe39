import React from "react";
import Lottie from "lottie-react";

import loader from "src/assets/loader.json";

const Loader = () => {
  return (
    <Lottie
      style={{ width: 200, height: 200 }}
      animationData={loader}
      loop={true}
    />
  );
};

export default Loader;
