import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import { shapeElements } from "../constants/constants";
import { drawShape } from "../utlis/shapes";
import { addImageToCanvas, clearCanvas, handleResize } from "../utlis/canvas";
import { handleImageUpload } from "../utlis/canvas";
import { useAutosave } from "react-autosave";

export default function Leftsidebar({
  shapeType,
  setShapeType,
  setImageData,
  canvas,
  imageData,
  setShowShapesOptions,
  brushOptions,
  fileRef,
  autoSave,
  setCanvasColor,
}) {
  const selectShape = async (shape) => {
    await setShapeType(() => {
      return shape;
    });
  };

  const imageRef = useRef(null);

  const startDrawing = () => {
    if (shapeType == "delete" && canvas.getActiveObjects()) {
      canvas.remove(...canvas.getActiveObjects());
      return;
    }

    let isDrawing = false;
    let isSelected = false;
    let top = 0,
      left = 0;
    let shape;
    const drawableShapes = ["rectangle", "circle", "triangle", "text", "line"];

    canvas.on("mouse:down", ({ e }) => {
      isDrawing = true;
      isSelected = false;
      const pointer = canvas.getPointer(e);
      top = pointer.y;
      left = pointer.x;

      if (
        isDrawing &&
        !isSelected &&
        shapeType &&
        drawableShapes.includes(shapeType)
      ) {
        let options = { shapeType: shapeType, top, left, width: 0, height: 0 };
        shape = drawShape(options);
        canvas.add(shape);
        shape.selectable = false;
      }
    });

    canvas.on("mouse:move", ({ e }) => {
      if (
        isDrawing &&
        !isSelected &&
        shapeType &&
        drawableShapes.includes(shapeType)
      ) {
        canvas.isDrawingMode = false;
        const pointer = canvas.getPointer(e);

        if (
          shapeType === "rectangle" ||
          shapeType === "triangle" ||
          shapeType === "text"
        ) {
          shape.width = pointer.x - left;
          shape.height = pointer.y - top;
        } else if (shapeType === "line") {
          // console.log("line");
          // shape.x2 = pointer.x;
          shape.y2 = pointer.y;
        } else if (shapeType === "circle") {
          shape.radius = pointer.x;
        }

        shape.setCoords();
        canvas.discardActiveObject().requestRenderAll();
      }
      if (shapeType == "freeform") {
        isDrawing = true;
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.width = brushOptions.size;
        canvas.freeDrawingBrush.color = brushOptions.color;
        return;
      } else {
        canvas.isDrawingMode = false;
      }

      if (shapeType == "select") {
        isDrawing = false;
        canvas.selection = true;
        canvas.hoverCursor = "all-scroll";
        canvas.forEachObject(function (o) {
          o.selectable = true;
        });
        return;
      } else {
        canvas.selection = false;
        canvas.hoverCursor = "default";
        canvas.forEachObject(function (o) {
          o.selectable = false;
        });
      }

      canvas.on("object:moving", () => {
        isDrawing = false;
        isSelected = true;
      });

      canvas.on("object:modified", () => {
        isDrawing = false;
        isSelected = true;
      });
    });

    canvas.on("mouse:up", ({ e }) => {
      if (
        isDrawing &&
        !isSelected &&
        shapeType &&
        drawableShapes.includes(shapeType) &&
        shape
      ) {
        canvas.renderAll.bind(canvas);
        setShapeType("select");
        isDrawing = false;
        top = 0;
        left = 0;
        canvas.off("mouse:down");
        canvas.off("mouse:move");
        canvas.off("mouse:up");
      }
    });

    canvas.on("selection:created", ({ e }) => {
      setShowShapesOptions(true);
    });

    canvas.on("selection:updated", ({ e }) => {
      setShowShapesOptions(true);
    });

    canvas.on("selection:cleared", () => {
      setShowShapesOptions((prev) => {
        if (prev) {
          return !prev;
        }
      });
    });

    canvas.on("mouse:wheel", ({ e }) => {
      const delta = e.deltaY;
      let zoom = canvas.getZoom();

      const minZoom = 0.2;
      const maxZoom = 1;
      const zoomStep = 0.001;

      zoom = Math.min(Math.max(minZoom, zoom * zoomStep + delta), maxZoom);

      canvas.zoomToPoint({ x: e.offsetX, y: e.offsetY }, zoom);

      e.preventDefault();
      e.stopPropagation();
    });
  };

  // add image to canvas
  useEffect(() => {
    addImageToCanvas(canvas, imageData, setShapeType);
  }, [imageData]);

  useEffect(() => {
    if (canvas && shapeType) {
      if (shapeType == "reset") {
        setCanvasColor("#F2F2F2");
        clearCanvas(canvas);
        setShapeType("select");
        return;
      }
      startDrawing();
    }
  }, [shapeType, brushOptions]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (canvas) {
        handleResize({
          canvas,
        });
      }
    });

    // remove the event listeners
    window.removeEventListener("resize", () => {
      handleResize({
        canvas: null,
      });
    });
  }, [canvas]);

  function storeCanvas(data) {
    if (autoSave) {
      localStorage.setItem("learnslate-canvas", JSON.stringify(data));
    }
  }

  useAutosave({
    data: canvas && canvas.toJSON(),
    onSave: storeCanvas,
  });

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      p={"7px"}
      gap={"15px"}
      height={"max-content"}
      position={"fixed"}
      left={"1%"}
      top={"15%"}
      zIndex={999}
      background={"#fff"}
      borderRadius={"5px"}
    >
      <input
        type="file"
        style={{ display: "none" }}
        ref={imageRef}
        onChange={(e) => {
          handleImageUpload(e, setImageData);
        }}
      />
      {shapeElements.map((shape) => (
        <img
          key={shape.value}
          src={shape.icon}
          alt={shape.value}
          width={32}
          height={32}
          style={{ cursor: "pointer" }}
          title={shape.name}
          onClick={() => {
            selectShape(shape.value);
            setShowShapesOptions(false);
            if (shape.value === "image" && imageRef.current) {
              imageRef.current.click();
            }

            if (shape.value === "pdf" && fileRef.current) {
              fileRef.current.click();
            }
          }}
          className={shapeType == shape.value ? "tool tool-active" : "tool"}
        />
      ))}
    </Box>
  );
}
