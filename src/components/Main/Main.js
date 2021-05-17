import './Main.css';
import SearchForm from '../SearchForm/SearchForm.js';
import Preloader from '../Preloader/Preloader.js';
import SearchResults from '../SearchResults/SearchResults.js';

function Main(props) {
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
          location={props.location}
          isLoggedIn={props.isLoggedIn}
          cards={props.cards}
          onClickSave={props.onClickSave}
          onClickLink={props.onClickLink}
          errorMessage={props.errorMessage}
        />
      )}
    </main>
  );
}

export default Main;