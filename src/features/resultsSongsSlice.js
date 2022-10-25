import { createSlice } from "@reduxjs/toolkit";

const resultsSongSlice = createSlice({
    name: "songResults",
    initialState: {
        results: []
    },
    reducers: {
        changeSongsResult: (state, action) => {
            state.results = action.payload;
        }
    }, 
})

export default resultsSongSlice.reducer;
export const selectSongs = state => state.songResults.results;
export const { changeSongsResult } = resultsSongSlice.actions;