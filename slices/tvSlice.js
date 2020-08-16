import {createSlice, createAction} from '@reduxjs/toolkit';

const tvSlice = createSlice({
  name: 'tv',
  initialState: {
    trendingShows: [],
    popularShows: [],
    selectedSeasons: null,
    selectedSeason: null,
    selectedSimilarShows: null,
    searchResults: null,
    selectedShowDetails: null,
  },
  reducers: {
    fetchTrendingShowsSucceeded(state, action) {
      state.trendingShows = action.payload;
    },
    fetchPopularShowsSucceeded(state, action) {
      state.popularShows = action.payload;
    },
    fetchShowImageSucceeded(state, action) {
      const {index, type, response} = action.payload;
      switch (type) {
        case 'trending':
          state.trendingShows[index].images = response;
          break;
        case 'popular':
          state.popularShows[index].images = response;
          break;
        case 'similar':
          state.selectedSimilarShows[index].images = response;
          break;
        case 'search':
          state.searchResults[index] = {...state.searchResults[index], images: response};
          break;
        default:
          break;
      }
    },
    fetchEpisodeImageSucceeded(state, action) {
      const {index, response} = action.payload;
      state.selectedSeason[index].images = response;
    },
    fetchShowSeasonsSucceeded(state, action) {
      state.selectedSeasons = action.payload;
    },
    fetchShowSeasonDetailsSucceeded(state, action) {
      state.selectedSeason = action.payload;
    },
    fetchSimilarShowsSucceeded(state, action) {
      state.selectedSimilarShows = action.payload;
    },
    clearShowSeasonDetails(state, action) {
      state.selectedSeason = null;
    },
    fetchSearchResultsSucceeded(state, action) {
      state.searchResults = action.payload;
    },
    fetchTmdbShowDetailsSucceeded(state, action) {
      state.selectedShowDetails = action.payload;
    }
  },
});

export const fetchTraktTrendingShowsRequested = createAction(
  'tv/fetchTrendingShowsRequested',
);
export const fetchTraktPopularShowsRequested = createAction(
  'tv/fetchPopularShowsRequested',
);
export const fetchShowImageRequested = createAction(
  'tv/fetchShowImageRequested',
);
export const fetchShowSeasonsRequested = createAction(
  'tv/fetchShowSeasonsRequested',
);
export const fetchTraktSimilarShowsRequested = createAction(
  'tv/fetchSimilarShowsRequested',
);
export const fetchShowSeasonDetailsRequested = createAction(
  'tv/fetchShowSeasonDetailsRequested',
);
export const fetchEpisodeImageRequested = createAction(
  'tv/fetchEpisodeImageRequested',
);
export const fetchTraktSearchResultsRequested = createAction(
  'tv/fetchSearchResultsRequested',
);
export const fetchTmdbTrendingShowsRequested = createAction(
    'tv/fetchTmdbTrendingShowsRequested',
);
export const fetchTmdbPopularShowsRequested = createAction(
    'tv/fetchTmdbPopularShowsRequested',
);
export const fetchTmdbShowDetailsRequested = createAction('tv/fetchTmdbShowDetailsRequested');
export const fetchTmdbSearchResultsRequested = createAction(
    'tv/fetchSearchResultsRequested',
);
// export const fetchTmdbSimilarShowsRequested = createAction(
//     'tv/fetchSimilarShowsRequested',
// );

export const {
  fetchTrendingShowsSucceeded,
  fetchShowImageSucceeded,
  fetchPopularShowsSucceeded,
  fetchShowSeasonsSucceeded,
  fetchSimilarShowsSucceeded,
  fetchShowSeasonDetailsSucceeded,
  clearShowSeasonDetails,
  fetchEpisodeImageSucceeded,
  fetchSearchResultsSucceeded,
  fetchTmdbShowDetailsSucceeded,
} = tvSlice.actions;

export default tvSlice.reducer;
