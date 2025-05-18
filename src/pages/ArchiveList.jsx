import React from 'react';
import { Link } from 'react-router-dom';
import { getArchivedNotes } from '../utils/local-data';

function ArchiveList() {
  const notes = getArchivedNotes();

  return (
    <main>
      <div className="noteslist-actions">
        <Link to="/">
          <button className="note-btn note-btn-archive" title="Kembali ke daftar catatan">Kembali</button>
        </Link>
      </div>
      <h2 className="noteslist-title">Daftar Catatan Terarsip</h2>
      {notes.length === 0 ? (
        <div className="notes-list-empty">
          <p><strong>Arsip kosong</strong></p>
        </div>
      ) : (
        <div className="notes-list">
          {notes.map(note => (
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

export default ArchiveList; 