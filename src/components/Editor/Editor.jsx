import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import "./Editor.css";

function Editor(props) {
  const { language, theme, code, setCode } = props;

  return (
    <div>
      <CodeMirror
        value={code}
        height="350px"
        extensions={[language]}
        onChange={setCode}
        theme={theme}
      />
    </div>
  );
}

export default Editor;
