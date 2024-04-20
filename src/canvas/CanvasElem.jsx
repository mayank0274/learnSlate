import React, { useEffect, useRef } from "react";
import { initCanvas } from "../utlis/canvas";
import { Box } from "@chakra-ui/react";

export const CanvasElem = ({ setCanvas }) => {
  const canvasElemRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const canvas = initCanvas(
        canvasElemRef.current,
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );

      const canvasData = window.localStorage.getItem("learnslate-canvas");

      if (canvasData) {
        canvas.loadFromJSON(JSON.parse(canvasData));
      }

      setCanvas(() => {
        return canvas;
      });

      return () => {
        canvas.dispose();
      };
    }
  }, [canvasElemRef, containerRef]);

  return (
    <div ref={containerRef} className="canvas-container">
      <canvas ref={canvasElemRef} />;
    </div>
  );
};
