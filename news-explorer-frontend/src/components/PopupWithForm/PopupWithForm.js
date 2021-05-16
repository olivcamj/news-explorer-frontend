import { useRef } from 'react';
import './PopupWithForm.css';

function PopupWithForm(props) {
  const refObject = useRef(null);

  function handlePopupClick(e) {
    if (refObject.current.contains(e.target)) {
      return;
    }
    props.onClose();
  }
  
  return (
    <div
      className={`popup ${props.isOpen ? "" : "popup_hidden"}`}
      onClick={handlePopupClick}
    >
      <div
        className={`popup__content popup__content_type_${props.name}`}
        ref={refObject}
      >
        <button
          name="close_button"
          className="popup__close"
          type="reset"
          aria-label="Close"
          onClick={props.onClose}
        ></button>
        <form
          className={`popup__form popup__form_type_${props.name}`}
          name={props.name}
          noValidate
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__heading">{props.title}</h2>
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
