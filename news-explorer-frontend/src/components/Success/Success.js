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
      <div
        className="popup__link popup__link_success"
        onClick={props.onClickLink}
      >
        Sign In
      </div>
    </PopupWithForm>
  );
}

export default Success;