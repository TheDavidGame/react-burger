import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BurgerIngredientType, ConstructorIngredientsState} from "../../domains/entity/index.entity";

const ConstructorIngredients = createSlice({
    name: 'constructor',
    initialState: {
        itemsConstructor: [] as BurgerIngredientType[],
        bunsItem: null,
    } as ConstructorIngredientsState,
    reducers: {
        addIngredientToConstructor: (state, action: PayloadAction<BurgerIngredientType>) => {
            state.itemsConstructor.push(action.payload);
        },
        deleteIngredientToConstructor: (state, action: PayloadAction<string>) => {
            state.itemsConstructor = state.itemsConstructor.filter(ingredient => ingredient.uniqueId !== action.payload);
        },
        addBunsItem: (state, action: PayloadAction<BurgerIngredientType>) => {
            if (state.bunsItem) {
                state.bunsItem.count = 0;
            }
            state.bunsItem = {...action.payload, count: 2};
        },
        reorderIngredients: (state, action: PayloadAction<{ fromIndex: number, toIndex: number }>) => {
            const {fromIndex, toIndex} = action.payload;
            const [removed] = state.itemsConstructor.splice(fromIndex, 1);
            state.itemsConstructor.splice(toIndex, 0, removed);
        }
    }
});

export const {
    addIngredientToConstructor,
    deleteIngredientToConstructor,
    addBunsItem,
    reorderIngredients
} = ConstructorIngredients.actions;
export default ConstructorIngredients.reducer;