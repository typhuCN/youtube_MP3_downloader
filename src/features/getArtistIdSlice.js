import { createSlice } from "@reduxjs/toolkit";

export const selectArtistId = state => state.artistId.artistId; 

const getArtistIdSlice = createSlice({
    name: 'artistId',
    initialState: {
        artistId: []
    },
    reducers: {
        getArtistId: (state, action) => {
            const artistId = [];
            for(const song in action.payload) {
                for(const artist in song.artists){
                    if(artistId.includes(artist.artist_id)){
                        continue;
                    }
                    artistId.push(artist.artist_id);
                }
            }
            state.artistId = artistId;
        }
    }
})

export const {getArtistId} = getArtistIdSlice.actions;
export default getArtistIdSlice.reducer;