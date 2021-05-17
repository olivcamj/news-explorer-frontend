import './Preloader.css'
import preloader from '../../images/Ellipse.png'

function Preloader() {
    return (
      <div className="preloader">
        <img
          src={preloader}
          alt="loading"
          className="preloader__image circle-preloader"
        />
        <p className="preloader__text">Searching for news...</p>
      </div>
    );
}

export default Preloader;