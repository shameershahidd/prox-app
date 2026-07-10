import { NavLink } from "react-router-dom";
import "./BottomNav.css";

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `bottom-nav__item ${isActive ? "bottom-nav__item--active" : ""}`}
      >
        <span className="bottom-nav__icon" aria-hidden="true">🔍</span>
        <span>Search</span>
      </NavLink>
      <NavLink
        to="/saved"
        className={({ isActive }) => `bottom-nav__item ${isActive ? "bottom-nav__item--active" : ""}`}
      >
        <span className="bottom-nav__icon" aria-hidden="true">★</span>
        <span>Saved</span>
      </NavLink>
    </nav>
  );
}
