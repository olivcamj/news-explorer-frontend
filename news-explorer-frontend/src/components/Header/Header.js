import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.js';
import "./Header.css";

function Header(props) {

  return (
    <header
      className={`header 
        ${props.location.pathname === "/saved-news" ? "header_dark" : ""}`}
      role="banner"
    >
      {/* Adjust the conditional statement below when adding functionality so that it will not fail */}
      <Link
        to="/"
        className={` 
        ${
          props.location.pathname === "/saved-news" && !props.isMobileMenuOpen
            ? "header__logo_dark header__logo"
            : "header__logo"
        }`}
        role="button"
        aria-pressed="false"
      >
        NewsExplorer
      </Link>
      <Navigation
        name="Elise"
        location={props.location}
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
