import './SavedNewsHeader.css';

function SavedNewsHeader(props) {
  return (
    <div className="saved-news-header">
      <h2 className="saved-news-header__title">Saved Articles</h2>
      <h3 className="saved-news-header__subtitle">Elise, you have 5 saved articles</h3>
      <p className="saved-news-header__keyword-list">
        By keywords: 
        <span className="saved-news-header__keyword">
           Nature, Yellowstone, and 2 other
        </span>
      </p>
    </div>
  )
}

export default SavedNewsHeader;