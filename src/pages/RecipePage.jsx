import React, { useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useRecipes } from '../context/RecipesContext.jsx';
import FallbackImg from '../components/FallbackImg.jsx';
import Loading from '../components/Loading.jsx';

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

const initialState = {
  meal: null,
  isLoading: true,
  ingredients: [],
};

function recipeReducer(state, action) {
  switch (action.type) {
    case 'SET_MEAL':
      return { ...state, meal: action.payload, isLoading: false };
    case 'SET_INGREDIENTS':
      return { ...state, ingredients: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function RecipePage() {
  const { id } = useParams();
  const { toggleFavorite, favorites } = useRecipes();
  const [state, dispatch] = useReducer(recipeReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'RESET' });
    fetch(`${API_BASE}/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => {
        const meal = data.meals ? data.meals[0] : null;
        dispatch({ type: 'SET_MEAL', payload: meal });

        if (meal) {
          const ingredients = [];
          for (let i = 1; i <= 20; i++) {
            const ing = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ing && ing.trim()) ingredients.push(`${ing} - ${measure}`);
          }
          dispatch({ type: 'SET_INGREDIENTS', payload: ingredients });
        }
      });
  }, [id]);

  if (state.isLoading) return <Loading />;
  if (!state.meal) return <div>Рецепт не найден</div>;

  const isFav = favorites.find(r => r.idMeal === state.meal.idMeal);

  return (
    <main className="container page fade-in recipe-page">
      <div className="recipe-header">
        <div className="recipe-media"><FallbackImg src={state.meal.strMealThumb} alt={state.meal.strMeal} /></div>
        <div className="recipe-meta">
          <h1>{state.meal.strMeal}</h1>
          <p>Категория: {state.meal.strCategory}</p>
          <p>Кухня: {state.meal.strArea}</p>
          <button onClick={() => toggleFavorite(state.meal)} className={isFav ? 'btn-fav' : ''}>
            <FontAwesomeIcon icon={faHeart} /> {isFav ? 'Убрать из избранного' : 'Добавить в избранное'}
          </button>
        </div>
      </div>
      <section className="ingredients">
        <h2>Ингредиенты</h2>
        <ul>{state.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
      </section>
      <section className="instructions">
        <h2>Приготовление</h2>
        <p>{state.meal.strInstructions}</p>
      </section>
    </main>
  );
}