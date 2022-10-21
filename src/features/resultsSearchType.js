import { createSlice } from "@reduxjs/toolkit";

export const selectSearchType = state => state.searchType.searchType;

const resultsSearchType = createSlice({
    name: 'searchType',
    initialState: {searchType: 'songs'},
    reducers: {
        changeSearchType: (state, action) => {
            state.searchType = action.payload;
        }
    }
})


export const {changeSearchType} = resultsSearchType.actions;
export default resultsSearchType.reducer;