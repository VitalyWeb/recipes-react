import React from 'react';
import { Link } from 'react-router-dom';
import FallbackImg from './FallbackImg.jsx';

export default function SmallCard({ meal }) {
  const displayName = meal.translatedName || meal.strMeal;
  return (
    <Link to={`/recipe/${meal.idMeal}`} className="card hover-zoom">
      <FallbackImg src={meal.strMealThumb} alt={meal.strMeal} />
      <div className="card-body">
        <h4>{displayName}</h4>
      </div>
    </Link>
  );
}