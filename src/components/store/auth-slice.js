import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice(
    {
        name: 'auth',
        initialState:{
            token:'',
            uid:'',
            isLoggedIn: false,
        },
        reducers:{
            login(state,action){
                const { token,uid } = action.payload
                state.token = token;
                state.uid = uid;
                state.isLoggedIn = true;
            },
            logout(state){
                state.token = '';
                state.uid ='';
                state.isLoggedIn = false;
            }
        }
    }
);

export const authActions = authSlice.actions;
export default authSlice;
