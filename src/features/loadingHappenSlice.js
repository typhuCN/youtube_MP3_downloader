import { createSlice } from "@reduxjs/toolkit";

const loadingHappenSlice = createSlice({
    name: 'loadingHappen',
    initialState: { loading: false },
    reducers: {
        changeLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
})

export const { changeLoading } = loadingHappenSlice.actions;
export default loadingHappenSlice.reducer;
export const selectLoadingHappen = state => state.loadingHappen.loading;