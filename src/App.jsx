import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NotesList from './pages/NotesList';
import NoteDetail from './pages/NoteDetail';
import AddNote from './pages/AddNote';
import ArchiveList from './pages/ArchiveList';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5em 0' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 style={{ margin: 0 }}>Personal Notes App</h1>
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<NotesList />} />
          <Route path="/notes/new" element={<AddNote />} />
          <Route path="/notes/:id" element={<NoteDetail />} />
          <Route path="/archives" element={<ArchiveList />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
