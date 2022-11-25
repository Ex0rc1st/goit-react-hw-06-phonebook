import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'; // Импорт функции создания хранилища и прослойки
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'; // Импорт функции персистеров и фикса консоли
import storage from 'redux-persist/lib/storage'; // Импорт локального хранилища из библиотеки персиста
import logger from 'redux-logger'; // Импорт функции логгирования
import contactsReducer from './contacts/contacts-reducer'; // Импорт редюсера по контактам

// Конфиг персиста для контактов с блеклистом
const contactsPersistConfig = {
  key: 'contacts',
  storage,
  blacklist: ['filter'],
};

// Создание прослоек + логгер. Важен порядок!
const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  logger,
];

// Создание хранилища (корневой редюсер + прослойки + тулзы только для разработки)
const store = configureStore({
  reducer: {
    contacts: persistReducer(contactsPersistConfig, contactsReducer),
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

// Обёртка хранилища в персистор
const persistor = persistStore(store);

// Экспорт хранилища и обёртки хранилища
// eslint-disable-next-line
export default { store, persistor };
