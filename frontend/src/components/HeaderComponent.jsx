import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isUserLoggedIn, logout } from "../service/AuthService";

const HeaderComponent = () => {
  const isAuth = isUserLoggedIn();

  const navigator = useNavigate();

  function handleLogout() {
    logout();
    navigator("/login");
  }

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <a className="navbar-brand d-flex align-items-center me-4" href="/">
            <h1 className="mb-0 fs-4">
              <i className="bi bi-journal-check me-2"></i>Todo App
            </h1>
          </a>
          {isAuth && (
            <NavLink to="/todos">
              <span className="nav-link text-light">Todos</span>
            </NavLink>
          )}
        </div>
        <div>
          {!isAuth && (
            <NavLink to="/register">
              <button className="btn btn-outline-light">Register</button>
            </NavLink>
          )}

          {!isAuth && (
            <NavLink to="/login">
              <button className="btn btn-outline-light ms-2">Login</button>
            </NavLink>
          )}

          {isAuth && (
            <NavLink to="/login">
              <button
                className="btn btn-outline-light ms-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;
