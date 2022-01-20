import {
    configureStore
} from "@reduxjs/toolkit";
import {
    apiMiddleware
} from "redux-api-middleware";
import rootReducer from "./root-reducer";
import {
    persistStore
} from "redux-persist";


const middleware = [apiMiddleware];

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
            thunk: true,
        }).concat(middleware),
    devTools: false,
});

const persistor = persistStore(store);

export {
    store,
    persistor
};
