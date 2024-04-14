import React from 'react';
import './App.css';
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import AppStyle from './App.module.css';

function App() {
  return (
    <div className="App">
      <AppHeader />
        <div style={{ width: '600px'}} className={`ml-20 ${AppStyle.BurgerIngredientsContainer}`}>
            <BurgerIngredients />
        </div>

    </div>
  );
}

export default App;
