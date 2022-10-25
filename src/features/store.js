import { configureStore } from '@reduxjs/toolkit';
import searchType from './resultsSearchType';
import songResults from './resultsSongsSlice';
import artistResults from './resultsArtistsSlice';
import albumResults from './resultsAlbumsSlice';
import headerBackground from './setHeaderBackground';
import singleArtist from './artist&album/artistStoringSlice';
import singleAlbum from './artist&album/albumStoringSlice';

export const store = configureStore({
  reducer: {
    searchType,
    songResults,
    artistResults,
    albumResults,
    headerBackground,
    singleArtist,
    singleAlbum
  },
});
