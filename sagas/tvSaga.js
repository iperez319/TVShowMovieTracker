import {put, call, takeLatest, takeEvery, delay} from 'redux-saga/effects';
import {
  fetchTraktTrendingShowsRequested,
  fetchTrendingShowsSucceeded,
  fetchShowImageRequested,
  fetchShowImageSucceeded,
  fetchTraktPopularShowsRequested,
  fetchPopularShowsSucceeded,
  fetchShowSeasonsSucceeded,
  fetchShowSeasonsRequested,
  fetchTraktSimilarShowsRequested,
  fetchSimilarShowsSucceeded,
  fetchShowSeasonDetailsRequested,
  fetchShowSeasonDetailsSucceeded,
  fetchEpisodeImageSucceeded,
  fetchEpisodeImageRequested,
  fetchTraktSearchResultsRequested,
  fetchSearchResultsSucceeded,
  fetchTmdbPopularShowsRequested,
  fetchTmdbTrendingShowsRequested, fetchTmdbShowDetailsSucceeded, fetchTmdbShowDetailsRequested,
} from '../slices/tvSlice';
import {getTrakt} from '../utils/traktApi';
import {getTmdb} from '../utils/tmdbApi';

function* fetchTraktTrendingShows() {
  try {
    const response = yield call(getTrakt, '/shows/trending', {
      extended: 'full',
    });
    yield put(fetchTrendingShowsSucceeded(response.data));
    for (let i = 0; i < response.data.length; i++) {
      yield put(
        fetchShowImageRequested({
          showItem: response.data[i],
          index: i,
          type: 'trending',
        }),
      );
    }
  } catch (error) {
    console.log('FETCH SHOW FAILED');
    console.log(error);
  }
}

export function* watchFetchTraktTrendingShows() {
  yield takeLatest(
    fetchTraktTrendingShowsRequested.toString(),
    fetchTraktTrendingShows,
  );
}

function* fetchTraktPopularShows() {
  try {
    const response = yield call(getTrakt, '/shows/popular', {extended: 'full'});
    console.log(response.data);
    yield put(fetchPopularShowsSucceeded(response.data));
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i] !== undefined) {
        yield put(
          fetchShowImageRequested({
            showItem: response.data[i],
            index: i,
            type: 'popular',
          }),
        );
      }
    }
  } catch (error) {
    console.log('FETCH SHOW FAILED');
    console.log(error);
  }
}

export function* watchFetchTraktPopularShows() {
  yield takeLatest(
    fetchTraktPopularShowsRequested.toString(),
    fetchTraktPopularShows,
  );
}

function* fetchShowImage(action) {
  try {
    let {showItem, index, type} = action.payload;
    const tmdb = (showItem.ids || showItem.show.ids).tmdb;
    if (!tmdb) {
      return;
    }
    let response = yield call(getTmdb, `/tv/${tmdb}/images`, {language: 'en'});
    yield put(fetchShowImageSucceeded({index, type, response: response.data}));
  } catch (error) {
    console.log('Fetching Show Image failed');
    console.log(error);
  }
}

export function* watchFetchShowImage() {
  yield takeEvery(fetchShowImageRequested.toString(), fetchShowImage);
}

function* fetchShowSeasons(action) {
  const {slug} = action.payload;
  try {
    const response = yield call(getTrakt, `/shows/${slug}/seasons`, {
      extended: 'full',
    });
    yield put(fetchShowSeasonsSucceeded(response.data));
  } catch (error) {
    console.log('ERROR FETCHING SEASONS');
  }
}

export function* watchFetchShowSeasons() {
  yield takeLatest(fetchShowSeasonsRequested.toString(), fetchShowSeasons);
}

function* fetchTraktSimilarShows(action) {
  const {slug} = action.payload;
  try {
    const response = yield call(getTrakt, `/shows/${slug}/related`, {
      extended: 'full',
    });
    yield put(fetchSimilarShowsSucceeded(response.data));
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i] !== undefined) {
        yield put(
          fetchShowImageRequested({
            showItem: response.data[i],
            index: i,
            type: 'similar',
          }),
        );
      }
    }
  } catch (error) {
    console.log('ERROR FETCHING RELATED SHOWS');
    console.log(error);
  }
}

export function* watchFetchTraktSimilarShows() {
  yield takeLatest(
    fetchTraktSimilarShowsRequested.toString(),
    fetchTraktSimilarShows,
  );
}

function* fetchShowSeasonDetails(action) {
  const {season, slug} = action.payload;
  try {
    const response = yield call(getTrakt, `/shows/${slug}/seasons/${season}`, {
      extended: 'full',
    });
    yield put(fetchShowSeasonDetailsSucceeded(response.data));
  } catch (error) {
    console.log('ERROR GETTING SEASON DETAILS');
  }
}

export function* watchFetchShowSeasonDetails(action) {
  yield takeLatest(
    fetchShowSeasonDetailsRequested.toString(),
    fetchShowSeasonDetails,
  );
}

function* fetchEpisodeImage(action) {
  try {
    let {tmdb, season, episode, index} = action.payload;
    let response = yield call(
      getTmdb,
      `/tv/${tmdb}/season/${season}/episode/${episode}/images`,
    );
    yield put(fetchEpisodeImageSucceeded({index, response: response.data}));
  } catch (error) {
    console.log('Fetching Show Image failed');
    console.log(error);
  }
}

export function* watchFetchEpisodeImage() {
  yield takeEvery(fetchEpisodeImageRequested.toString(), fetchEpisodeImage);
}

function* fetchTraktSearchResults(action) {
  yield delay(300);
  const {query} = action.payload;
  console.log('Searching for :: ', query);
  try {
    let response = yield call(getTrakt, '/search/show', {
      query,
      fields: 'title',
      extended: 'full',
    });
    yield put(fetchSearchResultsSucceeded(response.data));
    for (let i = 0; i < response.data.length; i++) {
      yield put(
        fetchShowImageRequested({
          showItem: response.data[i],
          index: i,
          type: 'search',
        }),
      );
    }
  } catch (error) {
    console.log(error);
    console.log('ERROR FETCHING SEARCH RESULTS');
  }
}

export function* watchFetchTraktSearchResults() {
  yield takeLatest(
    fetchTraktSearchResultsRequested.toString(),
    fetchTraktSearchResults,
  );
}

function* fetchTmdbPopularShows() {
  try {
    const response = yield call(getTmdb, '/tv/popular', {});
    yield put(fetchPopularShowsSucceeded(response.data));
  } catch (error) {
    console.log('ERROR FETCHING POPULAR SHOWS TMDB', error);
  }
}

export function* watchFetchTmdbPopularShows() {
  yield takeLatest(
    fetchTmdbPopularShowsRequested.toString(),
    fetchTmdbPopularShows,
  );
}

function* fetchTmdbTrendingShows() {
  try {
    const response = yield call(getTmdb, '/trending/tv/day', {});
    yield put(fetchTrendingShowsSucceeded(response.data));
  } catch (error) {
    console.log('ERROR FETCHING TRENDING SHOWS TMDB', error);
  }
}

export function* watchFetchTmdbTrendingShows() {
  yield takeLatest(
    fetchTmdbTrendingShowsRequested.toString(),
    fetchTmdbTrendingShows,
  );
}

function* fetchTmdbShowDetails(action) {
  const {id} = action.payload;
  try {
    const response = yield call(getTmdb, `/tv/${id}`, {append_to_response: 'similar'});
    yield put(fetchTmdbShowDetailsSucceeded(response.data));
  } catch (error) {
    console.log('ERROR FETCHING SHOW DETAILS TMDB', error);
  }
}

export function* watchFetchTmdbShowDetails() {
  yield takeLatest(
    fetchTmdbShowDetailsRequested.toString(),
    fetchTmdbShowDetails,
  );
}

// function* fetchTraktSearchResults(action) {
//   yield delay(300);
//   const {query} = action.payload;
//   console.log('Searching for :: ', query);
//   try {
//     let response = yield call(getTrakt, '/search/show', {
//       query,
//       fields: 'title',
//       extended: 'full',
//     });
//     yield put(fetchSearchResultsSucceeded(response.data));
//     for (let i = 0; i < response.data.length; i++) {
//       yield put(
//           fetchShowImageRequested({
//             showItem: response.data[i],
//             index: i,
//             type: 'search',
//           }),
//       );
//     }
//   } catch (error) {
//     console.log(error);
//     console.log('ERROR FETCHING SEARCH RESULTS');
//   }
// }
//
// export function* watchFetchTraktSearchResults() {
//   yield takeLatest(
//       fetchTraktSearchResultsRequested.toString(),
//       fetchTraktSearchResults,
//   );
// }
