import React, { useState } from 'react';
import './NewsCard.css';

function NewsCard(props) {
  const [showToolTip, setShowToolTip] = useState(false);


  function handleClickSave() {
    props.onClickSave(props.card);
  }

  function handleShowToolTip() {
    if (!props.isLoggedIn) {
      setShowToolTip(true);
    } else {
      setShowToolTip(false);
    }
  }

  function handleHideToolTip() {
    setTimeout(function() {
      setShowToolTip(false);
    }, 4000);
  }

  function handleDelete() {
    props.onDelete(props.card);
  }

  return (
    <div className="news-card">
      <div
        className="news-card__image"
        style={{ backgroundImage: `url(${props.card.image})` }}
      ></div>
      {props.location.pathname === '/' ? (
        <button
          className={`news-card__icon news-card__icon_action_save${
            props.card.isSaved === false ? '' : '_active'
          }`}
          onMouseEnter={handleShowToolTip}
          onMouseLeave={handleHideToolTip}
          onClick={handleClickSave}
        ></button>
      ) : (
        <button
          className="news-card__icon news-card__icon_action_delete"
          onMouseEnter={handleShowToolTip}
          onMouseLeave={handleHideToolTip}
          onClick={handleDelete}
        ></button>
      )}
      {!props.isLoggedIn && props.location.pathname === '/' && (
        <div
          className={`news-card__label news-card__label_right ${
            showToolTip ? '' : 'news-card__label_hidden'
          }`}
          onClick={props.onClickLink}
        >
          Sign in to save articles
        </div>
      )}
      {props.isLoggedIn && props.location.pathname === '/saved-news' && (
        <div
          className={`news-card__label news-card__label_right ${
            showToolTip ? '' : 'news-card__label_hidden'
          }`}
          onClick={handleDelete}
        >
          Remove from saved
        </div>
      )}
      <div
        className={`news-card__label news-card__label_tag ${
          props.location.pathname === '/saved-news'
            ? ''
            : 'news-card__label_hidden'
        }`}
      >
        {props.card.keyword}
      </div>

      <div className="news-card__content">
        <div className="news-card__date">{props.card.date}</div>
        <a href={props.card.link} className="news-card__title">
          {props.card.title}
        </a>
        <div className="news-card__text">{props.card.text}</div>
        <div className="news-card__source">{props.card.source}</div>
      </div>
    </div>
  );
}

export default NewsCard;
