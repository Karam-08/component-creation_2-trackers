import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WeatherStatus from './components/WeatherStatus'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WeatherStatus/>
  </React.StrictMode>
);
