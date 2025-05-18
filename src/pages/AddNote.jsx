import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddNoteForm from '../components/AddNoteForm';
import { addNote } from '../utils/local-data';

function AddNote() {
  const navigate = useNavigate();

  const handleAddNote = ({ title, body }) => {
    addNote({ title, body });
    navigate('/');
  };

  return (
    <main className="add-note-wrapper">
      <div className="add-note-title">Tambah Catatan Baru</div>
      <AddNoteForm onAddNote={handleAddNote} />
    </main>
  );
}

export default AddNote; 