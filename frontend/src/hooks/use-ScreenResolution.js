import { useState, useEffect } from "react";

function getScreenDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const useScreenDimension = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getScreenDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getScreenDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export default useScreenDimension;
