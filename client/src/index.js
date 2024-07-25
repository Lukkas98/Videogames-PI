import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import  store  from './redux/store'
import { Provider } from 'react-redux'
import axios from "axios"

// axios.defaults.baseURL = "http://localhost:3001"
axios.defaults.baseURL = "https://videogames-pi-1.onrender.com"

axios.post(`/videogames/genres`)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
