import React, { useState, useContext } from "react";
import { login } from "../utils";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LanguageContext } from "../context/LanguageContext";
import lang from "../lang";
import "../styles/variables.css";
import "../styles/Login.css";
import LoadingSpinner from "../components/LoadingSpinner";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const { language } = useContext(LanguageContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await login({ email: form.email, password: form.password });
      authLogin(response.data.user, response.data.accessToken);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>{lang[language].login}</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">{lang[language].email}</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder={lang[language].email}
            value={form.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">{lang[language].password}</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder={lang[language].password}
            value={form.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <span style={{display:'flex',alignItems:'center',gap:'0.5em'}}>
              <span>{lang[language].loggingIn}</span>
              <span style={{width:20,height:20}}><LoadingSpinner /></span>
            </span>
          ) : lang[language].login}
        </button>
      </form>
      <p className="register-link">
        {lang[language].dontHaveAccount} <Link to="/register">{lang[language].registerHere}</Link>
      </p>
    </div>
  );
}

export default Login;
