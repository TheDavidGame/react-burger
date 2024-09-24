import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_URL} from "../../constants";
import {IngredientsState, BurgerIngredientType} from "../../domains/entity/index.entity";
import {AppDispatch} from "../../index";
import {checkResponse} from "../../utils";

export const fetchIngredients = createAsyncThunk<BurgerIngredientType[], void, { dispatch: AppDispatch }>(
    'ingredients/fetchIngredients',
    async (_, {dispatch, rejectWithValue}) => {
        const res = await fetch(`${API_URL}/ingredients`);
        const ingredients = await checkResponse(res);
        return ingredients.data;
    }
);

const Ingredients = createSlice({
    name: 'ingredients',
    initialState: {
        items: [] as BurgerIngredientType[],
    } as IngredientsState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.items = action.payload;
            })
    }
});

export default Ingredients.reducer;