import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { getNoteDetail, deleteNote, archiveNote, unarchiveNote } from '../utils';
import { FiTrash2, FiArchive, FiInbox } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';

function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNote() {
      try {
        const response = await getNoteDetail(id);
        setNote(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchNote();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error || !note) return <Navigate to="/404" replace />;

  const handleDelete = async () => {
    await deleteNote(id);
    navigate('/');
  };

  const handleArchive = async () => {
    await archiveNote(id);
    navigate('/');
  };

  const handleUnarchive = async () => {
    await unarchiveNote(id);
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