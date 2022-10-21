import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from '../api/playList';

export const fetchSongs = createAsyncThunk(
    'songResults/fetchSongs',
    async search => {
        const response = await client({
            method: 'GET',
            url: '/v2/search',
            params: {query: search},
            headers: {
                'X-RapidAPI-Key': '2d91def2c0mshfd67601ee0f3738p10fc48jsn4cc6400224b1',
                'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
              }
        });
        return response.result.songs;
    }
    );

const resultsSongSlice = createSlice({
    name: "songResults",
    initialState: {
        status: "idle", // idle / pending / fulfilled / rejected 
        results: []
    },
    reducers: {},
    extraReducers: {
            [fetchSongs.pending]: (state, action) => {
                state.status = "pending";
            },
            [fetchSongs.fulfilled]: (state, action) => {
                state.status = "fulfilled";
                state.results = action.payload;
            },
            [fetchSongs.rejected]: (state, action) => {
                state.status = "rejected";
            }
    }
})

export default resultsSongSlice.reducer;
export const selectSongs = state => state.songResults;