import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export const PDFViewer = ({
  fileRef,
  setImageData,
  setFile,
  file,
  pageNumber,
  setPageNumber,
  numPages,
  setNumPages,
}) => {
  const [loading, setLoading] = useState(false);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function handleFileChange(e) {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onload = function () {
      setFile(reader.result);
      setLoading(false);
    };

    reader.readAsDataURL(file);
  }

  function onRenderSuccess() {
    const importPDFCanvas = document.querySelector(".react-pdf__Page__canvas");
    const pdfAsImageSrc = importPDFCanvas.toDataURL();

    setImageData(pdfAsImageSrc);
  }

  return (
    <Box display={"flex"} flexDir={"column"} gap={"15px"}>
      <Text fontSize={"25px"} fontWeight={"semibold"}>
        PDF Viewer
      </Text>
      <Box>
        <Input
          type="file"
          display={"none"}
          ref={fileRef}
          onChange={(e) => {
            handleFileChange(e);
          }}
        />
        <Button
          onClick={() => {
            if (fileRef.current) {
              fileRef.current.click();
            }
          }}
        >
          Click Here To Open PDF
        </Button>
      </Box>

      {loading && <Text>Loading file...</Text>}

      {!file && !loading && (
        <Text fontWeight={"semibold"}>No file to display</Text>
      )}

      {file && !loading && (
        <Box border={"2px solid #000"} borderRadius={"10px"} padding={"20px"}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            maxH={"max-content"}
          >
            <Text>
              Page {pageNumber} of {numPages}
            </Text>

            <Box minH={"400px"}>
              <ButtonGroup isAttached>
                <IconButton
                  icon={<ChevronLeftIcon boxSize={6} />}
                  isDisabled={pageNumber === 1}
                  onClick={() => {
                    handleMove(-1);
                  }}
                />
                <IconButton
                  icon={<ChevronRightIcon boxSize={6} />}
                  isDisabled={pageNumber === numPages}
                  onClick={() => {
                    handleMove(1);
                  }}
                />
              </ButtonGroup>
            </Box>
          </Box>

          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              onRenderSuccess={onRenderSuccess}
            />
          </Document>
        </Box>
      )}
    </Box>
  );
};
