import React from "react";
import Editor from "../Editor/Editor";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import "./DevCodeEditor.css";
import CodeIcon from "@mui/icons-material/Code";
import CodeOutput from "../CodeOutput/CodeOutput";

function DevCodeEditor(props) {
  const {
    editorTheme,
    htmlCode,
    setHtmlCode,
    cssCode,
    setCssCode,
    jsCode,
    setJsCode,
  } = props;

  return (
    <div className="dev-code-container">
      <div className="code-editor-container">
        <div className="html-editor">
          <div className="code-header">
            <p>
              <CodeIcon className="html-code-icon" />
              HTML
            </p>
          </div>
          <Editor
            language={[html()]}
            theme={editorTheme}
            code={htmlCode}
            setCode={setHtmlCode}
            width="100%"
            height="100%"
          />
        </div>
        <div className="css-editor">
          <div className="code-header">
            <p>
              <span className="css-code-icon">{"#"}</span>CSS
            </p>
          </div>
          <Editor
            language={[css()]}
            theme={editorTheme}
            code={cssCode}
            setCode={setCssCode}
            width="100%"
            height="100%"
          />
        </div>
        <div className="js-editor">
          <div className="code-header">
            <p>
              <span className="js-code-icon">{"{ }"}</span>JS
            </p>
          </div>
          <Editor
            language={[javascript()]}
            theme={editorTheme}
            code={jsCode}
            setCode={setJsCode}
            width="100%"
            height="100%"
          />
        </div>
      </div>
      <CodeOutput htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} />
    </div>
  );
}

export default DevCodeEditor;
