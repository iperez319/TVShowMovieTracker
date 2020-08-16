import {all, fork} from 'redux-saga/effects';
import {
  watchFetchTraktTrendingShows,
  watchFetchShowImage,
  watchFetchTraktPopularShows,
  watchFetchShowSeasons,
  watchFetchTraktSimilarShows,
  watchFetchShowSeasonDetails,
  watchFetchEpisodeImage,
  watchFetchTraktSearchResults,
  watchFetchTmdbPopularShows, watchFetchTmdbTrendingShows, watchFetchTmdbShowDetails,
} from './tvSaga';

export default function* rootSaga() {
  yield all([
    fork(watchFetchTraktTrendingShows),
    fork(watchFetchShowImage),
    fork(watchFetchTraktPopularShows),
    fork(watchFetchShowSeasons),
    fork(watchFetchTraktSimilarShows),
    fork(watchFetchShowSeasonDetails),
    fork(watchFetchEpisodeImage),
    fork(watchFetchTraktSearchResults),
    fork(watchFetchTmdbPopularShows),
    fork(watchFetchTmdbTrendingShows),
    fork(watchFetchTmdbShowDetails),
  ]);
}
