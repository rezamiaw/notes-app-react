import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getActiveNotes } from '../utils/local-data';
import { useState } from 'react';
import { FiPlus, FiArchive } from 'react-icons/fi';

function NotesList() {
  const [update, setUpdate] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const notes = getActiveNotes();

  const filteredNotes = keyword
    ? notes.filter(note => note.title.toLowerCase().includes(keyword.toLowerCase()))
    : notes;

  const handleSearchChange = (e) => {
    setSearchParams(e.target.value ? { keyword: e.target.value } : {});
  };

  const handleAddNote = ({ title, body }) => {
    import('../utils/local-data').then(({ addNote }) => {
      addNote({ title, body });
      setUpdate(u => u + 1);
    });
  };

  return (
    <main>
      <div className="noteslist-actions">
        <Link to="/notes/new">
          <button className="note-btn note-btn-archive" title="Tambah Catatan Baru"><FiPlus size={22} /></button>
        </Link>
        <Link to="/archives">
          <button className="note-btn note-btn-unarchive" title="Lihat Arsip"><FiArchive size={22} /></button>
        </Link>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Cari judul catatan..."
          value={keyword}
          onChange={handleSearchChange}
        />
      </div>
      <h2 className="noteslist-title">Daftar Catatan</h2>
      {filteredNotes.length === 0 ? (
        <div className="notes-list-empty">
          <p><strong>Tidak ada catatan</strong></p>
        </div>
      ) : (
        <div className="notes-list">
          {filteredNotes.map(note => (
            <div key={note.id} className="note-item">
              <Link to={`/notes/${note.id}`} className="note-item__title"><strong>{note.title}</strong></Link>
              <div className="note-item__createdAt"><small>{new Date(note.createdAt).toLocaleString()}</small></div>
              <div className="note-item__body">{note.body}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default NotesList; 