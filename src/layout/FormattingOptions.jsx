import {
  Box,
  ButtonGroup,
  Text,
  Button,
  Select,
  IconButton,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ColorPicker } from "./CanvasTools";
import {
  BG_COLORS,
  BrushSizes,
  STROKE_COLORS,
  fontFamilyOptions,
  fontSizeOptions,
  fontWeightOptions,
} from "../utlis/formatOptions";
import { MinusIcon } from "@chakra-ui/icons";
import { ExtraDashedLine } from "../icons/ExtraDashedLine";
import { DashedLine } from "../icons/DashedLine";
import { STROKE_STYLE, STROKE_WIDTH } from "../utlis/formatOptions";
import { CircleIcon } from "../icons/CircleIcon";

const ShapesOptions = ({
  canvas,
  setShapeFormatOptions,
  shapeFormatOptions,
}) => {
  const changeShapeBackground = (color) => {
    if (canvas && canvas.getActiveObject()) {
      let shape = canvas.getActiveObject();
      shape.fill = color;
      shape.statefullCache = true;
      shape.dirty = true;
      canvas.renderAll();
      setShapeFormatOptions({ ...shapeFormatOptions, fill: color });
    }
  };

  const changeShapeStroke = (color) => {
    if (canvas && canvas.getActiveObject()) {
      let shape = canvas.getActiveObject();
      shape.stroke = color;
      shape.statefullCache = true;
      shape.dirty = true;
      canvas.renderAll();
      setShapeFormatOptions({ ...shapeFormatOptions, stroke: color });
    }
  };

  const changeShapeStrokeWidth = (width) => {
    if (canvas && canvas.getActiveObject()) {
      let shape = canvas.getActiveObject();
      shape.strokeWidth = width;
      shape.statefullCache = true;
      shape.dirty = true;
      canvas.renderAll();
      setShapeFormatOptions({ ...shapeFormatOptions, strokeWidth: width });
    }
  };

  const changeShapeStrokeStyle = (dashArray) => {
    if (canvas && canvas.getActiveObject()) {
      setShapeFormatOptions({ ...shapeFormatOptions, strokeStyle: dashArray });
      let shape = canvas.getActiveObject();
      shape.strokeDashArray = dashArray;
      shape.statefullCache = true;
      shape.dirty = true;
      canvas.renderAll();
    }
  };

  return (
    <Box display={"flex"} flexDir={"column"} gap={"15px"}>
      <Box display={"flex"} flexDir={"column"} gap={"8px"}>
        <Text fontSize={"15px"}>Stroke</Text>
        <ColorPicker
          canvas={canvas}
          colors={STROKE_COLORS}
          setCanvasColor={changeShapeStroke}
          currentColor={shapeFormatOptions.stroke}
        />
      </Box>

      {/* not show bg color option if its line */}
      {canvas &&
        canvas.getActiveObject() &&
        canvas.getActiveObject().type != "line" && (
          <Box display={"flex"} flexDir={"column"} gap={"8px"}>
            <Text fontSize={"15px"}>Background</Text>
            <ColorPicker
              canvas={canvas}
              colors={BG_COLORS}
              setCanvasColor={changeShapeBackground}
              currentColor={shapeFormatOptions.fill}
            />
          </Box>
        )}

      <Box display={"flex"} flexDir={"column"} gap={"8px"}>
        <Text fontSize={"15px"}>Stroke Width</Text>
        <ButtonGroup size={"sm"}>
          {STROKE_WIDTH.map((elem) => {
            return (
              <Button
                key={elem.key}
                onClick={() => {
                  changeShapeStrokeWidth(elem.value);
                }}
                border={
                  shapeFormatOptions.strokeWidth == elem.value
                    ? "2px solid blue"
                    : ""
                }
              >
                <MinusIcon
                  boxSize={elem.value == 2 ? elem.value : elem.value - 1}
                />
              </Button>
            );
          })}
        </ButtonGroup>
      </Box>

      <Box display={"flex"} flexDir={"column"} gap={"8px"}>
        <Text fontSize={"15px"}>Stroke Type</Text>
        <ButtonGroup size={"sm"}>
          {STROKE_STYLE.map((elem) => {
            return (
              <Button
                key={elem.key}
                border={
                  shapeFormatOptions.strokeStyle.toString() ==
                  elem.value.toString()
                    ? "2px solid blue"
                    : ""
                }
                onClick={() => {
                  changeShapeStrokeStyle(elem.value);
                }}
              >
                {elem.key == "default" && <MinusIcon />}
                {elem.key == "dashed" && <DashedLine />}
                {elem.key == "extraDashed" && <ExtraDashedLine />}
              </Button>
            );
          })}
        </ButtonGroup>
      </Box>
    </Box>
  );
};

const TextFormatting = ({ canvas, setTextOptions, textOptions }) => {
  const changeTextColor = (color) => {
    if (canvas && canvas.getActiveObject()) {
      let text = canvas.getActiveObject();
      text.fill = color;
      text.statefullCache = true;
      text.dirty = true;
      canvas.renderAll();
      setTextOptions({ ...textOptions, fill: color });
    }
  };

  const changeTextFontSize = (fontSize) => {
    if (canvas && canvas.getActiveObject()) {
      let text = canvas.getActiveObject();
      text.fontSize = Number(fontSize);
      text.statefullCache = true;
      text.dirty = true;
      canvas.renderAll();
      setTextOptions({ ...textOptions, fontSize: Number(fontSize) });
    }
  };

  const changeTextFontWeight = (fontWeight) => {
    if (canvas && canvas.getActiveObject()) {
      let text = canvas.getActiveObject();
      text.fontWeight = fontWeight;
      text.statefullCache = true;
      text.dirty = true;
      canvas.renderAll();
      setTextOptions({ ...textOptions, fontWeight });
    }
  };

  const changeTextFontFamily = (fontFamily) => {
    if (canvas && canvas.getActiveObject()) {
      let text = canvas.getActiveObject();
      text.fontFamily = fontFamily;
      text.statefullCache = true;
      text.dirty = true;
      canvas.renderAll();
      setTextOptions({ ...textOptions, fontFamily });
    }
  };

  return (
    <Box display={"flex"} flexDir={"column"} gap={"15px"}>
      <Box display={"flex"} flexDir={"column"} gap={"8px"}>
        <Text fontSize={"15px"}>Color</Text>
        <ColorPicker
          canvas={canvas}
          colors={STROKE_COLORS}
          setCanvasColor={changeTextColor}
          currentColor={textOptions.fill}
        />
      </Box>

      <Box display={"flex"} flexDir={"column"} gap={"8px"}>
        <Text fontSize={"15px"}>Font Size</Text>
        <Select
          value={textOptions.fontSize}
          onChange={(e) => {
            changeTextFontSize(e.target.value);
          }}
        >
          {fontSizeOptions.map((elem) => {
            return (
              <option value={elem.value} key={elem.value}>
                {elem.label}
              </option>
            );
          })}
        </Select>
      </Box>

      <Box display={"flex"} flexDir={"column"} gap={"8px"}>
        <Text fontSize={"15px"}>Font Weight</Text>
        <Select
          value={textOptions.fontWeight}
          onChange={(e) => {
            changeTextFontWeight(e.target.value);
          }}
        >
          {fontWeightOptions.map((elem) => {
            return (
              <option value={elem.value} key={elem.value}>
                {elem.label}
              </option>
            );
          })}
        </Select>
      </Box>

      <Box display={"flex"} flexDir={"column"} gap={"8px"}>
        <Text fontSize={"15px"}>Font Family</Text>
        <Select
          value={textOptions.fontFamily}
          onChange={(e) => {
            changeTextFontFamily(e.target.value);
          }}
        >
          {fontFamilyOptions.map((elem) => {
            return (
              <option value={elem.value} key={elem.value}>
                {elem.label}
              </option>
            );
          })}
        </Select>
      </Box>
    </Box>
  );
};

const BrushOptions = ({ canvas, brushOptions, setBrushOptions }) => {
  const changeBrushColor = (color) => {
    if (
      canvas &&
      canvas.getActiveObject() &&
      canvas.getActiveObject().type === "path"
    ) {
      let path = canvas.getActiveObject();
      path.color = color;
      path.stroke = color;
      path.statefullCache = true;
      path.dirty = true;
      canvas.renderAll();
    }
    setBrushOptions({ ...brushOptions, color });
  };

  const changeBrushSize = (size) => {
    if (
      canvas &&
      canvas.getActiveObject() &&
      canvas.getActiveObject().type === "path"
    ) {
      let path = canvas.getActiveObject();
      path.strokeWidth = size;
      path.statefullCache = true;
      path.dirty = true;
      canvas.renderAll();
    }
    setBrushOptions({ ...brushOptions, size });
  };

  return (
    <Box display={"flex"} flexDir={"column"} gap={"15px"}>
      <Box display={"flex"} flexDir={"column"} gap={"8px"}>
        <Text fontSize={"15px"}>Color</Text>
        <ColorPicker
          canvas={canvas}
          colors={STROKE_COLORS}
          setCanvasColor={changeBrushColor}
          currentColor={brushOptions.color}
        />
      </Box>

      <Box display={"flex"} flexDir={"column"} gap={"8px"}>
        <Text fontSize={"15px"}>Size</Text>
        <ButtonGroup size={"sm"}>
          {BrushSizes.map((elem, i) => {
            return (
              <IconButton
                key={elem.key}
                border={elem.size === brushOptions.size ? "2px solid blue" : ""}
                icon={
                  <CircleIcon
                    height={`${elem.iconSize}px`}
                    width={`${elem.iconSize}px`}
                  />
                }
                onClick={() => {
                  changeBrushSize(elem.size);
                }}
              />
            );
          })}
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export const FormattingOptions = ({
  showShapesOptions,
  canvas,
  setShapeFormatOptions,
  shapeFormatOptions,
  textOptions,
  setTextOptions,
  brushOptions,
  setBrushOptions,
  shapeType,
}) => {
  const drawableShapes = ["rect", "circle", "triangle", "line"];

  return (
    <Box
      position={"absolute"}
      right={"2%"}
      top={"15%"}
      zIndex={999}
      background={"#fff"}
      borderRadius={"5px"}
      padding={"10px"}
      display={showShapesOptions || shapeType === "freeform" ? "block" : "none"}
    >
      {/* show format options for rect,triangle,circle,line */}
      {canvas &&
        canvas.getActiveObject() &&
        drawableShapes.includes(canvas.getActiveObject().type) && (
          <ShapesOptions
            canvas={canvas}
            shapeFormatOptions={shapeFormatOptions}
            setShapeFormatOptions={setShapeFormatOptions}
          />
        )}

      {/* show format options for text */}
      {canvas &&
        canvas.getActiveObject() &&
        canvas.getActiveObject().type === "i-text" && (
          <TextFormatting
            canvas={canvas}
            textOptions={textOptions}
            setTextOptions={setTextOptions}
          />
        )}

      {/* show format options for brush */}
      {shapeType === "freeform" && (
        <BrushOptions
          canvas={canvas}
          brushOptions={brushOptions}
          setBrushOptions={setBrushOptions}
        />
      )}

      {canvas &&
        canvas.getActiveObject() &&
        canvas.getActiveObject().type === "path" && (
          <BrushOptions
            canvas={canvas}
            brushOptions={brushOptions}
            setBrushOptions={setBrushOptions}
          />
        )}
    </Box>
  );
};
