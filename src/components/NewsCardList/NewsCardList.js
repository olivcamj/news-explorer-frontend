import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList(props) {
  return (
    <ul className="news-card-list">
      {!props.cards && (
        <p className="news-card-list__text">
          Save your favorite news articles to your list!!!
        </p>
      )}
      {props.cards && (
        props.cards.map((card, index) => (
          <NewsCard
            key={index}
            card={card}
            location={props.location}
            isLoggedIn={props.isLoggedIn}
            onClickSave={props.onClickSave}
            onDelete={props.onDelete}
            onClickLink={props.onClickLink}
          />
        )))
      }
    </ul>
  );
}

export default NewsCardList;
