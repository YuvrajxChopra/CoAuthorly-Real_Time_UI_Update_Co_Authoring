import React from 'react';
//import { getDatabase, ref, set } from 'firebase/database'; { useState, useEffect }
import { v4 as uuidv4 } from 'uuid';


const Sidebar = ({ projectIndex, notes, setNotes, updatedNotes, activeNote, setActiveNote, setUpdatedNotes, onUpdateNote }) => {
  
  const onAddNote = () => {
    const newNote = {
      id: uuidv4(),
      title: 'Untitled',
      description: '',
      tags: '',
      deadline: '',
      status: '',
      body: '',
      lastModified: Date.now(),
    };
    setUpdatedNotes([...updatedNotes, newNote]);
    setActiveNote(newNote);
  };
  const onDeleteNote = (note) => {  
    if (window.confirm(`Are you sure you want to delete the note: ${note.title}?`)) {
      if (note.id === activeNote?.id) {
        setActiveNote(null);
      }
      const updatedNotesList = updatedNotes.filter((n) => n.id !== note.id);
      setUpdatedNotes(updatedNotesList);
    }
  };

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button className="btn-add" onClick={onAddNote}>
          Add Note
        </button>
      </div>
      <div className='appsidebarnotecontainer'>
        {
          updatedNotes.map((note) => (
            <div
              className={`app-sidebar-note ${note.id === activeNote?.id ? 'active' : ''}`}
              onClick={() => setActiveNote(note)}
              key={note.id}
            >
              <div className="sidebar-note-title">
                <strong>{note.title}</strong>
                <button className="delete-note" onClick={() => onDeleteNote(note)}>
                  Delete
                </button>
              </div>
              <div className="sidebar-note-body">
                <p>{note.description}</p>
                <small className="note-meta">{new Date(note.lastModified).toLocaleDateString('en-US')}</small>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
