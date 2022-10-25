import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleAlbum = createAsyncThunk(
    'artistSingleResult/fetchSingleArtist',
    async albumName => {
        const optionForGettingAlbumId = {
            method: 'GET',
            url: 'https://youtube-music1.p.rapidapi.com/v2/search',
            params: {query: albumName},
            headers: {
                'X-RapidAPI-Key': '2d91def2c0mshfd67601ee0f3738p10fc48jsn4cc6400224b1',
                'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
            }
        }

        try {
            const response = await axios.request(optionForGettingAlbumId);
            const albumId = response.data.result.songs[0].album.album_id;
            const optionsForFetchingAlbumId = {
                method: 'GET',
                url: 'https://youtube-music1.p.rapidapi.com/v2/get_album',
                params: {album_id: albumId},
                headers: {
                  'X-RapidAPI-Key': '2d91def2c0mshfd67601ee0f3738p10fc48jsn4cc6400224b1',
                  'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
                }
              };
            try {
                const finalResponse = await axios.request(optionsForFetchingAlbumId);
                return finalResponse.data.result;
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }
);

const resultSingleAlbumSlice = createSlice({
    name: 'singleAlbum',
    initialState: {
        status: "idle", // idle / pending / fulfilled / rejected
        result: null
    },
    reducers: {},
    extraReducers: {
        [fetchSingleAlbum.pending]: (state, action) => {
            state.status = "pending";
        },
        [fetchSingleAlbum.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.results = action.payload;
        },
        [fetchSingleAlbum.rejected]: (state, action) => {
            state.status = "rejected";
        }
    }
});

export default resultSingleAlbumSlice.reducer;
export const selectSingleAlbum = state => state.singleAlbum.result;
export const selectSingleAlbumStatus = state => state.singleAlbum.status;