import AppHeader from "../AppHeader/AppHeader";
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
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
import Modal from "../Modal/Modal";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state?.background;

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    const handleCloseModal = () => {
        navigate(-1);
    };

    return (
        <div className="App">
            <AppHeader/>
            <Routes location={background || location}>
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

                <Route path="/ingredients/:id" element={<IngredientPage showTitle={true}/>}/>

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

            {background && (
                <Routes>
                    <Route path="/ingredients/:id" element={
                        <Modal onClose={handleCloseModal} title="Детали ингредиента">
                            <IngredientPage showTitle={false}/>
                        </Modal>
                    }/>
                </Routes>
            )}
        </div>
    );
}

export default App;
