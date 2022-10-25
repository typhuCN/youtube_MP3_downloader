import { configureStore } from '@reduxjs/toolkit';
import searchType from './resultsSearchType';
import songResults from './resultsSongsSlice';
import artistResults from './resultsArtistsSlice';
import albumResults from './resultsAlbumsSlice';
import headerBackground from './setHeaderBackground';
import paddingRightAndLeft from './paddingRightAndLeftSlice';

export const store = configureStore({
  reducer: {
    searchType,
    songResults,
    artistResults,
    albumResults,
    headerBackground,
    paddingRightAndLeft
  },
});
