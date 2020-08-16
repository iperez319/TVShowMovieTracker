import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  TextInput,
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTraktSearchResultsRequested} from '../../slices/tvSlice';
import {useNavigation} from '@react-navigation/native';
import {baseImageUrl} from '../../utils/tmdbApi';

export default function TVSearch(props) {
  const dispatch = useDispatch();
  const navigator = useNavigation();
  const searchResults = useSelector((state) => state.tv.searchResults);
  console.log('UPDATE :: ', searchResults);
  const posterSize = 'w300';

  const [searchTerm, setSearchTerm] = useState('');

  const goToDetailPage = (showItem) => {
    navigator.navigate('Detail', showItem);
  };

  useEffect(() => {
    dispatch(fetchTraktSearchResultsRequested({query: searchTerm}));
  }, [searchTerm]);

  const renderGridItem = ({item}) => {
    const show = item.show;
    const posterPath =
      item.images && item.images.posters.length > 0
        ? item.images.posters[0].file_path
        : null;
    const rating = show.rating;
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => goToDetailPage(item)}>
        <View>
          <View>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>{rating.toFixed(1)}</Text>
            </View>
            {posterPath ? (
              <Image
                style={styles.image}
                source={{uri: `${baseImageUrl}${posterSize}${posterPath}`}}
              />
            ) : (
              <View style={styles.imageDiv} />
            )}
          </View>
          <Text style={styles.title} numberOfLines={2}>
            {show.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <View style={{padding: 15}}>
        <FlatList
          data={searchResults}
          stickyHeaderIndices={[0]}
          ListHeaderComponentStyle={{backgroundColor: '#14131C'}}
          ListHeaderComponent={(
            <View style={styles.searchDiv}>
              <Icon name={'search'} style={styles.icon} />
              <TextInput
                style={styles.searchBar}
                placeholderTextColor={'#808080'}
                placeholder="Stranger Things, Netflix..."
                value={searchTerm}
                onChangeText={(text) => {
                  setSearchTerm(text);
                }}
              />
            </View>
          )}
          renderItem={renderGridItem}
          keyExtractor={(item) => item.show.ids.slug}
          numColumns={3}
        />
      </View>
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
  imageDiv: {
    width: 100,
    height: 'auto',
    aspectRatio: 2 / 3,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  image: {
    width: 100,
    height: 'auto',
    aspectRatio: 2 / 3,
    borderRadius: 5,
  },
  item: {
    marginBottom: 10,
    marginRight: 10,
    flex: 1 / 3,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },
  rating: {
    color: 'white',
    fontWeight: '600',
  },
  ratingContainer: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    right: 0,
    margin: 5,
    padding: 5,
    borderRadius: 5,
  },
});
