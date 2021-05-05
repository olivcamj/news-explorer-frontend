import { useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import './Signin.css';

function Signin(props) {
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

    useEffect(() => {
      setIsBtnDisabled(
        props.email === "" ||
          props.password === "" ||
          props.errors.email !== "" ||
          props.errors.password !== ""
      );
    }, [props]);

   const handleEmail = (e) => {
     props.setEmail(e.target.value);
   };

   const handlePassword = (e) => {
     props.setPassword(e.target.value);
   };

  return (
    <PopupWithForm
      name="signin"
      title="Sign in"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={props.onSubmit}
    >
      <label htmlFor="email" className="popup__label">
        Email
        <input
          type="email"
          name="email"
          id="email"
          value={props.email}
          onChange={handleEmail}
          className="popup__input"
          placeholder="Enter Email"
          required
          minLength={2}
          maxLength={40}
        />
        <span className="popup__input-error">{props.errors.email}</span>
      </label>

      <label htmlFor="password" className="popup__label">
        Password
        <input
          type="password"
          name="password"
          id="password"
          value={props.password}
          onChange={handlePassword}
          className="popup__input"
          placeholder="Enter Password"
          required
          minLength={2}
          maxLength={200}
        />
        <span className="popup__input-error popup__input-error_centered">
          {props.errors.result}
        </span>
      </label>
      <button
        className="popup__btn popup__btn_signin"
        aria-label="Sign in"
        value="Sign in"
        disabled={isBtnDisabled}
        onClick={props.onSubmit}
      >
        Sign in
      </button>
      <div className="popup__link-container">
        or
        <span onClick={props.onClickLink} className="popup__link">
          Sign up
        </span>
      </div>
    </PopupWithForm>
  );
}

export default Signin;