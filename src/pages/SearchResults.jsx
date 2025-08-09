import React, { useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SmallCard from '../components/SmallCard.jsx';

const API_BASE = process.env.REACT_APP_API_BASE;

const initialState = {
  meals: [],
  isLoading: true,
};

function searchReducer(state, action) {
  switch (action.type) {
    case 'SET_MEALS':
      return { ...state, meals: action.payload, isLoading: false };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function SearchResults() {
  const { search } = useLocation();
  const q = new URLSearchParams(search).get('q') || '';
  const [state, dispatch] = useReducer(searchReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'RESET' });
    if (!q) return;
    fetch(`${API_BASE}/search.php?s=${encodeURIComponent(q)}`)
      .then(res => res.json())
      .then(data => {
        const filteredMeals = (data.meals || []).filter(meal => meal.strArea !== 'Unknown');
        dispatch({ type: 'SET_MEALS', payload: filteredMeals });
      });
  }, [q]);

  if (state.isLoading) return <div>Поиск...</div>;

  return (
    <main className="container page fade-in">
      <h1>Поиск: {q}</h1>
      <div className="grid recipes-grid">
        {state.meals.map(meal => <SmallCard key={meal.idMeal} meal={meal} />)}
      </div>
    </main>
  );
}