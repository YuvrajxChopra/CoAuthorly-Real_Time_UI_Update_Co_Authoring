import React, { useEffect, useState } from "react";
import "./mainpage.css";
import Main from "./main";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./sidebar";
import { getDatabase, ref, onValue, set } from "firebase/database";
import firebaseconfig from "./firebasedb/firebaseconfig";

function MainPage() {
  var error = false;
  const location = useLocation();
  const navigate = useNavigate();
  const { projectName, username } = location.state || {};
  if (username === "" || projectName === "" || username === undefined || projectName === undefined) {
    error = true;
    navigate("/Dashboard");
  }
  const [projectIndex, setProjectIndex] = useState(null);
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [updatedNotes, setUpdatedNotes] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    const projectsRef = ref(database, "/projects");

    const projectsListener = onValue(projectsRef, (snapshot) => {
      if (snapshot.exists()) {
        const projectsData = snapshot.val();
        const projectsList = Object.values(projectsData);
        const index = projectsList.findIndex((project) => project.projecttitle === projectName);
        setProjectIndex(index);
        console.log(index);
      }
    }, (error) => {
      console.error("Error retrieving projects data:", error.message);
    });

    const databaseRef = ref(database, `/projects/${projectIndex}/chapters`);
    const unsub = onValue(databaseRef, (snapshot) => {
      const updatedValue = snapshot.val();
      if (updatedValue) {
        const updatedNotess = Object.keys(updatedValue).map((key) => {
          return {
            id: key,
            title: updatedValue[key].title,
            body: updatedValue[key].body,
            description: updatedValue[key].description,
            deadline: updatedValue[key].deadline,
            status: updatedValue[key].status,
            tags: updatedValue[key].tags,
            lastModified: updatedValue[key].lastModified,
          };
        });
        setNotes(updatedNotess);
        setUpdatedNotes(updatedNotess)
      } else {
        setNotes([]);
      }
    });

    return () => {
      unsub();
      projectsListener();
    };
  }, [projectIndex, projectName]);

  const onUpdateNote = (updatedNote) => {
    const noteIndex = updatedNotes.findIndex((note) => note.id === updatedNote.id);
    const updatedNotesList = [...updatedNotes];
    if (noteIndex !== -1) {
      updatedNotesList[noteIndex] = updatedNote;
      setUpdatedNotes(updatedNotesList);
    }
  };

  const handleUpdateClick = () => {
    const database = getDatabase(firebaseconfig);
    const chaptersRef = ref(database, `/projects/${projectIndex}/chapters`);
    set(chaptersRef, null)
    updatedNotes.forEach((note) => {
      const noteRef = ref(database, `/projects/${projectIndex}/chapters/${note.id}`);
      set(noteRef, { ...note });
    });
    setUpdatedNotes(updatedNotes);

    const refForLM = ref(database, `projects/${projectIndex}/lastModifiedBy`);
    set(refForLM, username)
      .then(() => {
        console.log('Modified by: ', username);
      })
      .catch((error) => {
        console.error('Error updating value:', error);
      });
  };

  const [lastModifiedByUser, setlastModifiedByUser] = useState(null);
  useEffect(() => {
    const database = getDatabase(firebaseconfig);
    const databaseRef = ref(database, `projects/${projectIndex}/lastModifiedBy`);

    const unsubscribe = onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();
      setlastModifiedByUser(data);
      console.log(data);
    }, (error) => {
      console.error("Error fetching data from Firebase:", error);
    });

    return () => {
      // Cleanup function
      unsubscribe();
    };
  }, [projectIndex]);

  if (error === true) {
    return (<h4 style={{ textAlign: "center" }}>redirecting...</h4>);
  }
  else {

    return (
      <div>
        <nav className="NavbarforProject">
          <div>
            <Link to="/">
              <button className="back-button" id="back-button">
                <span className="back-icon">❮❮</span>
              </button>
            </Link>
            <span className="projectname">{projectName}</span>
          </div>
          <div>
            <span>Last Modified by: {lastModifiedByUser}</span>
            <button onClick={handleUpdateClick}>UPDATE</button>
          </div>
        </nav>
        <div className="MainPageMainDiv">
          <Sidebar
            notes={notes}
            setNotes={setNotes}
            updatedNotes={updatedNotes}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
            setUpdatedNotes={setUpdatedNotes}
            onUpdateNote={onUpdateNote}
            projectIndex={projectIndex}
          />
          <Main notes={notes} activeNote={activeNote} onUpdateNote={onUpdateNote} />
        </div>
      </div>
    );
  }
}

export default MainPage;
