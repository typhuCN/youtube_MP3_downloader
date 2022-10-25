import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleArtist = createAsyncThunk(
    'artistSingleResult/fetchSingleArtist',
    async artistName => {
        // console.log(artistName);
        const optionsForGettingArtistId = {
            method: 'GET',
            url: 'https://youtube-music1.p.rapidapi.com/v2/search',
            params: {query: artistName},
            headers: {
                'X-RapidAPI-Key': '2d91def2c0mshfd67601ee0f3738p10fc48jsn4cc6400224b1',
                'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
            }
        }
        try {
            const response = await axios.request(optionsForGettingArtistId);
            const artistId = response.data.result.songs[0].artists[0].artist_id;
            const optionsForFetchingArtistId = {
                method: 'GET',
                url: 'https://youtube-music1.p.rapidapi.com/v2/get_artist',
                params: {artist_id: artistId},
                headers: {
                  'X-RapidAPI-Key': '2d91def2c0mshfd67601ee0f3738p10fc48jsn4cc6400224b1',
                  'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
                }
            };
            try {
                const finalResponse = await axios.request(optionsForFetchingArtistId);
                return finalResponse.data.result;
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }
);

const resultSingleArtistSlice = createSlice({
    name: 'singleArtist',
    initialState: {
        status: "idle", // idle / pending / fulfilled / rejected
        result: null
    },
    reducers: {},
    extraReducers: {
        [fetchSingleArtist.pending]: (state, action) => {
            state.status = "pending";
        },
        [fetchSingleArtist.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.results = action.payload;
        },
        [fetchSingleArtist.rejected]: (state, action) => {
            state.status = "rejected";
        }
    }
});

export default resultSingleArtistSlice.reducer;
export const selectSingleArtist = state => state.singleArtist.result;
export const selectSingleArtistStatus = state => state.singleArtist.status;