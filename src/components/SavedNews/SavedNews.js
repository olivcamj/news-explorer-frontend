import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import './SavedNews.css';

function SavedNews(props) {

  return (
    <>
      <SavedNewsHeader
        location={props.location}
        cards={props.cards}
        onDelete={props.onDelete}
      />
      <section className="saved-news">
        <NewsCardList
          isLoggedIn={props.isLoggedIn}
          location={props.location}
          cards={props.cards}
        />
      </section>
    </>
  );
}

export default SavedNews;