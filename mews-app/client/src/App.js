import React, { useState, useEffect } from 'react';
import NewsFeed from './components/NewsFeed';
import CategoryFilter from './components/CategoryFilter';
import MewsleyCharacter from './components/MewsleyCharacter';
import Navigation from './components/Navigation';
import './App.css';
import { fetchMemes } from './services/sheetsService';

const App = () => {
  const [memes, setMemes] = useState([]);
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const getMemes = async () => {
      const data = await fetchMemes();
      setMemes(data);
      setFilteredMemes(data);
    };
    getMemes();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredMemes(memes);
    } else {
      setFilteredMemes(memes.filter(meme => meme.category === selectedCategory));
    }
  }, [selectedCategory, memes]);

  return (
    <div className="App">
      <MewsleyCharacter />
      <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <NewsFeed memes={filteredMemes} />
      <Navigation />
    </div>
  );
};

export default App;