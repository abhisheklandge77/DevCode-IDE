import React from "react";
import "./App.css";
import DevCodeEditor from "./components/DevCodeEditor/DevCodeEditor";
import Navbar from "./components/Navbar/Navbar";
import useLocalStorage from "./hooks/useLocalStorage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CodeOutput from "./components/CodeOutput/CodeOutput";
import Footer from "./components/Footer/Footer";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import axios from "axios";
import { API_BASE_URL } from "./constants";
import { useState } from "react";
import { useEffect } from "react";
import UserContext from "./UserContext/store";
import Loader from "./components/Loader/Loader";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import PageNotFound from "./components/PageNotFound/PageNotFound";

axios.defaults.baseURL = API_BASE_URL;

function App() {
  const [htmlCode, setHtmlCode] = useLocalStorage("html", "");
  const [cssCode, setCssCode] = useLocalStorage("css", "");
  const [jsCode, setJsCode] = useLocalStorage("js", "");
  const [editorTheme, setEditorTheme] = useLocalStorage("theme", "dark");
  const [projectName, setProjectName] = useLocalStorage(
    "projectName",
    "Untitled"
  );
  const [projectId, setProjectId] = useLocalStorage("projectId", "");
  const [userData, setUserData] = useState();
  const [showNavbar, setShowNavbar] = useState(false);
  const [showEditorOptions, setShowEditorOptions] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (
      window.location.pathname !== "/signup" &&
      window.location.pathname !== "/login"
    ) {
      validateUser();
    }

    if (
      window.location.pathname !== "/signup" &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/code-output"
    ) {
      setShowNavbar(true);
    }
  }, [window.location.pathname]);

  const validateUser = async () => {
    const token = localStorage.getItem("userauthtoken");

    const response = await axios.get("/validateUser", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    console.log("validate response:::", response);
    if (response?.data?.status === 201) {
      setUserData(response.data.data);
    } else if (response?.data?.status === 401) {
      alert("Session has expired ! Sign in again");
      setUserData();
    }
  };

  return (
    <>
      <UserContext.Provider value={userData}>
        <BrowserRouter>
          {showNavbar && (
            <Navbar
              editorTheme={editorTheme}
              setEditorTheme={setEditorTheme}
              projectName={projectName}
              setProjectName={setProjectName}
              setShowNavbar={setShowNavbar}
              showEditorOptions={showEditorOptions}
              setShowEditorOptions={setShowEditorOptions}
              setShowLoader={setShowLoader}
              htmlCode={htmlCode}
              setHtmlCode={setHtmlCode}
              cssCode={cssCode}
              setCssCode={setCssCode}
              jsCode={jsCode}
              setJsCode={setJsCode}
              projectId={projectId}
              setProjectId={setProjectId}
            />
          )}
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  setShowNavbar={setShowNavbar}
                  setShowEditorOptions={setShowEditorOptions}
                />
              }
            />
            <Route
              path="/signup"
              element={<Signup setShowLoader={setShowLoader} />}
            />
            <Route
              path="/login"
              element={
                <Login
                  setShowNavbar={setShowNavbar}
                  setShowLoader={setShowLoader}
                />
              }
            />
            <Route
              path="/code-editor"
              element={
                <DevCodeEditor
                  editorTheme={editorTheme}
                  htmlCode={htmlCode}
                  setHtmlCode={setHtmlCode}
                  cssCode={cssCode}
                  setCssCode={setCssCode}
                  jsCode={jsCode}
                  setJsCode={setJsCode}
                />
              }
            />
            <Route
              path="/code-output"
              element={
                <CodeOutput
                  htmlCode={htmlCode}
                  cssCode={cssCode}
                  jsCode={jsCode}
                />
              }
            />
            <Route
              path="/forgot-password"
              element={<ForgotPassword setShowLoader={setShowLoader} />}
            />
            <Route
              path="/reset-password/:id/:token"
              element={
                <ResetPassword
                  setShowLoader={setShowLoader}
                  setShowNavbar={setShowNavbar}
                />
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
      {window.location.pathname !== "/code-output" && <Footer />}
      <Loader showLoader={showLoader} />
    </>
  );
}

export default App;
