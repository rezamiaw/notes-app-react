import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddNoteForm from '../components/AddNoteForm';
import { addNote } from '../utils';

function AddNote() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleAddNote = async ({ title, body }) => {
    try {
      await addNote({ title, body });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Gagal menambah catatan');
    }
  };

  return (
    <main className="add-note-wrapper">
      <div className="add-note-title">Tambah Catatan Baru</div>
      {error && <div style={{color: 'red', marginBottom: '1em'}}>{error}</div>}
      <AddNoteForm onAddNote={handleAddNote} />
    </main>
  );
}

export default AddNote; 