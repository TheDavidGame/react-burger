import React from 'react';
import './App.css';
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import AppStyle from './App.module.css';
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";

function App() {
    return (
        <div className="App">
            <AppHeader/>
            <main className={AppStyle.MainContainer}>
                <div style={{width: '600px'}} className={AppStyle.ItemContainer}>
                    <BurgerIngredients/>
                </div>
                <div style={{width: '600px'}} className={AppStyle.ItemContainer}>
                    <BurgerConstructor/>
                </div>
            </main>

        </div>
    );
}

export default App;
