import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchArtist = createAsyncThunk(
    'artistResults/fetchArtists',
    async artistIds => {
        const allResultArtists = [];
        for (const artistId of artistIds) {
            const options = {
                method: 'GET',
                url: 'https://youtube-music1.p.rapidapi.com/v2/get_artist',
                params: {artist_id: artistId},
                headers: {
                  'X-RapidAPI-Key': '2d91def2c0mshfd67601ee0f3738p10fc48jsn4cc6400224b1',
                  'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
                }
            };
            try {
                const response = await axios.request(options);
                console.log(response.data);
                allResultArtists.push(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        return allResultArtists;
    }
    );

const resultsArtistSlice = createSlice({
    name: "artistResults",
    initialState: {
        status: "idle", // idle / pending / fulfilled / rejected 
        results: []
    },
    reducers: {},
    extraReducers: {
            [fetchArtist.pending]: (state, action) => {
                state.status = "pending";
            },
            [fetchArtist.fulfilled]: (state, action) => {
                state.status = "fulfilled";
                state.results = action.payload;
            },
            [fetchArtist.rejected]: (state, action) => {
                state.status = "rejected";
            }
    }
})

export default resultsArtistSlice.reducer;
export const selectArtists = state => state.artistResults;