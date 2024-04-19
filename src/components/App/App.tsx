import React from 'react';
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import AppStyle from './App.module.css';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {
    return (
        <div className="App">
            <AppHeader/>
            <main className={AppStyle.MainContainer}>
                <div className={AppStyle.ItemContainer}>
                    <BurgerIngredients/>
                </div>
                <div  className={AppStyle.ItemContainer}>
                    <BurgerConstructor/>
                </div>
            </main>

        </div>
    );
}

export default App;
