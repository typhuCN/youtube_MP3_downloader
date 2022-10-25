import { createSlice } from "@reduxjs/toolkit";


const paddingRightAndLeftSlice = createSlice({
    name: "paddingLeftAndRight",
    initialState: { padding: "20%" },
    reducers: {
        changePadding: (state, action) => {
            state.padding = action.payload;
        }
    }
})

export const { changePadding } = paddingRightAndLeftSlice.actions;
export default paddingRightAndLeftSlice.reducer;
export const selectPadding = state => state.paddingRightAndLeft.padding;