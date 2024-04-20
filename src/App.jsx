import React, { useRef, useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Nav from "./layout/Navbar";
import Leftsidebar from "./layout/Leftsidebar";
import { CanvasElem } from "./canvas/CanvasElem";
import { CanvasTools } from "./layout/CanvasTools";
import { FormattingOptions } from "./layout/FormattingOptions";
import { Notes } from "./layout/Notes";
import { EditorState } from "draft-js";
import { PDFViewer } from "./pdfViewer/PDFViewer";

export const App = () => {
  const [shapeType, setShapeType] = useState("");
  const [imageData, setImageData] = useState("");
  const [viewModeIndex, setViewModeIndex] = useState(0);
  const [canvas, setCanvas] = useState(null);
  const [canvasColor, setCanvasColor] = useState("#F2F2F2");
  const [showShapesOptions, setShowShapesOptions] = useState(false);
  const [shapeFormatOptions, setShapeFormatOptions] = useState({
    fill: "#F2F2F2",
    stroke: "#000000",
    strokeWidth: 2,
    strokeStyle: [0, 0],
  });
  const [textOptions, setTextOptions] = useState({
    fill: "#000000",
    fontFamily: "Helvetica",
    fontSize: 20,
    fontWeight: "200",
  });
  const [brushOptions, setBrushOptions] = useState({
    color: "#000000",
    size: 5,
  });
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const fileRef = useRef(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState();
  const [autosave, setAutoSave] = useState(false);

  useEffect(() => {
    if (canvas) {
      canvas.backgroundColor = canvasColor;
      canvas.renderAll();
    }
  }, [canvasColor]);

  useEffect(() => {
    const isAutoSave = window.localStorage.getItem("learnslate-autosave");

    setAutoSave(isAutoSave == "true");
  }, []);

  return (
    <Box>
      <Nav
        bgColor={canvasColor}
        setViewModeIndex={setViewModeIndex}
        viewModeIndex={viewModeIndex}
        canvas={canvas}
        editorState={editorState}
        setAutoSave={setAutoSave}
        autoSave={autosave}
      />

      <Box display={viewModeIndex == 0 ? "block" : "none"} overflow={"hidden"}>
        <Leftsidebar
          shapeType={shapeType}
          setShapeType={setShapeType}
          setImageData={setImageData}
          imageData={imageData}
          canvas={canvas}
          canvasColor={canvasColor}
          setShowShapesOptions={setShowShapesOptions}
          brushOptions={brushOptions}
          fileRef={fileRef}
          autoSave={autosave}
          setCanvasColor={setCanvasColor}
        />
        <FormattingOptions
          showShapesOptions={showShapesOptions}
          canvas={canvas}
          setShapeFormatOptions={setShapeFormatOptions}
          shapeFormatOptions={shapeFormatOptions}
          textOptions={textOptions}
          setTextOptions={setTextOptions}
          brushOptions={brushOptions}
          setBrushOptions={setBrushOptions}
          shapeType={shapeType}
        />

        <Box
          as="div"
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          overflow={"hidden"}
        >
          <CanvasElem setCanvas={setCanvas} />
          <CanvasTools
            canvas={canvas}
            setCanvasColor={setCanvasColor}
            setShapeFormatOptions={setShapeFormatOptions}
            shapeFormatOptions={shapeFormatOptions}
            canvasColor={canvasColor}
            pageNumber={pageNumber}
            numPages={numPages}
            setPageNumber={setPageNumber}
          />
        </Box>
      </Box>

      <Box
        border={"2px solid #000"}
        borderRadius={"10px"}
        padding={"20px"}
        minH={"500px"}
        width={"95%"}
        margin={"15px auto"}
        display={viewModeIndex == 1 ? "block" : "none"}
      >
        <Notes
          editorState={editorState}
          setEditorState={setEditorState}
          autoSave={autosave}
        />
      </Box>

      <Box
        width={"50%"}
        margin={"15px auto"}
        // // display={viewModeIndex == 2 ? "block" : "none"}
        transform={"translateX(-1000%)"}
      >
        <PDFViewer
          fileRef={fileRef}
          setImageData={setImageData}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          setFile={setFile}
          file={file}
          numPages={numPages}
          setNumPages={setNumPages}
        />
      </Box>
    </Box>
  );
};
