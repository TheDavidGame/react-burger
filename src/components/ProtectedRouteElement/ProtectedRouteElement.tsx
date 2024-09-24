import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useLocation} from 'react-router-dom';
import {ProtectedRouteElementProps, RootState} from "../../domains/entity/index.entity";
import {fetchUserData} from "../../services/slices/ServerSlice";
import {AppDispatch} from "../../index";

const ProtectedRouteElement = ({children, redirectPath}: ProtectedRouteElementProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const visitedForgotPassword = useSelector((state: RootState) => state.serverSlice.visitedForgotPassword);
    const user = useSelector((state: RootState) => state.serverSlice.user);
    const restrictedPaths = ['/login', '/register', '/forgot-password', '/reset-password'];
    const location = useLocation();

    useEffect(() => {
        if (!user) {
            dispatch(fetchUserData());
        }
    }, [dispatch, user]);

    if (user && restrictedPaths.includes(window.location.pathname)) {
        return <Navigate to="/" replace/>;
    }

    if (!user && !restrictedPaths.includes(window.location.pathname)) {
        localStorage.setItem('redirectPath', location.pathname);
        return <Navigate to="/login" replace/>;
    }

    if (!visitedForgotPassword && window.location.pathname === '/reset-password') {
        return <Navigate to="/forgot-password" replace/>;
    }

    return <>{children}</>;
};

export default ProtectedRouteElement;
