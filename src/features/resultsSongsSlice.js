import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSongs = createAsyncThunk(
    'songResults/fetchSongs',
    async search => {
        const options = {
            method: 'GET',
            url: 'https://youtube-music1.p.rapidapi.com/v2/search',
            params: {query: search},
            headers: {
              'X-RapidAPI-Key': '2d91def2c0mshfd67601ee0f3738p10fc48jsn4cc6400224b1',
              'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
            }
        };
        try {
            const response = await axios.request(options);
            console.log(response.data.result.songs);
            return response.data.result.songs;
        } catch (error) {
            console.log(error);
        }
    }
    );

const resultsSongSlice = createSlice({
    name: "songResults",
    initialState: {
        status: "idle", // idle / pending / fulfilled / rejected 
        results: []
        // error: null
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
                // state.error = action.error.message;
            }
    }
})

export default resultsSongSlice.reducer;
export const selectSongs = state => state.songResults.results;
// export const selectSongsError = state => state.songResults.error;