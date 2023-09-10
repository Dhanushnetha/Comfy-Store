import { configureStore } from "@reduxjs/toolkit";

import CartReducer from "./Features/Cart/CartSlice";
import userReducer from './Features/User/userSlice';
export const store = configureStore({
    reducer:{
        cartState: CartReducer,
        userState: userReducer
    }
})