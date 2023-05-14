import React, { useEffect, useState } from "react";
import "./CodeOutput.css";

function CodeOutput(props) {
  const { htmlCode, cssCode, jsCode } = props;
  const [outputDoc, setOutputDoc] = useState(`
  <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DevOCde Output</title>
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
              <title>DevOCde Output</title>
              <style>${cssCode}</style>
          </head>
          <body>
            ${htmlCode}
          </body>
          <script>${jsCode}</script>
      </html>
        `;
      setOutputDoc(codeDoc);
    }, 1000);

    return () => clearTimeout(timer);
  }, [htmlCode, cssCode, jsCode]);

  return (
    <div className="code-output-container">
      <iframe
        srcDoc={outputDoc}
        height="100%"
        width="100%"
        title="Results"
      ></iframe>
    </div>
  );
}

export default CodeOutput;
