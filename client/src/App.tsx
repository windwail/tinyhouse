import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Listings} from "./sections/Listings";

function App() {
  return (
    <div className="App">
      <div>
        <Listings title={"Hi"}/>
      </div>
    </div>
  );
}

export default App;
