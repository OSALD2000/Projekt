import 'bootstrap/dist/css/bootstrap.css';
import './css/main.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Chart as ChartJs } from "chart.js/auto";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
