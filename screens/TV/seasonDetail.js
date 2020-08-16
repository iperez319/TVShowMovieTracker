import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchShowSeasonDetailsRequested,
  clearShowSeasonDetails,
  fetchEpisodeImageRequested,
} from '../../slices/tvSlice';
import RoundCheckbox from '../../components/RoundCheckbox';
import Checkbox from '../../components/Checkbox';
import Divider from '../../components/Divider';
import ReadMore from 'react-native-view-more-text';
import {SwipeablePanel} from '../../components/SlidingPanel';
import {baseImageUrl} from '../../utils/tmdbApi';

export default function TVSeasonDetail(props) {
  const dispatch = useDispatch();
  const {episodeCount, season, slug, tmdb} = props.route.params;

  const [clicked, setClicked] = useState(false);
  const [panelActive, setPanelActive] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [overviewHeight, setOverviewHeight] = useState(0);

  const stillSize = 'w300';
  const panelProps = {
    fullWidth: true,
    onlySmall: true,
    showCloseButton: false,
    onClose: () => setPanelActive(false),
    onPressCloseButton: () => setPanelActive(false),
    noBar: true,
    closeOnTouchOutside: true,
  };

  useEffect(() => {
    dispatch(fetchShowSeasonDetailsRequested({season, slug}));

    // return function cleanup() { TODO: ENABLE THIS
    //   dispatch(clearShowSeasonDetails());
    // };
  }, []);

  const seasonDetails = useSelector((state) => state.tv.selectedSeason);
  const stillPath =
    selectedEpisode &&
    seasonDetails[selectedEpisode].images &&
    seasonDetails[selectedEpisode].images.stills.length > 0
      ? seasonDetails[selectedEpisode].images.stills[0].file_path
      : null;
  const dateOptions = {year: 'numeric', month: 'short', day: 'numeric'};

  const generateSeasonText = (season, episode) => {
    let seasonStr = season.toString();
    let episodeStr = episode.toString();
    if (seasonStr.length == 1) {
      seasonStr = '0' + seasonStr;
    }
    if (episodeStr.length == 1) {
      episodeStr = '0' + episodeStr;
    }
    return 'S' + seasonStr + 'E' + episodeStr;
  };

  const showEpisodeDetails = (item, index) => {
    setSelectedEpisode(index);
    dispatch(
      fetchEpisodeImageRequested({
        tmdb,
        season: item.season,
        episode: item.number,
        index,
      }),
    );
    setPanelActive(true);
  };

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

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{padding: 15}}
        contentContainerStyle={{paddingBottom: 100}}>
        <View>
          <View style={styles.headerContainer}>
            <View style={{flexGrow: 1}}>
              <ProgressBar width={40} />
            </View>
            <Text style={styles.episodeCount}>0/{episodeCount}</Text>
          </View>

          {!seasonDetails ? (
            <ActivityIndicator />
          ) : (
            <View>
              {seasonDetails.map((item, index) => {
                return (
                  <View key={item.ids.trakt}>
                    <TouchableOpacity
                      onPress={() => showEpisodeDetails(item, index)}>
                      <View style={styles.episodeContainer}>
                        <View style={styles.episodeInfoContainer}>
                          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                          <Text style={styles.info}>
                            {generateSeasonText(item.season, item.number)} ·{' '}
                            {item.first_aired
                              ? new Date(item.first_aired).toLocaleDateString(
                                  undefined,
                                  dateOptions,
                                )
                              : 'Date Unkown'}
                          </Text>
                        </View>
                        <RoundCheckbox
                          size={30}
                          checked={clicked}
                          onValueChange={() => setClicked(!clicked)}
                          borderColor={'#8588e2'}
                          backgroundColor={'#8588e2'}
                        />
                      </View>
                      <Divider />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
      {selectedEpisode ? (
        <SwipeablePanel
          {...panelProps}
          isActive={panelActive}
          expandedSize={overviewHeight}
          style={styles.panel}>
          {stillPath ? (
            <Image
              source={{
                uri: `${baseImageUrl}${stillSize}${stillPath}`,
              }}
              style={styles.episodeImage}
            />
          ) : (
            <View style={styles.episodeImageDiv} />
          )}
          <View style={styles.episodeContainer}>
            <View style={styles.episodeInfoContainer}>
              <Text style={styles.titleDetail}>
                {generateSeasonText(
                  seasonDetails[selectedEpisode].season,
                  seasonDetails[selectedEpisode].number,
                )}{' '}
              </Text>
              <Text style={styles.infoDetail}>
                {seasonDetails[selectedEpisode].title}
              </Text>
            </View>
            <Checkbox
              size={40}
              checked={clicked}
              onValueChange={() => setClicked(!clicked)}
              borderColor={'#8588e2'}
              backgroundColor={'#8588e2'}
            />
          </View>
          <View
            onLayout={(event) =>
              setOverviewHeight(event.nativeEvent.layout.height)
            }>
            <ReadMore
              numberOfLines={3}
              renderViewMore={_renderTruncatedFooter}
              renderViewLess={_renderRevealedFooter}>
              <Text style={styles.overview}>
                {seasonDetails[selectedEpisode].overview}
              </Text>
            </ReadMore>
          </View>
        </SwipeablePanel>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  episodeImageDiv: {
    backgroundColor: 'white',
    aspectRatio: 16 / 9,
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
  },
  episodeImage: {
    aspectRatio: 16 / 9,
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
  },
  headerContainer: {
    marginTop: 15,
    marginBottom: 25,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  episodeCount: {
    color: 'rgb(92,92,92)',
    marginLeft: 15,
    marginRight: 5,
    fontSize: 17,
    fontWeight: '700',
  },
  episodeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  episodeInfoContainer: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  titleDetail: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    // marginBottom: 2,
  },
  infoDetail: {
    color: 'white',
    fontSize: 15,
  },
  info: {
    color: 'white',
    fontSize: 17,
  },
  panel: {
    backgroundColor: 'rgb(52, 52, 52)',
    padding: 15,
    alignSelf: 'flex-start',
  },
  readMore: {
    fontSize: 15,
    color: '#8588e2',
    fontWeight: 'bold',
    marginTop: 10,
  },
  overview: {
    color: 'white',
    fontSize: 17,
  },
});
