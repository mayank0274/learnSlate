import { fabric } from "fabric";
import jsPDF from "jspdf";

const initialCanvasConfig = {
  selection: false,
  preserveObjectStacking: true,
  backgroundColor: "#F2F2F2",
};

export const initCanvas = (ref, width, height) => {
  const canvas = new fabric.Canvas(ref, {
    width: width,
    height: height,
    ...initialCanvasConfig,
  });

  return canvas;
};

export const handleImageUpload = (e, setImageData) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  if (!file) {
    alert("file required");
    return;
  }

  reader.onload = function () {
    setImageData(reader.result);
  };

  reader.readAsDataURL(file);
};

export const addImageToCanvas = (canvas, imageData, setShapeType) => {
  if (imageData && canvas) {
    fabric.Image.fromURL(imageData, (img) => {
      img.set({ top: 50, left: 400 });
      img.scale(0.5);
      canvas.add(img);
      canvas.renderAll.bind(canvas);
      setShapeType("select");
    });
  }
};

export const clearCanvas = (canvas) => {
  canvas.clear();
  canvas.set({ ...initialCanvasConfig });
};

export const saveCanvasSvg = (canvas) => {
  const img = canvas.toDataURL();
  const link = document.createElement("a");
  link.download = "canvas.png";
  link.href = img;
  link.click();
  link.remove();

  // remove state from locastorage after export
  localStorage.removeItem("learnslate-canvas");
};

export const exportCanvasToPdf = (canvas) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  const data = canvas.toDataURL();

  doc.addImage(data, "PNG", 0, 0, canvas.width, canvas.height);

  doc.save("canvas.pdf");

  // remove state from locastorage after export
  localStorage.removeItem("learnslate-canvas");
};

export const handleResize = ({ canvas }) => {
  const canvasElement = document.querySelector(".canvas-container");
  if (!canvasElement) return;

  if (!canvas) return;

  canvas.setWidth(canvasElement.clientWidth);
  canvas.setHeight(canvasElement.clientHeight);
  canvas.calcOffset();
};
