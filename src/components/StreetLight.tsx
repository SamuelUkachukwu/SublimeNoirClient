import React, { useEffect, useRef } from "react";

const StreetLight = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const displayLight = () => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    function getRandomYellowToOrange() {
      // Generate random values for red, green, blue in the range of yellow light
      const red = getRandomInt(255, 255);
      const green = getRandomInt(200, 255);
      const blue = getRandomInt(0, 50);
      return `rgb(${red}, ${green}, ${blue})`;
    }

    let numLight = 50;
    if (window.innerWidth < 750) {
      numLight = 20;
    } else if (window.innerWidth < 1024) {
      numLight = 35;
    }

    for (let i = 0; i < numLight; i++) {
      const light = document.createElement("div");
      light.classList.add("light");
      const size = getRandomInt(10, 70);
      light.style.width = `${size}px`;
      light.style.height = `${size}px`;
      light.style.backgroundColor = getRandomYellowToOrange();
      light.style.left = `${getRandomInt(0, 100)}%`;
      light.style.top = `${getRandomInt(30, 60)}vh`;
      light.style.animationDelay = `-${getRandomInt(0, 4)}s`;

      if (i < 8) {
        light.classList.add("moveHorizontal");
      }
      container.appendChild(light);
    }
  };

  useEffect(() => {
    displayLight();

    const handleResize = () => displayLight();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-hidden absolute inset-0 -z-10"
    ></div>
  );
};

export default StreetLight;
