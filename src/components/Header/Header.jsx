import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header(props) {
  const location = useLocation();
  return (
    <header
      className={`header
        ${location.pathname === "/saved-news" ? "header_dark" : ""}`}
      role="banner"
    >
      {/* Adjust the conditional statement below
       * when adding functionality so that it will not fail */}
      <Link
        to="/"
        className={`
        ${
          location.pathname === "/saved-news" && !props.isMobileMenuOpen
            ? "header__logo_dark header__logo"
            : "header__logo"
        }`}
        role="button"
        aria-pressed="false"
      >
        NewsExplorer
      </Link>
      <Navigation
        isLoggedIn={props.isLoggedIn}
        isMobile={props.isMobile}
        isMobileMenuOpen={props.isMobileMenuOpen}
        setIsMobileMenuOpen={props.setIsMobileMenuOpen}
        onClickSignin={props.onClickSignin}
        onSignout={props.onSignout}
      />
    </header>
  );
}

export default Header;
