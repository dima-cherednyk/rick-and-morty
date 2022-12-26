import React from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import { Header } from './components/Header/Header';
import { CharactersPage } from './components/CharactersPage/CharactersPage';
import { HomePage } from './components/HomePage/HomePage';
import { EpisodesPage } from './components/EpisodesPage/EpisodesPage';
import { LocationsPage } from './components/LocationsPage/LocationsPage';
import { MyWatchList } from './components/MyWatchList/MyWatchList';
import './App.scss';

export const App: React.FC = () => {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/character" element={<CharactersPage />} />
        <Route path="/episode" element={<EpisodesPage />} />
        <Route path="/location" element={<LocationsPage />} />
        <Route path="/my-watch-list" element={<MyWatchList />} />
      </Routes>
    </div>
  );
};
