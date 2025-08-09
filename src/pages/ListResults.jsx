import React, { useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SmallCard from '../components/SmallCard.jsx';

const API_BASE = process.env.REACT_APP_API_BASE;

const initialState = {
  meals: [],
  isLoading: true,
};

function listReducer(state, action) {
  switch (action.type) {
    case 'SET_MEALS':
      return { ...state, meals: action.payload, isLoading: false };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function ListResults({ type }) {
  const name = useParams()[type];
  const [state, dispatch] = useReducer(listReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'RESET' });
    fetch(`${API_BASE}/filter.php?${type[0]}=${encodeURIComponent(name)}`)
      .then(res => res.json())
      .then(data => dispatch({ type: 'SET_MEALS', payload: data.meals || [] }));
  }, [name, type]);

  if (state.isLoading) return <div>Загрузка...</div>;

  return (
    <main className="container page fade-in">
      <h1>{name}</h1>
      <div className="grid recipes-grid">
        {state.meals.map(meal => <SmallCard key={meal.idMeal} meal={meal} />)}
      </div>
    </main>
  );
}