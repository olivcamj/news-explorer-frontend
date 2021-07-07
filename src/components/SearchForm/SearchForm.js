import React, {useState} from 'react';
import './SearchForm.css';


function SearchForm(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [btnColor, setBtnColor] = useState('#2f71e5')

  function handleSubmit(e) {
    e.preventDefault();
    setBtnColor('#2a65cc');
    props.onClickSearch(searchTerm);
  };

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleMouseEnter() {
    setBtnColor('#347eff');
  }

  function handleMouseLeave() {
    setBtnColor('#2f71e5');
  }

  return (
    <>
      <form className="search-form">
        <label htmlFor="header-search">
          <span className="visually-hidden">Search articles</span>
        </label>
        <input
          type="text"
          className="search-form__input search-form__item"
          placeholder="Enter topic"
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          style={{ backgroundColor: btnColor }}
          className="search-form__btn search-form__item"
          onClick={handleSubmit}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Search
        </button>
      </form>
    </>
  );
}

export default SearchForm;
