import {useState, useEffect} from 'react';
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

import { cardData } from "../../utils/CardData.js";


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
  const [errorMessage, setErrorMessage] = useState('');
  //const [signinBtnDisabled, setSigninBtnDisabled] = useState(false);
  const [cards, setCards] = useState([]);

  // Initialize state with width undefined, so server and client renders match
  const [windowSize, setWindowSize] = useState({ width: undefined });


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
    }
  }, [email])

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
    setShowSearchResults(false);
    setPreloaderVisible(true);
    /* Temporarily force a timer */
    setTimeout(function(){
      if ((!searchTerm) || "") {
        setPreloaderVisible(false);
        setErrorMessage("Please enter a search term");
        setShowSearchResults(true);
        return;
      } else {
        setPreloaderVisible(false);
        // return cards that match searchTerm
        setCards(() => {
          return cardData.filter((match) => {
            // use card's properties
            const article =
              match.title.toLowerCase() ||
              match.keyword.toLowerCase() ||
              match.source.toLowerCase();
            return article.includes(searchTerm.toLowerCase());
          });
        });
        setShowSearchResults(true);
        setErrorMessage("");
      }
    }, 500); // wait 1/2 a second
    
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
            cards={cardData}
          />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
