import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {baseImageUrl} from '../../utils/tmdbApi';
import ReadMore from 'react-native-view-more-text';
import Icons from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {
  fetchShowSeasonsRequested,
  fetchTmdbShowDetailsRequested,
  fetchTraktSimilarShowsRequested,
} from '../../slices/tvSlice';
import RoundCheckbox from '../../components/RoundCheckbox';
import ProgressBar from '../../components/ProgressBar';
import CategoryList from '../../components/CategoryList';
import Divider from '../../components/Divider';

export default function TVDetailTmdb({route}) {
  const dispatch = useDispatch();
  const navigator = useNavigation();

  // const selectedSeasons = useSelector((state) => state.tv.selectedSeasons);
  // const selectedSimilarShows = useSelector(
  //   (state) => state.tv.selectedSimilarShows,
  // );
  const selectedShowDetails = useSelector(
    (state) => state.tv.selectedShowDetails,
  );

  const {showItem} = route.params;

  // console.log('INSIDE DETAIL :: ', route);
  // console.log('SHOW ITEM :: ', showItem);
  // console.log();

  const backdrop = showItem.backdrop_path || null;
  const poster = showItem.poster_path || null;
  const backdropSize = 'w780';
  const posterSize = 'w185';
  const title = showItem.name || 'Unkown Title';
  const rating = showItem.vote_average || 0;
  const overview = showItem.overview;
  const id = showItem.id;

  const runtime = selectedShowDetails?.episode_run_time || 0;
  const network = selectedShowDetails?.networks[0]?.name;
  const status = selectedShowDetails?.status || '';
  const genres = selectedShowDetails?.genres[0]?.name;
  const seasons = selectedShowDetails?.seasons || [];
  const similarShows = selectedShowDetails?.similar?.results || [];

  const _renderTruncatedFooter = (handlePress) => {
    return (
      <Pressable onPress={handlePress}>
        <Text style={styles.readMore}>Read more</Text>
      </Pressable>
    );
  };

  const _renderRevealedFooter = (handlePress) => {
    return (
      <Pressable onPress={handlePress}>
        <Text style={styles.readMore}>Show less</Text>
      </Pressable>
    );
  };

  const goToSeasonDetails = (season, episodeCount) => {
    navigator.navigate('Season', {season, episodeCount});
  };

  const Dot = () => {
    return <Text style={styles.dot}>·</Text>;
  };

  useEffect(() => {
    const unsubscribe = navigator.addListener('focus', () => {
      dispatch(fetchTmdbShowDetailsRequested({id}));
    });
    return unsubscribe;
  }, [navigator]);

  const [clicked, setClicked] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{padding: 15}}
        contentContainerStyle={{paddingBottom: 100}}>
        <View>
          <View>
            {backdrop ? (
              <Image
                source={{
                  uri: `${baseImageUrl}/${backdropSize}${backdrop}`,
                }}
                style={styles.backdrop}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.backdropDiv} />
            )}
          </View>
          <View style={styles.header}>
            {poster ? (
              <Image
                source={{uri: `${baseImageUrl}/${posterSize}${poster}`}}
                style={styles.poster}
                resizeMode={'cover'}
              />
            ) : (
              <View style={styles.posterDiv} />
            )}

            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.status}>{status}</Text>
            </View>
          </View>
          {selectedShowDetails ?
          <View>
            <ReadMore
              numberOfLines={3}
              renderViewMore={_renderTruncatedFooter}
              renderViewLess={_renderRevealedFooter}>
              <Text style={styles.overview}>{overview}</Text>
            </ReadMore>
            <Divider />
            <View style={styles.statsContainer}>
              <Icons
                name={'star'}
                style={{color: '#ffc600', fontSize: 20, marginRight: 5}}
              />
              <Text style={styles.stats}>{rating}</Text>
              <Dot />
              <Text style={styles.stats}>{genres}</Text>
              <Dot />
              <Text style={styles.stats}>{runtime} min</Text>
              <Dot />
              <Text style={styles.stats}>{network}</Text>
            </View>
            <Divider />
            <View>
              <Text style={{...styles.title, marginBottom: 15}}>Seasons</Text>
              {seasons.map((item, index) => {
                return (
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        goToSeasonDetails(item.number, item.episode_count)
                      }>
                      <View style={styles.seasonItem}>
                        <RoundCheckbox
                          size={30}
                          checked={clicked}
                          onValueChange={() => setClicked(!clicked)}
                          borderColor={'#8588e2'}
                          backgroundColor={'#8588e2'}
                        />
                        <Text style={{...styles.seasonText, marginRight: 10}}>
                          {item.name}
                        </Text>
                        <View style={{flexGrow: 1}}>
                          <ProgressBar width={100} />
                        </View>
                        <Text style={{...styles.seasonText, marginLeft: 10}}>
                          0/{item.episode_count}
                        </Text>
                        <Icons
                          name={'chevron-right'}
                          style={styles.navigateIcon}
                        />
                      </View>
                    </TouchableOpacity>
                    <Divider />
                  </View>
                );
              })}
            </View>
            {similarShows.length > 0 ?
              <CategoryList
                  shows={{results: similarShows}}
                  categoryTitle={'You may also like'}
                  smallSize={true}
                  usePush={true}
                  trakt={false}
              /> : null
            }
          </View> : <ActivityIndicator/>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    width: '100%',
    height: 'auto',
    aspectRatio: 16 / 9,
    borderRadius: 5,
  },
  backdropDiv: {
    width: '100%',
    height: 'auto',
    aspectRatio: 16 / 9,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  poster: {
    width: 'auto',
    height: 120,
    aspectRatio: 2 / 3,
    borderRadius: 5,
    top: -50,
    left: 10,
    // position: 'absolute',
  },
  posterDiv: {
    width: 'auto',
    height: 120,
    aspectRatio: 2 / 3,
    borderRadius: 5,
    top: -50,
    left: 10,
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 'auto',
    marginBottom: -35,
  },
  titleContainer: {
    flex: 1,
    flexGrow: 1,
    paddingLeft: 30,
    paddingTop: 25,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  status: {
    color: 'white',
    fontSize: 17,
  },
  overview: {
    color: 'white',
    fontSize: 15,
  },
  readMore: {
    fontSize: 15,
    color: '#8588e2',
    fontWeight: 'bold',
    marginTop: 10,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stats: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  dot: {
    color: '#8588e2',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 7,
    marginLeft: 7,
  },
  seasonItem: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  seasonText: {
    color: 'white',
    fontSize: 20,
  },
  navigateIcon: {
    color: 'rgba(255,255,255,0.67)',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
