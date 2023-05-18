import React, { useState, useEffect } from "react";
import "./dashboard.css";
import logopath from "../Homepage/img/logoCA.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getDatabase, ref, get, set } from "firebase/database";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = location.state || {};
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [addUsers, setAddUsers] = useState("");

  useEffect(() => {
    const database = getDatabase();
    const projectsRef = ref(database, "/projects");
    get(projectsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const projectsData = snapshot.val();
          const projectsList = Object.values(projectsData);
          setProjects(projectsList.filter((project) => project.usersallowed.includes(username)));
        }
      })
      .catch((error) => {
        console.error("Error retrieving projects data:", error.message);
      });

    const usersRef = ref(database, "/users");
    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const usersData = snapshot.val();
          const usersList = Object.values(usersData);
          setUsers(usersList);
        }
      })
      .catch((error) => {
        console.error("Error retrieving users data:", error.message);
      });
  }, [username]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setProjectName("");
    setAddUsers("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const projectTitle = e.target.projectName.value;
    const newUsers = e.target.addUsers.value.split(",").map((user) => user.trim());

    if (!projectTitle) {
      alert("Project name is required!");
      return;
    }

    const existingProject = projects.find((project) => project.projecttitle === projectTitle);
    if (existingProject) {
      alert("Project with the same name already exists. Please choose a different name.");
      return;
    }

    const updatedProjects = [
      ...projects,
      {
        projecttitle: projectTitle,
        chapters: [{
          "body": "",
          "deadline": "",
          "description": "",
          "id": "0",
          "lastModified": Date.now(),
          "status": "",
          "tags": "",
          "title": ""
        }],
        lastModifiedBy: username,
        usersallowed: [...newUsers, username],
      },
    ];

    const database = getDatabase();
    const projectsRef = ref(database, "/projects");
    set(projectsRef, updatedProjects)
      .then(() => {
        closeModal();
        setProjects(updatedProjects);
        alert("New project created successfully!");
      })
      .catch((error) => {
        console.error("Error creating new project:", error);
      });
  };

  const handleProjectClick = (projectName) => {
    navigate("/Main", { state: { projectName, username } });
  };

  const Modal = () => {
    return (
      <div className={`modal ${showModal ? "show" : ""}`}>
        <div className="modal-content" key={showModal ? "modal-open" : "modal-closed"}>
          <p className="crossbtn" onClick={closeModal}>
            ✖
          </p>
          <br />
          <h2>Create Project</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                id="projectName"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                id="addUsers"
                placeholder="Add Users (comma-separated)"
                value={addUsers}
                onChange={(e) => setAddUsers(e.target.value)}
              />
            </div>
            <div className="modal-buttons">
              <button className="createbtn" type="submit">
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  


  return (
    <div>
      <div className="dashboard">
        <nav className="navbar">
          <Link to="/">
            <div className="navbar-logo">
              <img src={logopath} alt="logo" height={50} />
              <h1>CoAuthorly</h1>
            </div>
          </Link>
          <div className="navbar-welcome">
            <p className="welcomemsg">Welcome, {username}!</p>
          </div>
          <button className="logout-button">Log Out</button>
        </nav>

        <div className="project-cards">
          <div className="create-project-card" onClick={openModal}>
            <h3>Create New Project</h3>
          </div>
          {projects.map((project, index) => (
            <div
              className="project-card"
              key={index}
              onClick={() => handleProjectClick(project.projecttitle)}
            >
              <h3>{project.projecttitle}</h3>
            </div>
          ))}
        </div>
      </div>
      <Modal key={showModal ? "modal-open" : "modal-closed"} />
    </div>
  );
}

export default Dashboard;
