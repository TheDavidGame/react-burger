import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {OrderState} from "../../domains/entity/index.entity";
import {API_ORDER_URL, API_URL} from "../../constants";

export const fetchOrder = createAsyncThunk<number, string[]>(
    'order/fetchOrder',
    async (ingredientIds, {rejectWithValue}) => {
        try {
            const res = await fetch(API_ORDER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ingredients: ingredientIds}),
            });
            if (!res.ok) {
                throw new Error(`Ошибка ${res.status}`);
            }
            const data = await res.json();
            return data.order.number;
        } catch (error) {
            console.log(error);
        }
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