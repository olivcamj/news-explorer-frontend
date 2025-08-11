/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Signin from "../Signin/Signin";
import Signup from "../Signup/Signup";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";
import Success from "../Success/Success";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import newsApi from "../../utils/NewsApi";
import mainApi from "../../utils/MainApi";
import {
  uncaughtErrorMessage,
  MOBILE_WINDOW_SIZE,
  ESC_KEYCODE,
  displayDate,
  convertDate,
} from "../../utils/constants";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [preloaderVisible, setPreloaderVisible] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
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
  // const [signinBtnDisabled, setSigninBtnDisabled] = useState(false);
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

      const validPasswordRegexp = RegExp(/\w{8}/i);

      setError((previous) => ({
        ...previous,
        email:
          validEmailRegexp.test(email) || !email ? "" : "Invalid email address",
        password:
          validPasswordRegexp.test(password) || !password
            ? ""
            : "Password must have 8 characters",
      }));
    }
    validateFields();
  }, [email, password]);

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

  const size = useWindowSize();
  const isMobile = size.width <= MOBILE_WINDOW_SIZE;

  useEffect(() => {
    function close(e) {
      if (e.keyCode === ESC_KEYCODE) {
        clearInputFields();
        closeAll();
      }
    }

    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
    // eslint-disable-next-line
  }, []);

  // eslint-disable-next-line no-shadow
  function retrieveSavedCards(token) {
    mainApi
      .getSavedArticles(token)
      .then((response) => {
        // format the date for every card added to saved articles
        setSavedCards(
          response.map((item) =>
            item
              ? { ...item, _id: item._id, date: displayDate(item.date) }
              : null
          )
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
        if (!res) return;
        if (res) {
          const updatedSearchedCards = cards.map((searchedCard) => {
            if (searchedCard.link === card.link) {
              searchedCard.isSaved = false;
              delete searchedCard._id;
            }
            return searchedCard;
          });

          setCards(updatedSearchedCards);

          const newSavedCards = savedCards.filter(
            (savedCard) => savedCard._id !== card._id
          );
          setSavedCards(newSavedCards);

          localStorage.setItem("cards", JSON.stringify(newSearchedCards));
        }
      })
      .catch((err) => console.error("Failed to delete ssved cards: ", err));
  }

  function handleClickSave(article) {
    if (!isLoggedIn) return; // can't save a card if not logged in

    if (article.isSaved) {
      const savedCard = savedCards.find((card) => card.link === article.link);
      if (savedCard) {
        handleDeleteCard(savedCard);
      }
    } else {
      mainApi
        .saveArticle(article, token)
        .then((newCard) => {
          setCards((prevCards) =>
            prevCards.map((item) =>
              item.link === article.link
                ? {
                    ...item,
                    isSaved: true,
                    date: displayDate(item.date),
                    _id: newCard._id,
                  }
                : item
            )
          );

          retrieveSavedCards(token).then((freshSavedCards) => {
            setSavedCards(freshSavedCards);
          });
        })
        .catch((err) => console.error(err));
    }
  }

  function isSearchedArticleSaved(article, savedCards) {
    const savedCard = savedCards.find((card) => card.link === article.link);
    return [Boolean(savedCard), savedCard?._id];
  }

  // eslint-disable-next-line consistent-return
  async function handleClickSearch(searchTerm) {
    const dateInput = convertDate();
    setShowSearchResults(false);
    setPreloaderVisible(true);

    if (!searchTerm || "") {
      setPreloaderVisible(false);
      setErrorMessage("Please enter a search term");
      setShowSearchResults(true);
    } else {
      setSearchTerm(localStorage.setItem("searchTerm", searchTerm));
      // eslint-disable-next-line no-return-await
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
                const { isSaved, id } = isSearchedArticleSaved(
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
      .then((res) => {
        if (res) {
          handleSuccessPopup();
          clearInputFields();
        } else {
          setError((previous) => ({
            ...previous,
            result: "This email address is not available",
          }));
        }
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
      .then((res) => {
        if (res.message) {
          setError((err) => ({
            ...err,
            result: res.message,
          }));
          throw new Error("401 - one or more of the fields were not a match");
        } else {
          setIsLoggedIn(true);
          setIsSigninPopupOpen(false);
          clearInputFields();
        }
      })
      .catch((err) => console.log(err.message));
  }

  useEffect(() => {
    if (token) {
      mainApi
        .getUser(token)
        .then((response) => {
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
    }
  }, [location.pathname]);

  function handleSignout(e) {
    e.preventDefault();
    localStorage.clear();
    setSavedCards("");
    setIsLoggedIn(false);
    setCurrentUser({});
    setShowSearchResults(false);
    navigate("/");
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          isLoggedIn={isLoggedIn}
          isMobile={isMobile}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          onSignin={handleSignin}
          onSignout={handleSignout}
          onClickSignin={handleSigninBtn}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main
                  isLoggedIn={isLoggedIn}
                  onClickSearch={handleClickSearch}
                  preloaderVisible={preloaderVisible}
                  showSearchResults={showSearchResults}
                  cards={cards}
                  onClickSave={handleClickSave}
                  onClickLink={handleSigninPopup}
                  errorMessage={errorMessage}
                  onDelete={handleDeleteCard}
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
              </>
            }
          />
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedNews cards={savedCards} onDelete={handleDeleteCard} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CurrentUserContext.Provider>
      <Footer />
    </>
  );
}

export default App;
