import React, { useState } from 'react';
import NotFound from '../NotFound/NotFound';
import NewsCardList from '../NewsCardList/NewsCardList';
import './SearchResults.css';

function SearchResults(props) {
  const [itemsToShow, setItemsToShow] = useState(3);
  const [expanded, setExpanded] = useState(false);

  const showThreeAdditionalItems = 3;

  function handleClickShowMore() {
    setItemsToShow(itemsToShow);
    if (itemsToShow < props.cards.length) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < props.cards.length; i++) {
        setItemsToShow(itemsToShow + showThreeAdditionalItems);
        setExpanded(true);
      }
    }
    setExpanded(false);
  }

  return props.cards.length === 0 || props.errorMessage !== '' ? (
    <NotFound errorMessage={props.errorMessage} />
  ) : (
    <div className="search-results">
      <h3 className="search-results__title">Search Results</h3>

      <NewsCardList
        cards={props.cards.slice(0, itemsToShow)}
        onClickSave={props.onClickSave}
        location={props.location}
        onDelete={props.onDelete}
        onClickLink={props.onClickLink}
        isLoggedIn={props.isLoggedIn}
      />

      <button
        className={`search-results__btn${
          expanded === false && props.cards.length > itemsToShow
            ? ''
            : '_hidden'
        }`}
        onClick={handleClickShowMore}
      >
        Show More
      </button>
    </div>
  );
}

export default SearchResults;
