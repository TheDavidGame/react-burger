import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ForgotPasswordState} from "../../domains/entity/index.entity";
import {API_URL} from "../../constants";
import {checkResponse} from "../../utils";

export const fetchForgotPassword = createAsyncThunk<{ message: string }, string>(
    'forgotPassword/fetch',
    async (email, {rejectWithValue}) => {
        const res = await fetch(`${API_URL}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
        });
        const data = await checkResponse(res);
        return data;
    }
);

const ForgotPasswordSlice = createSlice({
    name: 'forgotPasswordSlice',
    initialState: {successMessage: null} as ForgotPasswordState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchForgotPassword.fulfilled, (state, action) => {
            state.successMessage = action.payload.message;
        })
    },
});

export default ForgotPasswordSlice.reducer;
