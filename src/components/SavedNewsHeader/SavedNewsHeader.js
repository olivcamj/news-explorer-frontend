import React from 'react'
import { TOP_TWO, ZERO_ITEMS, THREE_ITEMS } from "../../utils/constants.js";

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import './SavedNewsHeader.css';

function SavedNewsHeader(props) {
  const currentUser = React.useContext(CurrentUserContext);

  let list = [];
  const frequentKeywordsList = () => {
    // go through all the keywords in saved cards array
    let savedCards = props.cards;
    if (savedCards && savedCards.length > 0) {
      // eslint-disable-next-line
      savedCards.map((el) => {
        list.push(el.keyword);
      });
    }
    return list;
  };

  // find the top 2 most frequent terms
  const findMostFrequentKeywords = (keywords) => {
     let hash = {};
     for (let word of keywords) {
       if (!hash[word]) hash[word] = ZERO_ITEMS;
       hash[word]++;
     }
     const hashToArray = Object.entries(hash);
     const sortedArray = hashToArray.sort((a, b) => b[1] - a[1]);
     const sortedElements = sortedArray.map((word) => word[0]);
     return sortedElements;
  }

  const topFrequentKeywords = (keywordsArray, k) => {
    const topKeywords = findMostFrequentKeywords(keywordsArray);
    const mostFrequent = topKeywords.slice(ZERO_ITEMS, k);
    return mostFrequent.join(', ');
  }

  const amountOfSavedCards = () => {
    if ((props.cards.length > ZERO_ITEMS) && props.cards.length > TOP_TWO) {
      // Using the list of frequent keywords return the occurence of the least popular keywords
      let arr = findMostFrequentKeywords(frequentKeywordsList());
      let remainingAmount = arr.slice(TOP_TWO).length;
      let moreKeywords = (arr.length > THREE_ITEMS) ? "others" : "other";

      if (arr.length > TOP_TWO) {
        return `, and ${remainingAmount} ${moreKeywords}`;
      }
    }
  }

  return (
    <div className="saved-news-header">
      <h2 className="saved-news-header__title">Saved Articles</h2>
      <h3 className="saved-news-header__subtitle">
        {currentUser && currentUser.name}, you have {props.cards.length} saved
        articles
      </h3>
      <p className="saved-news-header__keyword-list">
        By keywords:
        <span className="saved-news-header__keyword">
          {topFrequentKeywords(frequentKeywordsList(), TOP_TWO)}
          {amountOfSavedCards()}
        </span>
      </p>
    </div>
  );
}

export default SavedNewsHeader;
