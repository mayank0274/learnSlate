import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import {
  AddIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MinusIcon,
} from "@chakra-ui/icons";
import { BG_COLORS } from "../utlis/formatOptions";
import { UndoIcon } from "../icons/UndoIcon";
import { RedoIcon } from "../icons/RedoIcon";
import "fabric-history";
import { clearCanvas } from "../utlis/canvas";

const ZoomInOutCanvas = () => {
  return (
    <ButtonGroup
      size={"sm"}
      variant={"outline"}
      isAttached
      bg={"#fff"}
      borderRadius={"5px"}
    >
      <IconButton icon={<MinusIcon />} />
      <Button>80%</Button>
      <IconButton icon={<AddIcon />} />
    </ButtonGroup>
  );
};

export const ColorPicker = ({
  canvas,
  setCanvasColor,
  colors,
  currentColor,
}) => {
  return (
    <ButtonGroup size={"sm"}>
      {colors.map((color) => {
        return (
          <Button
            padding={"0"}
            key={color}
            onClick={() => {
              setCanvasColor(color);
            }}
            border={currentColor == color ? "2px solid blue" : ""}
          >
            <Box
              background={color}
              width={"22px"}
              height={"22px"}
              borderRadius={"50%"}
              padding={"1px"}
              cursor={"pointer"}
              border={"1px solid #000"}
            ></Box>
          </Button>
        );
      })}

      <Divider
        orientation="vertical"
        height={"25px"}
        bg={"#d1c9c9"}
        padding={"1px"}
      />
      <Button padding={0}>
        <input
          type="color"
          className="input-color"
          value={currentColor}
          onChange={(e) => {
            setCanvasColor(e.target.value);
          }}
        />
      </Button>
    </ButtonGroup>
  );
};

const UndoRedoTool = ({ canvas }) => {
  return (
    <ButtonGroup
      size={"sm"}
      variant={"outline"}
      isAttached
      bg={"#fff"}
      borderRadius={"5px"}
    >
      <IconButton
        icon={<UndoIcon />}
        onClick={() => {
          canvas.undo();
        }}
      />

      <IconButton
        icon={<RedoIcon />}
        onClick={() => {
          canvas.redo();
        }}
      />
    </ButtonGroup>
  );
};

const PdfPageChange = ({ setPageNumber, numPages, pageNumber, canvas }) => {
  function handleMove(move) {
    setPageNumber((prev) => {
      clearCanvas(canvas);
      return prev + move;
    });
  }
  return (
    <ButtonGroup
      size={"sm"}
      variant={"outline"}
      isAttached
      bg={"#fff"}
      borderRadius={"5px"}
    >
      <IconButton
        isDisabled={pageNumber === 1}
        icon={<ChevronLeftIcon />}
        onClick={() => {
          handleMove(-1);
        }}
      />
      <Button>
        {pageNumber}/{numPages}
      </Button>
      <IconButton
        isDisabled={pageNumber === numPages}
        icon={<ChevronRightIcon />}
        onClick={() => {
          handleMove(1);
        }}
      />
    </ButtonGroup>
  );
};

export const CanvasTools = ({
  canvas,
  setCanvasColor,
  canvasColor,
  setPageNumber,
  numPages,
  pageNumber,
}) => {
  return (
    <Center bg={canvasColor} padding={"20px"} height={"60px"}>
      <Box
        zIndex={999}
        // position={"absolute"}
        // bottom={"15%"}
        // left={"40%"}
        display={"flex"}
        gap={"20px"}
        alignItems={"center"}
      >
        {/* <ZoomInOutCanvas /> */}
        <ColorPicker
          canvas={canvas}
          setCanvasColor={setCanvasColor}
          colors={BG_COLORS}
          currentColor={canvasColor}
        />
        <UndoRedoTool canvas={canvas} />
        {numPages && (
          <PdfPageChange
            setPageNumber={setPageNumber}
            numPages={numPages}
            pageNumber={pageNumber}
            canvas={canvas}
          />
        )}
      </Box>
    </Center>
  );
};
