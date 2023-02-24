import React, { useState } from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor as WysiwygEditor } from 'react-draft-wysiwyg';

const MyEditor = ({ content, setContent }) => {
  const [editorState, setEditorState] = useState(
    content ? EditorState.createWithContent(convertFromRaw(JSON.parse(content))) : EditorState.createEmpty()
  );

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    setContent(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
  };

  return <WysiwygEditor editorState={editorState} onEditorStateChange={handleEditorChange} />;
};

export default MyEditor;
