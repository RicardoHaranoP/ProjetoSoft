import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Header from './components/Header.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Header />
    <div className="container-fluid h-100">
      <div className="row h-100">
        <App />
      </div>
    </div>
  </>
);

