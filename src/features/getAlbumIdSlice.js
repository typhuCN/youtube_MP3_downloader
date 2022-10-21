import { createSlice } from "@reduxjs/toolkit";

export const selectAlbumId = state => state.albumId.albumId; 

const getAlbumIdSlice = createSlice({
    name: 'albumId',
    initialState: {
        albumId: []
    },
    reducers: {
        getAlbumId: (state, action) => {
            const albumId = [];
            for(const song in action.payload) {
                for(const album in song.album){
                    if(albumId.includes(album.album_id)){
                        continue;
                    }
                    albumId.push(album.album_id);
                }
            }
            state.albumId = albumId;
        }
    }
})

export const {getAlbumId} = getAlbumIdSlice.actions;
export default getAlbumIdSlice.reducer;