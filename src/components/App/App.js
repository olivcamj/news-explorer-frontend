import React, {useState, useEffect} from 'react';
import { Switch, Route, useLocation } from "react-router-dom";
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import About from '../About/About.js';
import Signin from '../Signin/Signin.js';
import Signup from '../Signup/Signup.js';
import SavedNews from "../SavedNews/SavedNews.js";
import Footer from '../Footer/Footer.js';
import Success from '../Success/Success.js';
import './App.css';

import newsApi from '../../utils/NewsApi';


function App() {
  let location = useLocation();

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
  const [error, setError] = useState({
    email: "",
    password: "",
    result: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  //const [signinBtnDisabled, setSigninBtnDisabled] = useState(false);
  const [cards, setCards] = useState([]);

  // Initialize state with width undefined, so server and client renders match
  const [windowSize, setWindowSize] = useState({ width: undefined });

  function displayDate(date) {
    const dateObj = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return dateObj.toLocaleString("en-US", options);
  }

  function convertDate() {
    let date = new Date();
    // expected example output: current date without 1. day of the week or time
    let to = date.toISOString().slice(0, 10);
    // calculate a date 7 days ago then return a string 
    let from = date.toJSON(date.setDate(date.getDate() - 7)).slice(0, 10);
    return { to, from };
  }

  useEffect(() => {
    function validateFields() {
      const validEmailRegexp = RegExp(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i
      );

      setError((previous) => ({
        ...previous,
        email: validEmailRegexp.test(email) ? "" : "Invalid email address",
      }));
    }
    return () => {
      validateFields();
    };
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
  let isMobile = size.width <= 767;

  useEffect(() => {
    function close(e) {
      if (e.keyCode === 27) {
        clearInputFields();
        closeAll();
      }
    }

    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClickSave() {
    if (!isLoggedIn) {
      // can't save a card if not logged in
      return;
    }
    console.log("You have clicked save");
  }

  function handleClickSearch(searchTerm) {
    const dateInput = convertDate();
    setShowSearchResults(false);
    setPreloaderVisible(true);

    if (!searchTerm || "") {
      setPreloaderVisible(false);
      setErrorMessage("Please enter a search term");
      setShowSearchResults(true);
      return;
    } else {
      newsApi
      .getCardList(searchTerm, dateInput.from, dateInput.to)
      .then((response) => {
        const { status, articles } = response;
        if (status === "ok") {
          setCards(
            articles.map((data, index) => ({
              key: index,
              source: data.source.name,
              title: data.title,
              date: displayDate(data.publishedAt),
              text: data.description,
              link: data.url,
              image: data.urlToImage,
              saved: false,
            }))
          );
          setShowSearchResults(true);
          setPreloaderVisible(false);
        } else {
          throw new Error(articles.statusText);
        }
      })
      .catch((err) => {
        console.log(err);
        setPreloaderVisible(false);
        setErrorMessage("");
    })
  }}

  function handleSuccessPopup() {
    setIsSignupPopupOpen(false);
    setIsSuccessPopupOpen(true);
  }

  function handleSignupPopup() {
    setIsSignupPopupOpen(false);
    if (isSuccessPopupOpen) {
      setIsSuccessPopupOpen(false);
    }
    setIsSigninPopupOpen(true);
  }

  function handleSignup(e) {
    e.preventDefault();
    clearInputFields();
    handleSuccessPopup();
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
    setIsLoggedIn(true);
    setIsSigninPopupOpen(false);
  }

  function handleSignout(e) {
    e.preventDefault();
    setIsLoggedIn(false);
  }

  return (
    <>
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
            name={name}
            onClickSave={handleClickSave}
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
        <Route exact path="/saved-news">
          <SavedNews
            isLoggedIn={isLoggedIn}
            location={location}
            cards={cards}
          />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
