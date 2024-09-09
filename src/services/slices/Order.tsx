import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {OrderState} from "../../domains/entity/index.entity";
import {API_ORDER_URL, API_URL} from "../../constants";
import {checkResponse} from "../../utils";

export const fetchOrder = createAsyncThunk<number, string[]>(
    'order/fetchOrder',
    async (ingredientIds, {rejectWithValue}) => {
        const res = await fetch(API_ORDER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ingredients: ingredientIds}),
        });
        const data = await checkResponse(res);
        return data.order.number;
    }
);

const Order = createSlice({
    name: 'order',
    initialState: {orderNumber: null} as OrderState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOrder.fulfilled, (state, action) => {
            state.orderNumber = action.payload;
        });
    },
});

export default Order.reducer;