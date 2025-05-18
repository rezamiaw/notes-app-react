import React, { useState } from 'react';
import PropTypes from 'prop-types';

function AddNoteForm({ onAddNote }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      onAddNote({ title, body });
      setTitle('');
      setBody('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{marginBottom: '2em'}}>
      <div>
        <input
          type="text"
          placeholder="Judul catatan"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={{width: '100%', marginBottom: '0.5em'}}
        />
      </div>
      <div>
        <textarea
          placeholder="Isi catatan"
          value={body}
          onChange={e => setBody(e.target.value)}
          required
          style={{width: '100%', minHeight: '60px', marginBottom: '0.5em'}}
        />
      </div>
      <button type="submit">Tambah</button>
    </form>
  );
}

AddNoteForm.propTypes = {
  onAddNote: PropTypes.func.isRequired,
};

export default AddNoteForm; 