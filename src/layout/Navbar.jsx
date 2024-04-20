import {
  Box,
  Flex,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  ButtonGroup,
  Button,
  Text,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import React, { useEffect } from "react";
import { exportCanvasToPdf, saveCanvasSvg } from "../utlis/canvas";
import { exportCombinePdf, exportNotesToPdf } from "../utlis/editor";
import { Switch } from "@chakra-ui/react";

const NavLink = ({ props }) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Nav({
  bgColor,
  setViewModeIndex,
  viewModeIndex,
  canvas,
  editorState,
  setAutoSave,
  autoSave,
}) {
  function handleAutoSave(e) {
    setAutoSave(e.target.checked);
    window.localStorage.setItem(
      "learnslate-autosave",
      e.target.checked.toString()
    );
    if (!e.target.checked) {
      localStorage.removeItem("learnslate-canvas");
      localStorage.removeItem("learnslate-editor");
    }
  }

  return (
    <Box backgroundColor={"#204969"}>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={"20px"}
        px={10}
        height={"60px"}
      >
        <Text
          fontSize={"20px"}
          color={"#FFF7F7"}
          fontWeight={"semibold"}
          fontStyle={"italic"}
        >
          learnSlate.io
        </Text>

        <Tabs
          variant="unstyled"
          bg={"#DADADA"}
          color={"#000  "}
          borderRadius={"10px"}
        >
          <TabList>
            <Tab
              _selected={{ color: "#fff", bg: "#5D13E7" }}
              borderRadius={"10px"}
              fontWeight={"semibold"}
              onClick={() => {
                setViewModeIndex(0);
              }}
            >
              Canvas
            </Tab>
            <Tab
              _selected={{ color: "#fff", bg: "#5D13E7" }}
              borderRadius={"10px"}
              fontWeight={"semibold"}
              onClick={() => {
                setViewModeIndex(1);
              }}
            >
              Notes
            </Tab>
          </TabList>
        </Tabs>

        <Box display={"flex"} alignItems={"center"} gap={"10px"}>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="auto-save" mb="0" color={"#fff"}>
              Auto save content ?
            </FormLabel>
            <Switch
              id="autosave"
              isChecked={autoSave}
              onChange={(e) => {
                handleAutoSave(e);
              }}
            />
          </FormControl>
          <Box display={viewModeIndex == 0 ? "block" : "none"}>
            <ButtonGroup>
              <Button
                bg={"#08FFC8"}
                onClick={() => {
                  if (canvas) {
                    saveCanvasSvg(canvas);
                  }
                }}
              >
                Export as Image
              </Button>
              <Button
                bg={"#08FFC8"}
                onClick={() => {
                  if (canvas) {
                    exportCanvasToPdf(canvas);
                  }
                }}
              >
                Export as Pdf
              </Button>
            </ButtonGroup>
          </Box>

          <Box display={viewModeIndex == 1 ? "block" : "none"}>
            <ButtonGroup>
              <Button
                bg={"#08FFC8"}
                onClick={() => {
                  if (editorState) {
                    exportNotesToPdf(
                      editorState.getCurrentContent().getPlainText()
                    );
                  }
                }}
              >
                Export as Pdf
              </Button>

              <Button
                bg={"#08FFC8"}
                onClick={() => {
                  if (editorState && canvas) {
                    exportCombinePdf(
                      editorState.getCurrentContent().getPlainText(),
                      canvas
                    );
                  }
                }}
              >
                Export Combine Pdf
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
