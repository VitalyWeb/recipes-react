import React, { useEffect, createContext, useContext, useReducer } from 'react';

const API_BASE = process.env.REACT_APP_API_BASE;
const RecipesContext = createContext();

const ACTIONS = {
  SET_HOME_RECIPES: 'SET_HOME_RECIPES',
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_AREAS: 'SET_AREAS',
  SET_INGREDIENTS: 'SET_INGREDIENTS',
  TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
};

function recipesReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_HOME_RECIPES:
      return { ...state, homeRecipes: action.payload };
    case ACTIONS.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case ACTIONS.SET_AREAS:
      return { ...state, areas: action.payload };
    case ACTIONS.SET_INGREDIENTS:
      return { ...state, ingredients: action.payload };
    case ACTIONS.TOGGLE_FAVORITE:
      const exists = state.favorites.find(r => r.idMeal === action.payload.idMeal);
      const newFavorites = exists
        ? state.favorites.filter(r => r.idMeal !== action.payload.idMeal)
        : [...state.favorites, action.payload];
      return { ...state, favorites: newFavorites };
    default:
      return state;
  }
}

export function useRecipes() {
  return useContext(RecipesContext);
}

export default function RecipesProvider({ children }) {
  const [state, dispatch] = useReducer(recipesReducer, {
    homeRecipes: [],
    categories: [],
    areas: [],
    ingredients: [],
    favorites: JSON.parse(localStorage.getItem('fav_recipes') || '[]'),
  });

  useEffect(() => {
    localStorage.setItem('fav_recipes', JSON.stringify(state.favorites));
  }, [state.favorites]);

  useEffect(() => {
    fetch(`${API_BASE}/search.php?s=`)
      .then(res => res.json())
      .then(data => {
        const filteredRecipes = (data.meals || []).filter(meal => meal.strArea !== 'Unknown');
        dispatch({ type: ACTIONS.SET_HOME_RECIPES, payload: filteredRecipes.slice(0, 50) });
      });
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/categories.php`)
      .then(res => res.json())
      .then(data => dispatch({ type: ACTIONS.SET_CATEGORIES, payload: data.categories || [] }));

    fetch(`${API_BASE}/list.php?a=list`)
      .then(res => res.json())
      .then(data => {
        const filteredAreas = (data.meals || []).filter(area => area.strArea !== 'Unknown');
        dispatch({ type: ACTIONS.SET_AREAS, payload: filteredAreas });
      });

    fetch(`${API_BASE}/list.php?i=list`)
      .then(res => res.json())
      .then(data => dispatch({ type: ACTIONS.SET_INGREDIENTS, payload: (data.meals || []).slice(0, 50) }));
  }, []);

  const toggleFavorite = (meal) => {
    dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: meal });
  };

  return (
    <RecipesContext.Provider value={{ ...state, toggleFavorite }}>
      {children}
    </RecipesContext.Provider>
  );
}