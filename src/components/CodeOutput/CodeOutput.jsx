import React, { useEffect, useState } from "react";
import "./CodeOutput.css";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

function CodeOutput(props) {
  const { htmlCode, cssCode, jsCode } = props;

  const [outputDoc, setOutputDoc] = useState(`
  <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DevCode Output</title>
    </head>
    <body>
    </body>
</html>
  `);

  useEffect(() => {
    const timer = setTimeout(() => {
      const codeDoc = `
        <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>DevCode Output</title>
              <style>${cssCode}</style>
          </head>
          <body>
            ${htmlCode}
          </body>
          <script>${jsCode}</script>
      </html>
        `;
      setOutputDoc(codeDoc);
    }, 500);

    return () => clearTimeout(timer);
  }, [htmlCode, cssCode, jsCode]);

  return (
    <div className="code-output-container">
      {window.location.pathname !== "/code-output" && (
        <span
          onClick={() =>
            window.open("/code-output", "_blank", "rel=noopener noreferrer")
          }
          className="new-window"
        >
          <OpenInNewIcon className="new-window-icon" />
        </span>
      )}
      <iframe
        srcDoc={outputDoc}
        style={{ minHeight: "97vh", width: "100%", margin: 0, padding: 0 }}
        title="Results"
      ></iframe>
    </div>
  );
}

export default CodeOutput;
