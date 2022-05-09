import React from 'react';
import './App.css';
import { Home } from "./views/Home"
import { Dashboard } from "./views/Dashboard"
import { NavBar } from "./components/nav/NavBar"
import { Link } from "react-router-dom";
import {
  Routes,
  Route,
} from "react-router-dom";
import { MovieView } from './views/MovieView';
function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<MovieView />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
