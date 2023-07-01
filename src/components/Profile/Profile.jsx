import React, { useContext } from "react";
import "./Profile.css";
import UserContext from "../../UserContext/store";
import { Person, OpenWith, Delete } from "@mui/icons-material";
import noProjectsFoundImg from "../../assets/no-projects-found.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile({
  setShowLoader,
  setHtmlCode,
  setCssCode,
  setJsCode,
  setProjectId,
  setProjectName,
  validateUser,
  htmlCode,
  cssCode,
  jsCode,
  projectName,
  projectId,
}) {
  const userData = useContext(UserContext);

  const navigate = useNavigate();

  const handleDeleteBtnClick = async (project) => {
    if (
      !confirm(
        `Are you sure you want to delete project '${project?.projectName}'?`
      )
    ) {
      return;
    } else {
      setShowLoader(true);
      const url = "/delete-project";
      await axios
        .post(url, {
          userId: userData?._id,
          project,
        })
        .then((res) => {
          console.log("Delete Response:::", res);
          if (res) {
            setShowLoader(false);
            alert(`Project '${project.projectName}' Deleted Successfully`);
            validateUser();
            const projectId = JSON.parse(
              localStorage.getItem("devcode-projectId")
            );
            if (projectId === project._id) {
              setHtmlCode("");
              setCssCode("");
              setJsCode("");
              setProjectId("");
              setProjectName("Untitled");
            }
          }
        })
        .catch((error) => {
          setShowLoader(false);
          alert(
            error.response.data.error ||
              `Failed to delete project '${project.projectName}' !`
          );
          console.log("Error::::", error);
        });
    }
  };

  const handleOpenProjectbtnClick = async (project) => {
    if (htmlCode || cssCode || jsCode) {
      setShowLoader(true);
      const url = "/save-project";
      await axios
        .post(url, {
          id: userData._id,
          projectName: projectName || "Untitled",
          htmlCode,
          cssCode,
          jsCode,
          projectId,
        })
        .then((res) => {
          if (res) {
            setShowLoader(false);
            setProjectId(project._id);
            setProjectName(project.projectName);
            setHtmlCode(project.html);
            setCssCode(project.css);
            setJsCode(project.js);
            navigate("/code-editor");
          }
        })
        .catch((error) => {
          setShowLoader(false);
          alert(`Your current project '${projectName}' is not saved yet !`);
          console.log("Error::::", error);
        });
    } else {
      setProjectId(project._id);
      setProjectName(project.projectName);
      setHtmlCode(project.html);
      setCssCode(project.css);
      setJsCode(project.js);
      navigate("/code-editor");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-info">
        <div className="profile-image">
          {userData ? (
            <p className="user-initial">{userData?.userName[0]}</p>
          ) : (
            <Person />
          )}
        </div>
        <h2 className="profile-user-name">
          {userData?.userName || "Not Signed In"}
        </h2>
        {userData?.userName && (
          <span className="link" onClick={() => navigate("/update-profile")}>
            Update Profile
          </span>
        )}
      </div>
      <div className="projects-wrapper">
        <h2 className="my-projects-header">My Projects</h2>
        <div className="projects-container">
          {userData?.projects?.length ? (
            userData?.projects.map((project) => {
              return (
                <div className="project-card" key={project._id}>
                  <div className="project-image">
                    <OpenWith
                      className="expand-icon"
                      titleAccess="Open Project"
                      onClick={() => handleOpenProjectbtnClick(project)}
                    />
                  </div>
                  <div className="project-info">
                    <p className="project-name">{project.projectName}</p>
                    <Delete
                      className="delete-icon"
                      titleAccess="Delete Project"
                      onClick={() => handleDeleteBtnClick(project)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-projects-container">
              <img src={noProjectsFoundImg} alt="No Pojects Found !" />
              <h2>You don't have any projects yet !</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Profile;
