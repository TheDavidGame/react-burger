import AppHeader from "../AppHeader/AppHeader";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import AppStyle from './App.module.css';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPasswordPage from "../../pages/ForgotPassword/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage/ResetPasswordPage";
import NotFound404 from "../../pages/NotFound404/NotFound404";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";
import IngredientPage from "../../pages/IngredientPage/IngredientPage";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../index";
import {useEffect} from "react";
import {fetchIngredients} from "../../services/slices/Ingredients";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";

function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    return (
        <div className="App">
            <Router>
                <AppHeader/>
                <Routes>
                    <Route path="/login" element={
                        <ProtectedRouteElement>
                            <Login/>
                        </ProtectedRouteElement>
                    }/>
                    <Route path="/register" element={
                        <ProtectedRouteElement>
                            <Register/>
                        </ProtectedRouteElement>
                    }/>
                    <Route path="/forgot-password" element={
                        <ProtectedRouteElement>
                            <ForgotPasswordPage/>
                        </ProtectedRouteElement>
                    }/>
                    <Route path="/reset-password" element={
                        <ProtectedRouteElement>
                            <ResetPasswordPage/>
                        </ProtectedRouteElement>
                    }/>
                    <Route path="/profile" element={
                        <ProtectedRouteElement>
                            <ProfilePage/>
                        </ProtectedRouteElement>
                    }/>

                    <Route path="/ingredients/:id" element={<IngredientPage/>}/>

                    <Route path="*" element={<NotFound404/>}/>

                    <Route path="/" element={
                        <main className={AppStyle.MainContainer}>
                            <div className={AppStyle.ItemContainer}>
                                <BurgerIngredients/>
                            </div>
                            <div className={AppStyle.ItemContainer}>
                                <BurgerConstructor/>
                            </div>
                        </main>
                    }/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
