import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light shadow py-3">
        <div className="container navbarflex">
          <Link className="navbar-brand" to="#">
            <img
              src="https://res-console.cloudinary.com/drwmyifro/thumbnails/v1/image/upload/v1715454977/TG9nb19xeTQ5OG8=/drilldown"
              alt="Image Couldnt be Loaded"
              className="LogoImg"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ContactUs">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  About
                </Link>
              </li>
            </ul>

            <li className="nav-item btn icona btn-success">
              <Link className="nav-link" to="/Login">
                Login
              </Link>
            </li>
          </div>
        </div>
      </nav>
    </div>
  );
}
