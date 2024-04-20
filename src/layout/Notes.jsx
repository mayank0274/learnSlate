import React, { useEffect } from "react";
import "draft-js/dist/Draft.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useAutosave } from "react-autosave";
import { convertFromRaw, EditorState, convertToRaw } from "draft-js";

export function Notes({ editorState, setEditorState, autoSave }) {
  // if value stored in localstorage initialize with that

  useEffect(() => {
    const value = localStorage.getItem("learnslate-editor");

    if (value) {
      const state = EditorState.createWithContent(
        convertFromRaw(JSON.parse(value))
      );
      setEditorState(state);
    }
  }, []);

  const onEditorStateChange = (state) => {
    setEditorState(state);
  };

  // auto save
  function updateEditorValue(data) {
    if (data && autoSave) {
      const value = convertToRaw(data);
      localStorage.setItem("learnslate-editor", JSON.stringify(value));
    }
  }

  useAutosave({
    data: editorState.getCurrentContent(),
    onSave: updateEditorValue,
  });

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      editorStyle={{ height: "500px" }}
    />
  );
}
