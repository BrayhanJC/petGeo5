import AsyncStorage from '@react-native-community/async-storage';
import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import rootReducer from './';

const persistConfig = {
	key: 'root2',
	keyPrefix: '',
	storage: AsyncStorage,
	whitelist: [
		//'login',
		//'cliente'
	],
	/*
	blacklist: [
		'productos',
	  ],
	  */
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined);

export const persistor = persistStore(store);
