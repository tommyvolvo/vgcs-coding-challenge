import React from 'react';
import {VehicleList} from './components/VehicleList'
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <VehicleList />
    </Router>
  )
}

export default App;
