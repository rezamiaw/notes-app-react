import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { FiLogOut, FiSun, FiMoon } from "react-icons/fi";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotesList from "./pages/NotesList";
import NoteDetail from "./pages/NoteDetail";
import AddNote from "./pages/AddNote";
import ArchiveList from "./pages/ArchiveList";
import NotFound from "./pages/NotFound";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { LanguageProvider, LanguageContext } from "./context/LanguageContext";
import lang from "./lang";
import LoadingSpinner from "./components/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'var(--background-color)'
      }}>
        <LoadingSpinner />
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const { language, toggleLanguage } = useContext(LanguageContext);
  
  return (
    <header className="app-header new-header-layout">
      <div className="header-left">
        <ThemeContext.Consumer>
          {({ theme, toggleTheme }) => (
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <FiMoon size={24} /> : <FiSun size={24} />}
            </button>
          )}
        </ThemeContext.Consumer>
        <button className="lang-toggle" onClick={toggleLanguage} aria-label="Ubah Bahasa">
          {language === "id" ? "EN" : "ID"}
        </button>
      </div>
      <div className="header-center">
        <Link to="/" className="app-title">
          <h1>{lang[language].appTitle}</h1>
        </Link>
      </div>
      <div className="header-right">
        {isAuthenticated && (
          <button className="logout-button" onClick={logout} aria-label={lang[language].logout}>
            <FiLogOut size={24} />
          </button>
        )}
      </div>
    </header>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <div className="app-container">
              <Header />
              <main className="app-content">
                <Routes>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <NotesList />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/notes/:id"
                    element={
                      <PrivateRoute>
                        <NoteDetail />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/add"
                    element={
                      <PrivateRoute>
                        <AddNote />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/archive"
                    element={
                      <PrivateRoute>
                        <ArchiveList />
                      </PrivateRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
