import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";

import ingredients from './services/slices/Ingredients'
import constructorIngredients from './services/slices/ConstructorIngredients'
import order from './services/slices/Order'
import forgotPasswordSlice from './services/slices/ForgotPasswordSlice'
import serverSlice from './services/slices/ServerSlice'
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store = configureStore({
    reducer: {
        ingredients,
        constructorIngredients,
        order,
        forgotPasswordSlice,
        serverSlice
    }
});

export type AppDispatch = typeof store.dispatch;

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
