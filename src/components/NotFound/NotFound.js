import React from 'react'
import notfound from '../../images/not-found.png';
import './NotFound.css';

function NotFound(props) {
return (
  <div className="not-found">
    <img src={notfound} alt="not found" className="not-found__image" />
      <h2 className="not-found__heading">Nothing found</h2>
      <p className="not-found__text">{props.errorMessage !== "" ?  props.errorMessage : "Sorry, but nothing matched your search terms."}</p>
  </div>
);
}

export default NotFound;
