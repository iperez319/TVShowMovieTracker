import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchTraktTrendingShowsRequested,
  fetchTraktPopularShowsRequested, fetchTmdbTrendingShowsRequested, fetchTmdbPopularShowsRequested,
} from '../../slices/tvSlice';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {baseImageUrl} from '../../utils/tmdbApi';
import CategoryList from '../../components/CategoryList';
import {useNavigation, useTheme} from '@react-navigation/native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

export default function TVMain() {
  const dispatch = useDispatch();
  const navigator = useNavigation();
  const {colors} = useTheme();
  useEffect(() => {
    dispatch(fetchTmdbTrendingShowsRequested());
    dispatch(fetchTmdbPopularShowsRequested());
  }, []);

  const trendingShows = useSelector((state) => state.tv.trendingShows);
  const popularShows = useSelector((state) => state.tv.popularShows);

  //TODO: Fix shows not loading issue by subscribing to focus event

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" translucent={true} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{padding: 15}}>
        <View>
          <Pressable onPress={() => navigator.navigate('Search')}>
            <View style={styles.searchDiv}>
              <Icon name={'search'} style={styles.icon} />
              <TextInput style={styles.searchBar} value={''} pointerEvents="none" editable={false} placeholder="Stranger Things, Netflix..." placeholderTextColor={'#808080'}/>
            </View>
          </Pressable>
          <CategoryList shows={trendingShows} categoryTitle={'🔥 Trending'} trakt={false}/>
          <CategoryList shows={popularShows} categoryTitle={'Most Popular'} trakt={false}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#201F33',
    // margin: 15,
    // marginBottom: 15,
    height: 50,
    // borderRadius: 10,
    padding: 10,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    width: '100%',
    flex: 1,
  },
  searchDiv: {
    backgroundColor: '#201F33',
    alignItems: 'center',
    flexDirection: 'row',
    // width: '100%',
    flex: 1,
    justifyContent: 'center',
    marginBottom: 30,
    borderRadius: 10,
    overflow: 'hidden',
  },
  icon: {
    fontSize: 25,
    color: '#8588e2',
    marginLeft: 15,
    marginRight: 5,
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
  categoryList: {
    paddingBottom: 20,
  },
});
