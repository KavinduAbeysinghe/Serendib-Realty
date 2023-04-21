import { NavLink } from "react-router-dom";
import "../styles/NavBar.scss";
import { useState } from "react";

const NavBar: React.FC = () => {
  const [colorChange, setColorChange] = useState(false);

  const changeNavBarColor = (): void => {
    if (window.scrollY >= 80) {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  };

  const handleColorChange = (): string => {
    return colorChange
      ? "navbar navbar-expand-lg navbar-lg fixed-top navbar-change"
      : "navbar navbar-expand-lg navbar-lg fixed-top";
  };

  window.addEventListener("scroll", changeNavBarColor);

  return (
    <nav className={handleColorChange()} data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Serendib Realty
        </a>
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
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/agent">
                Agent
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/buyer">
                Buyer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin">
                Admin
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
