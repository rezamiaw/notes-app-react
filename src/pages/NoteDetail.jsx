import React from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/local-data';
import { FiTrash2, FiArchive, FiInbox } from 'react-icons/fi';

function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = getNote(id);

  if (!note) {
    return <Navigate to="/404" replace />;
  }

  const handleDelete = () => {
    deleteNote(id);
    navigate('/');
  };

  const handleArchive = () => {
    archiveNote(id);
    navigate('/');
  };

  const handleUnarchive = () => {
    unarchiveNote(id);
    navigate('/');
  };

  return (
    <main>
      <div className="detail-page">
        <h2 className="detail-page__title">{note.title}</h2>
        <div className="detail-page__createdAt"><small>Dibuat: {new Date(note.createdAt).toLocaleString()}</small></div>
        <div className="detail-page__body">{note.body}</div>
        <div className="note-detail-actions">
          {note.archived ? (
            <button onClick={handleUnarchive} className="note-btn note-btn-unarchive">
              <FiInbox size={18} /> Batal Arsip
            </button>
          ) : (
            <button onClick={handleArchive} className="note-btn note-btn-archive">
              <FiArchive size={18} /> Arsipkan
            </button>
          )}
          <button onClick={handleDelete} className="note-btn note-btn-delete">
            <FiTrash2 size={18} /> Hapus
          </button>
        </div>
        <br />
        <Link to="/">Kembali ke daftar catatan</Link>
      </div>
    </main>
  );
}

export default NoteDetail; 