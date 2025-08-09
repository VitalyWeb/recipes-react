import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer slide-up">
      <div className="container">
        <p>© {new Date().getFullYear()} Рецепты. Все права защищены.</p>
        <p>Данные предоставлены TheMealDB API.</p>
      </div>
    </footer>
  );
}