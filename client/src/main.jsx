import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Recipies from './recipies.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
		<App />
		<Recipies />
  </React.StrictMode>,
)
