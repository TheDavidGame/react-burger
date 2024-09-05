import React, {useEffect, useState} from 'react';
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import AppStyle from './App.module.css';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import {API_URL} from "../../constants";

function App() {
    return (
        <div className="App">
            <AppHeader/>
            <main className={AppStyle.MainContainer}>
                <div className={AppStyle.ItemContainer}>
                    <BurgerIngredients/>
                </div>
                <div className={AppStyle.ItemContainer}>
                    <BurgerConstructor/>
                </div>
            </main>

        </div>
    );
}

export default App;
