import { configureStore } from '@reduxjs/toolkit';
import searchType from './resultsSearchType';
import songResults from './resultsSongsSlice';
import artistId from './getArtistIdSlice';
import albumId from './getAlbumIdSlice';
import artistResults from './resultsArtistsSlice';
import albumResults from './resultsAlbumsSlice';

export const store = configureStore({
  reducer: {
    searchType,
    songResults,
    artistId,
    albumId,
    artistResults,
    albumResults
  },
});
