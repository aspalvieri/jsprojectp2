import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function MainNav() {
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    Axios.get(`/api/authenticated`)
      .then(result => setAuth(result.data))
      .catch(err => console.error(err));
  });
  function LoggedIn() {
      if (auth) {
        return (
            <>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" >
                    Tasks
                    </a>
                    <div className="dropdown-menu">
                    <Link className="dropdown-item" to="/tasks">
                        Tasks
                    </Link>
                    <Link className="dropdown-item" to="/tasks/new">
                        New Task
                    </Link>
                    </div>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/logout">
                        Logout
                    </Link>
                </li>
            </>
        );
      }
      else {
          return (
              <>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                    Login
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/register">
                    Register
                    </Link>
                </li>
              </>
          );
      }
  }

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Task Manager
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <LoggedIn />
        </ul>
      </div>
    </nav>
  );
}

export default MainNav;
