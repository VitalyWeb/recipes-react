import React from 'react';
import { useRecipes } from '../context/RecipesContext.jsx';
import SmallCard from '../components/SmallCard.jsx';

export default function HomePage() {
  const { homeRecipes } = useRecipes();
  return (
    <main className="container page fade-in">
      <h1>Популярные рецепты</h1>
      <div className="grid recipes-grid">
        {homeRecipes.map(meal => <SmallCard key={meal.idMeal} meal={meal} />)}
      </div>
    </main>
  );
}