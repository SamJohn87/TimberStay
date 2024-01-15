import { configureStore } from '@reduxjs/toolkit';
import { cabinsReducer } from '../features/cabins/cabinsSlice';
import { commentsReducer } from '../features/comments/commentsSlice';
import { promotionsReducer } from '../features/promotions/promotionsSlice';
import { favoritesReducer } from '../features/favorites/favoritesSlice';
import {
    persistStore,
    persistCombineReducers,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
    key: 'root',
    storage: AsyncStorage,
    debug: true
}

export const store = configureStore({
    reducer: persistCombineReducers(config, {
        cabins: cabinsReducer,
        comments: commentsReducer,
        promotions: promotionsReducer,
        favorites: favoritesReducer
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [
                FLUSH,
                REHYDRATE,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER
            ]
        }
    })
});

export const persistor = persistStore(store);