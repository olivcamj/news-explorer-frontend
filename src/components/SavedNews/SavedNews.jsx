import React from "react";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import "./SavedNews.css";

function SavedNews(props) {
  return (
    <>
      <SavedNewsHeader cards={props.cards} />
      <section className="saved-news">
        <NewsCardList
          isLoggedIn={props.isLoggedIn}
          cards={props.cards}
          onDelete={props.onDelete}
        />
      </section>
    </>
  );
}

export default SavedNews;
