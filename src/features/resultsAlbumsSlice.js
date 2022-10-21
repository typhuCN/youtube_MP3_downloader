import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from '../api/playList';

export const fetchAlbum = createAsyncThunk(
    'albumResults/fetchAlbums',
    async albumIds => {
        const allResultALbums = [];
        for(const albumId of albumIds) {
            const response = await client({
                method: 'GET',
                url: '/v2/get_album',
                params: {album_id: albumId},
                headers: {
                    'X-RapidAPI-Key': '2d91def2c0mshfd67601ee0f3738p10fc48jsn4cc6400224b1',
                    'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
                  }
            });
            allResultALbums.push(response);
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
export const selectAlbums = state => state.albumResults;