import React from 'react';
import './Main.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import SearchResults from '../SearchResults/SearchResults';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <div className="main__background">
        <div className="main__content">
          <h1 className="main__heading">What's going on in the world?</h1>
          <p className="main__subheading">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm onClickSearch={props.onClickSearch} />
        </div>
      </div>
      {props.preloaderVisible && <Preloader />}
      {props.showSearchResults && (
        <SearchResults
          currentUser={currentUser}
          location={props.location}
          isLoggedIn={props.isLoggedIn}
          cards={props.cards}
          onClickSave={props.onClickSave}
          onClickLink={props.onClickLink}
          errorMessage={props.errorMessage}
          onDelete={props.onDelete}
        />
      )}
    </main>
  );
}

export default Main;
