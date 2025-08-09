import React from 'react';
import { useRecipes } from '../context/RecipesContext.jsx';
import SmallCard from '../components/SmallCard.jsx';

export default function FavoritesPage() {
  const { favorites } = useRecipes();
  return (
    <main className="container page fade-in">
      <h1>Избранное</h1>
      <div className="grid recipes-grid">
        {favorites.map(meal => <SmallCard key={meal.idMeal} meal={meal} />)}
      </div>
    </main>
  );
}