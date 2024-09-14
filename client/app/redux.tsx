/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useRef } from "react";
import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
    Provider
} from "react-redux";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {setupListeners} from "@reduxjs/toolkit/query"
import globalReducer from "@/state";
import {api} from "@/state/api";

const createNoopStorage = () => {
    return {
      getItem(_key: any) {
        return Promise.resolve(null);
      },
      setItem(_key: any, value: any) {
        return Promise.resolve(value);
      },
      removeItem(_key: any) {
        return Promise.resolve();
      },
    };
  };

const storage = typeof window === "undefined" ? createNoopStorage():createWebStorage("local")

const persistConfig = {
    key:"root",
    storage,
    whiteList:["global"]
}


const rootReducer = combineReducers({
    global:globalReducer,
    [api.reducerPath]:api.reducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware({
                serializableCheck: {
                    // Use an object inside `serializableCheck` to ignore specific action types
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER
                    ],
                },
            }).concat(api.middleware)
    });
};



export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
export const useAppDispatch = ()=> useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;


export default function StoreProvider({children}:{children:React.ReactNode}){
       const storeRef = useRef<AppStore>();
       if(!storeRef.current){
          storeRef.current = store();
          setupListeners(storeRef.current.dispatch)
       }

       const persistor = persistStore(storeRef.current)

       return(
        <Provider store={storeRef.current}>
            <PersistGate loading={null} persistor={persistor}>
               {children}
            </PersistGate>
        </Provider>
       )
}

