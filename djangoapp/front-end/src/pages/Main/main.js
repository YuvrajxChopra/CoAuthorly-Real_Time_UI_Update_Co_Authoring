import React, { useState, useEffect } from 'react';

const Main = ({ notes, activeNote, onUpdateNote }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState('');
    const [body, setBody] = useState('');
    
    useEffect(() => {
        if (activeNote) {
            const { title, description, tags, deadline, status, body } =
            notes.find((note) => note.id === activeNote.id) || {};
            setTitle(title || '');
            setDescription(description || '');
            setTags(tags || '');
            setDeadline(deadline || '');
            if(status === false){
                setStatus("ongoing");
            }
            else if(status === true) {
                setStatus("completed");
            }
            setBody(body || '');
        }
    }, [activeNote, notes]);

    const onEditField = (field, value) => {
        let updatedValue = value;
      
        switch (field) {
          case 'title':
            if (value !== title) {
              setTitle(value);
            }
            break;
          case 'description':
            if (value !== description) {
              setDescription(value);
            }
            break;
          case 'tags':
            if (value !== tags) {
              setTags(value);
            }
            break;
          case 'deadline':
            if (value !== deadline) {
              setDeadline(value);
            }
            break;
          case 'status':
            if (value !== status) {
              setStatus(value);
            }
            break;
          case 'body':
            if (value !== body) {
              setBody(value);
            }
            break;
          default:
            break;
        }
      };
      
    useEffect(() => {
        const updatedNote = {
          ...activeNote,
          title,
          description,
          tags,
          deadline,
          status,
          body,
          lastModified: Date.now(),
        };
        setTimeout(() => {
            onUpdateNote(updatedNote);
          }, 0);
        }, [title, description, tags, deadline, status, body, activeNote, onUpdateNote]);

    if (!activeNote) {
        return <div className="no-active-note">No Active Note</div>;
    } 
    
    

    return (
        <div className="app-main">
            <div className="app-main-note-edit">
                <input
                    type="text"
                    id="title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => onEditField('title', e.target.value)}
                    maxLength={30}
                    autoFocus
                />
                <input
                    type="text"
                    id="description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => onEditField('description', e.target.value)}
                />
                <input
                    type="text"
                    id="tags"
                    placeholder="Add tags"
                    value={tags}
                    onChange={(e) => onEditField('tags', e.target.value)}
                />
                <div className="deadlinefield">
                    <label>Deadline:</label>
                    <input
                        type="date"
                        id="deadline"
                        value={deadline}
                        onChange={(e) => onEditField('deadline', e.target.value)}
                    />
                    <div className="radiobtns">
                        <input
                            type="radio"
                            id="option1"
                            name="options"
                            value="ongoing"
                            checked={status === 'ongoing'}
                            onChange={(e) => onEditField('status', e.target.value)}
                        />
                        <label htmlFor="option1">Ongoing</label>

                        <input
                            type="radio"
                            id="option2"
                            name="options"
                            value="completed"
                            checked={status === 'completed'}
                            onChange={(e) => onEditField('status', e.target.value)}
                        />
                        <label htmlFor="option2">Completed</label>
                    </div>
                </div>
                <textarea
                    id="body"
                    placeholder="Write your notes here..."
                    value={body}
                    onChange={(e) => onEditField('body', e.target.value)}
                ></textarea>
            </div>
        </div>
    );
};

export default Main;    
