import { createSlice } from "@reduxjs/toolkit";

export const selectImage = state => state.headerBackground.background;

const headerBackgroundSlice = createSlice({
    name: 'headerBackground',
    initialState: {
        background: "none"
    },
    reducers: {
        changeBackground: (state, action) => {
            state.background = action.payload;
        }
    }
})

export const {changeBackground} = headerBackgroundSlice.actions;
export default headerBackgroundSlice.reducer;