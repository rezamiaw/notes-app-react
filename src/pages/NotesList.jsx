import React, { useEffect, useState, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getNotes, deleteNote } from "../utils";
import { FiPlus, FiArchive, FiTrash2 } from "react-icons/fi";
import { showFormattedDate } from "../utils";
import "../styles/variables.css";
import "../styles/NotesList.css";
import LoadingSpinner from "../components/LoadingSpinner";

function NotesList() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const fetchNotes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await getNotes();
      setNotes(response.data);
    } catch (error) {
      setError(error.message || "Failed to fetch notes");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchParams(value ? { keyword: value } : {});
  };

  const handleDeleteNote = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      setIsLoading(true);
      await deleteNote(id);
      await fetchNotes();
    } catch (error) {
      setError(error.message || "Failed to delete note");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredNotes = keyword
    ? notes.filter((note) =>
        note.title.toLowerCase().includes(keyword.toLowerCase())
      )
    : notes;

  return (
    <main className="notes-container">
      <div className="notes-header">
        <h2 className="notes-title">My Notes</h2>
        <div className="notes-actions">
          <Link to="/add" className="action-button add-button">
            <FiPlus size={22} />
            <span>Add Note</span>
          </Link>
          <Link to="/archive" className="action-button archive-button">
            <FiArchive size={22} />
            <span>Archived Notes</span>
          </Link>
        </div>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search notes..."
          value={keyword}
          onChange={handleSearchChange}
          disabled={isLoading}
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      {isLoading ? (
        <LoadingSpinner />
      ) : filteredNotes.length === 0 ? (
        <div className="empty-notes">
          <p>
            {keyword
              ? "No notes found matching your search"
              : "You don't have any notes yet"}
          </p>
        </div>
      ) : (
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <div key={note.id} className="note-card">
              <div className="note-header">
                <Link to={`/notes/${note.id}`} className="note-title">
                  {note.title}
                </Link>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteNote(note.id)}
                  title="Delete note"
                  disabled={isLoading}
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
              <div className="note-date">
                {showFormattedDate(note.createdAt)}
              </div>
              <div className="note-body">{note.body}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default NotesList;
