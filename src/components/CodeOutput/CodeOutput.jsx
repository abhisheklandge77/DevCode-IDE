import React, { useEffect, useState } from "react";
import "./CodeOutput.css";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";

function CodeOutput(props) {
  const { htmlCode, cssCode, jsCode } = props;

  // const navigate = useNavigate();

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
        // <span onClick={() => navigate("/code-output")} className="new-window">
        //   <OpenInNewIcon className="new-window-icon" />
        // </span>
        <Link
          to={"/code-output"}
          target="_blank"
          rel="noreferrer"
          className="new-window"
        >
          <OpenInNewIcon className="new-window-icon" />
        </Link>
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
