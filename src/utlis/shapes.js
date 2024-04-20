import { fabric } from "fabric";

const createRectangle = ({ top, left, width, height }) => {
  return new fabric.Rect({
    top,
    left,
    width: width || 100,
    height: height || 100,
    fill: "#F2F2F2",
    stroke: "#000000",
    strokeWidth: 2,
    strokeUniform: true,
  });
};

const createTriangle = ({ top, left, width, height }) => {
  return new fabric.Triangle({
    top,
    left,
    width: width || 100,
    height: height || 100,
    fill: "#F2F2F2",
    stroke: "#000000",
    strokeWidth: 2,
    strokeUniform: true,
  });
};

const createCircle = ({ top, left, width, height }) => {
  return new fabric.Circle({
    top,
    left,
    radius: 100,
    fill: "#F2F2F2",
    stroke: "#000000",
    strokeWidth: 2,
    strokeUniform: true,
  });
};

const createLine = ({ top, left, width, height }) => {
  return new fabric.Line([left, top, left + 100, top + 100], {
    stroke: "#000000",
    strokeWidth: 2,
    strokeUniform: true,
  });
};

const createText = ({ top, left, width, height }) => {
  return new fabric.IText("Tap to type", {
    left,
    top,
    fill: "#000000",
    fontFamily: "Helvetica",
    fontSize: 20,
    fontWeight: "200",
  });
};

export const drawShape = ({ shapeType, top, left, width, height }) => {
  switch (shapeType) {
    case "rectangle":
      return createRectangle({ top, left, width, height });

    case "triangle":
      return createTriangle({ top, left, width, height });

    case "circle":
      return createCircle({ top, left, width, height });
    case "line":
      return createLine({ top, left, width, height });
    case "text":
      return createText({ top, left, width, height });
  }
};
