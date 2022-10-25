import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAlbum = createAsyncThunk(
    'albumResults/fetchAlbums',
    async albumIds => {
        const allResultALbums = [];
        for(const albumId of albumIds) {
            const options = {
                method: 'GET',
                url: 'https://youtube-music1.p.rapidapi.com/v2/get_album',
                params: {album_id: albumId},
                headers: {
                  'X-RapidAPI-Key': '2d91def2c0mshfd67601ee0f3738p10fc48jsn4cc6400224b1',
                  'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
                }
              };
            try {
                const response = await axios.request(options);
                console.log(response.data.result);
                allResultALbums.push(response.data.result);
            } catch (error) {
                console.log(error);
            }
        }
        return allResultALbums;
    }
    );

const resultsAlbumSlice = createSlice({
    name: "albumResults",
    initialState: {
        status: "idle", // idle / pending / fulfilled / rejected 
        results: []
    },
    reducers: {},
    extraReducers: {
            [fetchAlbum.pending]: (state, action) => {
                state.status = "pending";
            },
            [fetchAlbum.fulfilled]: (state, action) => {
                state.status = "fulfilled";
                state.results = action.payload;
            },
            [fetchAlbum.rejected]: (state, action) => {
                state.status = "rejected";
            }
    }
})

export default resultsAlbumSlice.reducer;
export const selectAlbums = state => state.albumResults.results;