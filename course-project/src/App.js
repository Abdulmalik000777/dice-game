import React, { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Template from "./pages/Template";
import Form from "./pages/Form";
import { ThemeContext } from "./ThemeContext";
import "./light.css";
import "./dark.css";

function App() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={`App ${theme}`}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          {t("welcome")}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                {t("login")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                {t("register")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                {t("dashboard")}
              </Link>
            </li>
            <li className="nav-item">
              <button
                onClick={() => changeLanguage("en")}
                className="btn btn-link"
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage("uz")}
                className="btn btn-link"
              >
                UZ
              </button>
            </li>
            <li className="nav-item">
              <button onClick={toggleTheme} className="btn btn-link">
                Toggle Theme
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/template/:id" element={<Template />} />
        <Route path="/form/:id" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
