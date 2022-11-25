import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'; // Импорт провайдера для хранилища
import { PersistGate } from 'redux-persist/integration/react'; // Импорт гейта для персиста
import store from './redux/store'; // Импорт обьекта из стора (хранилище и персистор)

import App from './App.jsx';

// import 'modern-normalize/modern-normalize.css';
import './App.module.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
