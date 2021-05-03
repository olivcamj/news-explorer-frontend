import './Footer.css';
import { Link } from 'react-router-dom';
import gitHub from '../../images/gitHub.svg';
import vector from '../../images/Vector.png';

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
          <a href="https://practicum.yandex.com" className="footer__info-link">
            Practicum by Yandex
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
            style={{ backgroundImage: `url(${vector})` }}
          >
            {""}
          </a>
        </li>
        <li className="footer__icon-link">
          <a
            href="https://www.facebook.com"
            rel="noreferrer"
            target="_blank"
            className="footer__social"
            style={{ backgroundImage: `url(${gitHub})` }}
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
