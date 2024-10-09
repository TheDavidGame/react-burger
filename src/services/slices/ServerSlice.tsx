import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_URL} from "../../constants";
import {checkResponse} from "../../utils";
import {ServerSliceState, User} from "../../domains/entity/index.entity";
import {AppDispatch} from "../../index";

export const registerUser = createAsyncThunk(
    'serverSlice/registerUser',
    async ({email, password, name}: { email: string; password: string; name: string }, {rejectWithValue}) => {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password, name}),
        });
        const data = await checkResponse(res);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken);
        return data;
    }
);

export const resetPassword = createAsyncThunk(
    'serverSlice/resetPassword',
    async ({password, token}: { password: string; token: string }, {rejectWithValue}) => {
        const res = await fetch(`${API_URL}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({password, token}),
        });

        const data = await checkResponse(res);

        if (!data.success) {
            return rejectWithValue(data.message || 'Не удалось сбросить пароль');
        }

        return data;
    }
);

export const loginUser = createAsyncThunk(
    'serverSlice/loginUser',
    async ({email, password}: { email: string; password: string }, {rejectWithValue}) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        });
        const data = await checkResponse(res);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken);
        return data;
    }
);

export const logoutUser = createAsyncThunk(
    'serverSlice/logoutUser',
    async (_, {rejectWithValue}) => {
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: refreshToken}),
        });
        const data = await checkResponse(res);

        if (data.success) {
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
        } else {
            return rejectWithValue('Ошибка при выходе из системы');
        }
        return data;
    }
);

export const fetchUserData = createAsyncThunk<
    User,
    void,
    { dispatch: AppDispatch }
>(
    'serverSlice/fetchUserData',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await fetchWithToken(
            `${API_URL}/auth/user`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('accessToken')}`,
                },
            },
            dispatch
        );

        const data = await checkResponse(res);
        return data.user;
    }
);

export const updateUserData = createAsyncThunk<
    User,
    { name: string; email: string; password?: string | undefined },
    { dispatch: AppDispatch }
>(
    'serverSlice/updateUserData',
    async (userData: { name: string; email: string; password?: string | undefined }, {rejectWithValue, dispatch}) => {
        const res = await fetchWithToken(
            `${API_URL}/auth/user`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify(userData),
            },
            dispatch
        );

        const data = await checkResponse(res);
        return data.user;
    }
);

export const refreshAccessToken = createAsyncThunk(
    'serverSlice/refreshAccessToken',
    async (_, {rejectWithValue}) => {
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await fetch(`${API_URL}/auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: refreshToken}),
        });
        const data = await checkResponse(res);

        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken);
        return data;
    }
);

const fetchWithToken = async (url: string, options: RequestInit, dispatch: AppDispatch) => {
    let response = await fetch(url, options);

    if (response.status === 403) {
        const resultAction = await dispatch(refreshAccessToken());
        if (refreshAccessToken.fulfilled.match(resultAction)) {
            const newAccessToken = resultAction.payload.accessToken;

            const newOptions = {
                ...options,
                headers: {
                    ...options.headers,
                    'authorization': `Bearer ${newAccessToken}`,
                },
            };
            response = await fetch(url, newOptions);
        } else {
            throw new Error('Не удалось обновить токен');
        }
    }
    return response;
};

const ServerSlice = createSlice({
    name: 'serverSlice',
    initialState: {
        user: null,
        accessToken: null,
        refreshToken: null,
        visitedForgotPassword: false,
    } as ServerSliceState,
    reducers: {
        setVisitedForgotPassword: (state) => {
            state.visitedForgotPassword = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
            })
            .addCase(refreshAccessToken.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.user = action.payload;
            })
    },
});

export const {setVisitedForgotPassword} = ServerSlice.actions;
export default ServerSlice.reducer;