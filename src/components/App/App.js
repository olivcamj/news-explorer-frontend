import React, {useState, useEffect} from 'react';
import { Switch, Route, useLocation, useHistory, Redirect } from 'react-router-dom';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import About from '../About/About.js';
import Signin from '../Signin/Signin.js';
import Signup from '../Signup/Signup.js';
import SavedNews from '../SavedNews/SavedNews.js';
import Footer from '../Footer/Footer.js';
import Success from '../Success/Success.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import './App.css';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import newsApi from '../../utils/NewsApi.js';
import  mainApi  from '../../utils/MainApi.js';
import {
  uncaughtErrorMessage,
  MOBILE_WINDOW_SIZE,
  ESC_KEYCODE,
  displayDate,
  convertDate,
} from "../../utils/constants.js";

function App() {
  let location = useLocation();
  let history = useHistory();

  const [preloaderVisible, setPreloaderVisible] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const token = localStorage.getItem("jwt");
  const [error, setError] = useState({
    email: "",
    password: "",
    result: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  //const [signinBtnDisabled, setSigninBtnDisabled] = useState(false);
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize state with width undefined, so server and client renders match
  const [windowSize, setWindowSize] = useState({ width: undefined });

  useEffect(() => {
    function validateFields() {
      const validEmailRegexp = RegExp(
        /^\w+([.-]?\w+)*(@)\w+([.-]?\w+)*(\.\w{2,3})+$/i
      );

     setError((previous) => ({
      ...previous,
      email: validEmailRegexp.test(email) ? "" : "Invalid email address",
      }));
    }
    
    validateFields();
  }, [email]);

  function clearInputFields() {
    setEmail("");
    setPassword("");
    setName("");
    setError({ email: "", password: "", result: "" });
  }

  function closeAll() {
    setIsSigninPopupOpen(false);
    setIsSignupPopupOpen(false);
    setIsSuccessPopupOpen(false);
    clearInputFields();
  }

  function useWindowSize() {
    useEffect(() => {
      function handleResize() {
        // Set window width to state
        setWindowSize({
          width: window.innerWidth,
        });
      }

      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
  }

  let size = useWindowSize();
  let isMobile = size.width <= MOBILE_WINDOW_SIZE;

  useEffect(() => {
    function close(e) {
      if (e.keyCode === ESC_KEYCODE) {
        clearInputFields();
        closeAll();
      }
    }

    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function retrieveSavedCards(token) {
    mainApi
      .getSavedArticles(token)
      .then((response) => {
        // format the date for every card added to saved articles
        //const addCard = () => response.map((item) => item ? { ...item,  date: displayDate(item.date)} : null);
        setSavedCards(
          response.map((item) => {
            return item
              ? { ...item, _id: item._id, date: displayDate(item.date) }
              : null;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

 async function handleDeleteCard(card) {
  await mainApi
      .deleteArticle(card._id, token)
      .then((res) => {
        if (res) {
          const newSearchedCards = cards.map((searchedCard) => {
            if (searchedCard.link === card.link) {
              delete searchedCard.isSaved;
              delete searchedCard._id;
            }
            return searchedCard;
          });

          setCards(newSearchedCards);

          const newSavedCards = savedCards.filter(
            (savedCard) => savedCard._id !== card._id
          );
          setSavedCards(newSavedCards);

          localStorage.setItem("cards", JSON.stringify(newSearchedCards));
        }
      })
      .catch((err) => console.log(err));
  }

  function handleClickSave(article) {
    if (!isLoggedIn) {
      // can't save a card if not logged in
      return;
    } else {
      mainApi
        .saveArticle(article, token)
        .then((response) => {
          setCards(
            cards.map((item) => {
              return item.link === article.link
                ? {
                    ...item,
                    isSaved: !article.saved,
                    date: displayDate(item.date),
                    _id: article._id,
                  }
                : item;
            })
          );

          setSavedCards([...savedCards, retrieveSavedCards(token)]);
        })
        .catch((err) => console.log(err));
    }
  }

  function isSearchedArticleSaved(article, savedCards) {
    let isSaved = false;
    let id;
    savedCards.forEach((savedCard) => {
      if (article.link === savedCard.link) {
        isSaved = true;
        id = savedCard._id;
      }
    });
    return [isSaved, id];
  }

  async function handleClickSearch(searchTerm) {
    const dateInput = convertDate();
    setShowSearchResults(false);
    setPreloaderVisible(true);
   
    if (!searchTerm || "") {
      setPreloaderVisible(false);
      setErrorMessage("Please enter a search term");
      setShowSearchResults(true);
      return;
    } else {
      setSearchTerm(localStorage.setItem("searchTerm", searchTerm));
      return await newsApi
        .getCardList(searchTerm, dateInput.from, dateInput.to)
        .then((response) => {
          
          const { status, articles } = response;
          if (status === "ok") {
            const cards = articles.map((info) => {
              const cardInfo = {
                source: info.source.name,
                link: info.url,
                title: info.title,
                date: displayDate(info.publishedAt),
                text: info.description,
                isSaved: false,
                keyword: searchTerm,
                image: info.urlToImage || "string",
              };
              
              if (savedCards.length > 0) {
                
                const [isSaved, id] = isSearchedArticleSaved(
                  cardInfo,
                  savedCards
                );
        
                if (isSaved) {
                  cardInfo.isSaved = true;
                  cardInfo._id = id;
                }
              }
              return cardInfo;
            });
            setCards(cards);
            setShowSearchResults(true);
            setPreloaderVisible(false);
            localStorage.setItem("cards", JSON.stringify(cards));
          } else {
            throw new Error(uncaughtErrorMessage);
          }
        })
        .catch((err) => {
          console.log(err);
          setPreloaderVisible(false);
          setErrorMessage("");
        });
    }
  }

  function handleSuccessPopup() {
    setIsSignupPopupOpen(false);
    setIsSuccessPopupOpen(true);
  }

  function handleSignupPopup() {
    setIsSignupPopupOpen(false);
    if (isSuccessPopupOpen) {
      setIsSuccessPopupOpen(false);
    }
    clearInputFields();
    setIsSigninPopupOpen(true);
  }

  function handleSignup(e) {
    e.preventDefault();
    mainApi
      .register(email, name, password)
      .then(() => {
        handleSuccessPopup();
        clearInputFields();
      })
      .catch((err) => console.log(err));
  }

  function handleSigninBtn() {
    clearInputFields();
    setIsSigninPopupOpen(true);
    setIsMobileMenuOpen(false);
  }

  function handleSigninPopup() {
    setIsSigninPopupOpen(false);
    clearInputFields();
    setIsSignupPopupOpen(true);
  }

  function handleSignin(e) {
    e.preventDefault();
    
    if (!email || !password) {
      throw new Error("400 - one or more of the fields were not provided");
    }
    mainApi
      .authorize(email, password)
      .then(() => {
        setIsLoggedIn(true);
        setIsSigninPopupOpen(false);
        clearInputFields();
      })
      .catch((err) => console.log(err.message));
  }

  useEffect(() => {
    if (token) {
      mainApi
        .getUser(token)
        .then((response) => {
          //setIsLoggedIn(true);
          setCurrentUser(response);
          retrieveSavedCards(token);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  useEffect(() => {
    if (localStorage.getItem(searchTerm)) {
      setSearchTerm(localStorage.getItem("searchTerm"));
    }
    if (localStorage.getItem("cards")) {
      setCards(JSON.parse(localStorage.getItem("cards")));
    }
  }, [searchTerm]);
  
  // Clear results when moving to the saved
  useEffect(() => {
    if (location.pathname === "/saved-news") {
      setShowSearchResults(false);
      if (localStorage.getItem("searchTerm")) {
      setSearchTerm(localStorage.removeItem("searchTerm"));
    }
  }}, [location.pathname]);

  function handleSignout(e) {
    e.preventDefault();
    localStorage.clear();
    setSavedCards("");
    setIsLoggedIn(false);
    setCurrentUser({});
    setShowSearchResults(false);
    history.push("/");
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          location={location}
          isLoggedIn={isLoggedIn}
          isMobile={isMobile}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          onSignin={handleSignin}
          onSignout={handleSignout}
          onClickSignin={handleSigninBtn}
        />
        <Switch>
          <Route exact path="/">
            <Main
              location={location}
              isLoggedIn={isLoggedIn}
              onClickSearch={handleClickSearch}
              preloaderVisible={preloaderVisible}
              showSearchResults={showSearchResults}
              cards={cards}
              onClickSave= {handleClickSave}
              onClickLink={handleSignupPopup}
              errorMessage={errorMessage}
            />
            <About />
            <Signin
              onClickLink={handleSigninPopup}
              isOpen={isSigninPopupOpen}
              onClose={closeAll}
              onSubmit={handleSignin}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              errors={error}
            />
            <Signup
              onClickLink={handleSignupPopup}
              isOpen={isSignupPopupOpen}
              onClose={closeAll}
              onSubmit={handleSignup}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              name={name}
              setName={setName}
              errors={error}
            />
            <Success
              isOpen={isSuccessPopupOpen}
              onClose={closeAll}
              onClickLink={handleSignupPopup}
            />
          </Route>
          <ProtectedRoute
            exact
            path="/saved-news"
            component={SavedNews}
            isLoggedIn={isLoggedIn}
            location={location}
            cards={savedCards}
            onDelete={handleDeleteCard}
          />
          <Redirect from="*" to="/" />
        </Switch>
      </CurrentUserContext.Provider>
      <Footer />
    </>
  );
}

export default App;
