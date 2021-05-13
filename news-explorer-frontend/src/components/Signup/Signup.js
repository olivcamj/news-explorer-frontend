import { useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import "./Signup.css";

function Signup(props) {
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const handleEmail = (e) => {
    props.setEmail(e.target.value);
    
  };

  const handlePassword = (e) => {
    props.setPassword(e.target.value);
  };

  const handleName = (e) => {
    props.setName(e.target.value);
   
  };

  useEffect(() => {
    setIsBtnDisabled(
      props.email === "" ||
        props.password === "" ||
        props.name === "" ||
        props.errors.email !== "" ||
        props.errors.password !== "" ||
        props.errors.result !== ""
    );
  }, [props]);

  return (
    <PopupWithForm
      name="signup"
      title="Sign up"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={props.onSubmit}
    >
      <label htmlFor="email" className="popup__label">
        Email
        <input
          type="text"
          placeholder="Email"
          className="popup__input"
          name="email"
          value={props.email}
          onChange={handleEmail}
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
          placeholder="Password"
          className="popup__input"
          name="password"
          value={props.password}
          onChange={handlePassword}
          required
          minLength={2}
          maxLength={200}
        />
        <span className="popup__input-error">{props.errors.password}</span>
      </label>
      <label htmlFor="username" className="popup__label">
        Username
        <input
          type="text"
          placeholder="Username"
          className="popup__input"
          name="name"
          value={props.name}
          onChange={handleName}
          required
          minLength={2}
          maxLength={200}
        />
      </label>
      <p className="popup__input-error popup__input-error_centered">
        {props.errors.result}
      </p>
      <button
        className="popup__btn popup__btn_type_signup"
        aria-label="Sign up"
        value="Sign up"
        disabled={isBtnDisabled}
        onClick={props.onSubmit}
      >
        Sign up
      </button>
      <div className="popup__link-container">
        or{" "}
        <span className="popup__link" onClick={props.onClickLink}>
          Sign In
        </span>
      </div>
    </PopupWithForm>
  );
}

export default Signup;
