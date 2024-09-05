import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_URL} from "../../constants";
import {IngredientsState, BurgerIngredientType} from "../../domains/entity/index.entity";
import {AppDispatch} from "../../index";
import {addBunsItem} from "./ConstructorIngredients";

export const fetchIngredients = createAsyncThunk<BurgerIngredientType[], void, { dispatch: AppDispatch }>(
    'ingredients/fetchIngredients',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) {
                throw new Error(`Ошибка ${res.status}`);
            }
            const data = await res.json();
            const ingredients = data.data;

            const bun = ingredients.find((item: BurgerIngredientType) => item._id === '643d69a5c3f7b9001cfa093c');
            if (bun) {
                dispatch(addBunsItem(bun));
            }

            return ingredients;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
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