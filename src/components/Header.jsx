import React, { useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faList, faHeart } from '@fortawesome/free-solid-svg-icons';
import logo from "../img/logo.png";

const initialState = { q: '' };

function headerReducer(state, action) {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, q: action.payload };
    case 'RESET_QUERY':
      return { ...state, q: '' };
    default:
      return state;
  }
}

export default function Header() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(headerReducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.q) {
      navigate(`/search?q=${encodeURIComponent(state.q)}`);
      dispatch({ type: 'RESET_QUERY' });
    }
  };

  return (
    <header className="site-header fade-in">
      <div className="container header-inner">
        <Link to="/" className="logo"><img src={logo} alt="logo" />Flavour Fusion</Link>
        <nav className="main-nav">
          <Link to="/"><FontAwesomeIcon icon={faHome}/> Главная</Link>
          <Link to="/categories"><FontAwesomeIcon icon={faList}/> Категории</Link>
          <Link to="/favorites"><FontAwesomeIcon icon={faHeart}/> Избранное</Link>
        </nav>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            value={state.q}
            onChange={(e) => dispatch({ type: 'SET_QUERY', payload: e.target.value })}
            placeholder="Поиск рецептов..."
          />
          <button><FontAwesomeIcon icon={faSearch}/></button>
        </form>
      </div>
    </header>
  );
}