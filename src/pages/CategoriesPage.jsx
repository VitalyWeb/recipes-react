import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../context/RecipesContext.jsx';
import FallbackImg from '../components/FallbackImg.jsx';
import noLoad from "../img/noLoad.png";

export default function CategoriesPage() {
  const { categories, areas, ingredients } = useRecipes();
  return (
    <main className="container page fade-in">
      <h1>Категории по видам</h1>
      <div className="grid categories-grid">
        {categories.map(cat => (
          <Link key={cat.idCategory} to={`/category/${cat.strCategory}`} className="cat-card hover-zoom">
            <FallbackImg src={cat.strCategoryThumb} alt={cat.strCategory} />
            <div className="cat-name">{cat.strCategory}</div>
          </Link>
        ))}
      </div>

      <h1>Категории по странам</h1>
      <div className="grid categories-grid">
        {areas.map(a => (
          <Link key={a.strArea} to={`/area/${a.strArea}`} className="cat-card hover-zoom">
            <FallbackImg src={noLoad} alt={a.strArea} />
            <div className="cat-name">{a.strArea}</div>
          </Link>
        ))}
      </div>

      <h1>Категории по ингредиентам</h1>
      <div className="grid categories-grid">
        {ingredients.map(ing => (
          <Link key={ing.idIngredient} to={`/ingredient/${ing.strIngredient}`} className="cat-card hover-zoom">
            <FallbackImg src={`https://www.themealdb.com/images/ingredients/${ing.strIngredient}.png`} alt={ing.strIngredient} />
            <div className="cat-name">{ing.strIngredient}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}