import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import github from "../../images/github.png";
import linkedin from "../../images/linkedin.png";

function Footer() {
  return (
    <footer className="footer">
      <nav className="footer__container">
        <div className="footer__info">
          <span className="footer__text">
            <Link to="/" className="footer__info-link">
              Home
            </Link>
          </span>
          <p className="footer__text">
            <a
              href="https://tripleten.com"
              rel="noreferrer"
              target="_blank"
              className="footer__info-link"
            >
              TripleTen
            </a>
          </p>
        </div>
        <ul className="footer__links-container">
          <li className="footer__icon-link">
            <a
              href="https://www.github.com/olivcamj"
              rel="noreferrer"
              target="_blank"
              className="footer__social"
              style={{ backgroundImage: `url(${github})` }}
            >
              {""}
            </a>
          </li>
          <li className="footer__icon-link">
            <a
              href="https://www.linkedin.com/in/olivia-cameronj"
              rel="noreferrer"
              target="_blank"
              className="footer__social"
              style={{ backgroundImage: `url(${linkedin})` }}
            >
              {""}
            </a>
          </li>
        </ul>
      </nav>
      <p className="footer__copyright">© 2020 Supersite, Powered by News API</p>
    </footer>
  );
}

export default Footer;
