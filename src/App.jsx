import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipesProvider from './context/RecipesContext.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import CategoriesPage from './pages/CategoriesPage.jsx';
import ListResults from './pages/ListResults.jsx';
import RecipePage from './pages/RecipePage.jsx';
import SearchResults from './pages/SearchResults.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';

function AppShell() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/category/:category" element={<ListResults type="category" />} />
        <Route path="/area/:area" element={<ListResults type="area" />} />
        <Route path="/ingredient/:ingredient" element={<ListResults type="ingredient" />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<main className="container page"><h1>404: Страница не найдена</h1></main>} />
      </Routes>
      <Footer />
    </Router>
  );
}

function App() {
  return (
    <RecipesProvider>
      <AppShell />
    </RecipesProvider>
  );
}

export default App;