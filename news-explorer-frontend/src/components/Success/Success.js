import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import './Success.css';
import '../Signin/Signin.js';

function Success(props) {
  return (
    <PopupWithForm
      name="success"
      title="Registration successfully completed!"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <div className="popup__link-container">
        <span
          className="popup__link popup__link_type_success"
          onClick={props.onClickLink}
        >
          Sign In
        </span>
      </div>
    </PopupWithForm>
  );
}

export default Success;
