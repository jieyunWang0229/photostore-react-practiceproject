import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name:'ui',
    initialState : {
        cartIsVisible: false,
        logformIsVisible: false

    },
    reducers:{
        toggleCart(state){
            state.cartIsVisible = !state.cartIsVisible;
        },
        toggleLogForm(state){
            state.logformIsVisible = !state.logformIsVisible;
        },

    }
});

export const uiActions = uiSlice.actions;
export default uiSlice;