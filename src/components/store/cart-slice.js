import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice( {
    name: 'cart',
    initialState : {
        items:[],
        totalQuantity:0,
        totalPrice: 0
    },
    reducers : {
        addItem (state,action){
            const newItem = action.payload;
            const existedItem  = state.items.find(item => item.id === newItem.id);
            state.totalQuantity ++;
            state.totalPrice = state.totalPrice + newItem.price;
            if(!existedItem){
                state.items.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price 
                });
            }else{
                existedItem.quantity++;
                existedItem.totalPrice = existedItem.totalPrice + newItem.price; 
            };
        },
        removeItem(state,action){
            const id = action.payload;
            const removedItem = state.items.find(item => item.id === id);
            state.totalQuantity --;
            state.totalPrice = state.totalPrice -removedItem.price;
            if(removedItem.quantity === 1){
                state.items = state.items.filter(item => item.id !== id);
            }else{
                removedItem.quantity--;
                removedItem.totalPrice = removedItem.totalPrice - removedItem.price;
            }
        },
        clearCart(state){
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice= 0;
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;
