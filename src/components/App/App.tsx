import React, {useEffect, useState} from 'react';
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import AppStyle from './App.module.css';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import {API_URL} from "../../constants";

function App() {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch(API_URL).then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Ошибка ${res.status}`);
                });
                setIngredients(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchIngredients();
    }, []);

    return (
        <div className="App">
            <AppHeader/>
            <main className={AppStyle.MainContainer}>
                <div className={AppStyle.ItemContainer}>
                    <BurgerIngredients ingredientsData={ingredients}/>
                </div>
                <div className={AppStyle.ItemContainer}>
                    <BurgerConstructor ingredientsData={ingredients}/>
                </div>
            </main>

        </div>
    );
}

export default App;
