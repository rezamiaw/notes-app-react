import React, { useState, useContext } from "react";
import { register } from "../utils";
import { useNavigate, Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import lang from "../lang";
import "../styles/variables.css";
import "../styles/Login.css";
import LoadingSpinner from "../components/LoadingSpinner";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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

    if (form.password !== form.confirmPassword) {
      setError(language === "id" ? "Password dan Konfirmasi Password tidak sama" : "Password and Confirm Password do not match");
      setIsLoading(false);
      return;
    }

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>{lang[language].register}</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="name">{lang[language].name}</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder={lang[language].name}
            value={form.name}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
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
            minLength={6}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">{lang[language].confirmPassword}</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder={lang[language].confirmPassword}
            value={form.confirmPassword}
            onChange={handleChange}
            required
            disabled={isLoading}
            minLength={6}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? <span style={{display:'flex',alignItems:'center',gap:'0.5em'}}><span>{lang[language].registering}</span><span style={{width:20,height:20}}><LoadingSpinner /></span></span> : lang[language].register}
        </button>
      </form>
      <p className="register-link">
        {lang[language].alreadyHaveAccount} <Link to="/login">{lang[language].loginHere}</Link>
      </p>
    </div>
  );
}

export default Register;
