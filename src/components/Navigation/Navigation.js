import React from 'react'

import { NavLink, Link } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Logout_theme_light from '../../images/logout-black.svg';
import Logout_theme_dark from '../../images/logout-white.svg';
import Close from '../../images/close-icon.svg';
import './Navigation.css'

import hamburger from '../../images/hamburger.svg';
import hamburger_dark from '../../images/hamburger-dark.svg';

function Navigation(props) {
  const handleMobileMenuDisplay = () => props.setIsMobileMenuOpen(!props.isMobileMenuOpen);
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      {props.isMobile ? (
        <>
          {!props.isMobileMenuOpen && (
            <nav>
              <img
                src={`
            ${
              props.location.pathname === "/saved-news"
                ? hamburger_dark
                : hamburger
            }`}
                alt="menu icon"
                className="nav__icon nav__img"
                onClick={handleMobileMenuDisplay}
              />
            </nav>
          )}
          {props.isMobileMenuOpen && (
            <nav className="nav__mobile-overlay" role="navigation">
              <button className="nav__close" onClick={handleMobileMenuDisplay}>
                <img src={Close} alt="close menu icon" className="nav__img" />
              </button>

              <ul
                className={`nav__linkList nav__mobile ${
                  props.isMobile
                    ? "nav__mobile-menu"
                    : "nav__mobile-menu_hidden"
                }`}
              >
                <li className="nav__links">
                  <Link to="/" className="nav__link">
                    Home
                  </Link>
                </li>
                {props.isLoggedIn ? (
                  <li className="nav__links">
                    <Link to="/saved-news" className="nav__link">
                      Saved Articles
                    </Link>
                  </li>
                ) : null}

                <li className="nav__links">
                  {props.isLoggedIn ? (
                    <button
                      onClick={props.onSignout}
                      className="nav__btn nav__btn_user "
                    >
                      <span
                        className="nav__btn_username nav_theme_dark"
                        aria-label="username"
                      >
                        {currentUser && currentUser.name}
                      </span>
                      <img
                        src={Logout_theme_dark}
                        className="nav__signout"
                        alt="signout icon"
                        focusable="false"
                      />
                    </button>
                  ) : (
                    <button className="nav__btn" onClick={props.onClickSignin}>
                      Sign In
                    </button>
                  )}
                </li>
              </ul>
            </nav>
          )}
        </>
      ) : (
        <nav className="nav">
          <ul className="nav__linkList">
            <li className="nav__links">
              <NavLink
                exact
                to="/"
                className={`${
                  props.location.pathname === "/saved-news"
                    ? "nav__link_dark"
                    : "nav__link"
                }`}
                activeClassName="nav__selected"
              >
                Home
              </NavLink>
            </li>
            {props.isLoggedIn && (
              <>
                <li className="nav__links nav__saved_action_active">
                  <NavLink
                    exact
                    to="/saved-news"
                    className={` ${
                      props.location.pathname === "/saved-news"
                        ? "nav__link_dark"
                        : "nav__link"
                    }`}
                    activeClassName="nav__selected nav__selected_view_black nav__selected_position_saved"
                  >
                    Saved Articles
                  </NavLink>
                </li>
                <li className="nav__links">
                  <button
                    onClick={props.onSignout}
                    className={`nav__btn nav__btn_user ${
                      props.location.pathname === "/saved-news"
                        ? "nav__btn_theme_dark"
                        : ""
                    }`}
                  >
                    <span
                      className={`nav__btn_username ${
                        props.location.pathname === "/"
                          ? "nav_theme_dark"
                          : "nav_theme_light"
                      }`}
                      aria-label="username"
                    >
                      {currentUser && currentUser.name}
                    </span>
                    <img
                      src={`
                        ${
                          props.location.pathname === "/saved-news"
                            ? Logout_theme_light
                            : Logout_theme_dark
                        }`}
                      className="nav__signout"
                      alt="signout icon"
                      focusable="false"
                    />
                  </button>
                </li>
              </>
            )}
            {!props.isLoggedIn && (
              <li className="nav__links">
                <button
                  className="nav__btn nav__btn_size_l"
                  onClick={props.onClickSignin}
                >
                  Sign In
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  );
}
export default Navigation;
