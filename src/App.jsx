import { useState } from "react";
import "./App.css";
import DevCodeEditor from "./components/DevCodeEditor/DevCodeEditor";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [editorTheme, setEditorTheme] = useState("dark");

  return (
    <div>
      <Navbar editorTheme={editorTheme} setEditorTheme={setEditorTheme} />
      <DevCodeEditor editorTheme={editorTheme} />
    </div>
  );
}

export default App;
