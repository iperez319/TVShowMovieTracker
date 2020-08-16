import React from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {baseImageUrl} from '../../utils/tmdbApi';
import {useNavigation} from '@react-navigation/native';

export default function CategoryList({
  categoryTitle,
  shows,
  trakt = true,
  smallSize = false,
  usePush = false,
}) {
  const imageSize = 'w185';
  const navigator = useNavigation();

  console.log(shows);

  const goToDetailPage = (showItem, trakt = true) => {
    if (usePush) {
      navigator.push(trakt ? 'Detail' : 'Detail_Tmdb', {showItem});
    } else {
      navigator.navigate(trakt ? 'Detail' : 'Detail_Tmdb', {showItem});
    }
  };

  const renderItemTrakt = (item) => {
    let showItem = item.item;
    // console.log('RATING :: ', showItem.rating || showItem.show.rating || null)
    const title = showItem.title || showItem.show.title;
    const rating = showItem.rating || showItem.show.rating || null;
    const poster = showItem?.images?.posters[0]?.file_path;

    return (
      <TouchableOpacity onPress={() => goToDetailPage(showItem)}>
        <View style={styles.showItem}>
          {showItem.images ? (
            <View>
              {rating ? (
                <View
                  style={
                    smallSize
                      ? styles.smallRatingContainer
                      : styles.ratingContainer
                  }>
                  <Text style={styles.rating}>{rating ? rating.toFixed(1) : 0}</Text>
                </View>
              ) : null}
              {
                poster
                  ? <Image
                        source={{
                          uri: `${baseImageUrl}/${imageSize}${showItem.images.posters[0].file_path}`,
                        }}
                        style={smallSize ? styles.smallShowImage : styles.showImage}
                    />
                    : <View style={smallSize ? styles.smallEmptyImage : styles.emptyImage}/>
              }

            </View>
          ) : (
            <View style={styles.emptyImage} />
          )}
          <Text style={styles.showTitle} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItemTmdb = (item) => {
    let showItem = item.item;
    // console.log('RATING :: ', showItem.rating || showItem.show.rating || null)
    const title = showItem.name || "Unkown Title";
    const rating = showItem.vote_average || 0;
    const poster = showItem.poster_path || null;

    return (
      <TouchableOpacity onPress={() => goToDetailPage(showItem, false)}>
        <View style={styles.showItem}>
          {title ? (
              <View>
                {rating ? (
                  <View
                      style={
                        smallSize
                            ? styles.smallRatingContainer
                            : styles.ratingContainer
                      }>
                    <Text style={styles.rating}>{rating ? rating.toFixed(1) : 0}</Text>
                  </View>
                ) : null}
                {poster !== null
                      ? <Image
                  source={{
                    uri: `${baseImageUrl}/${imageSize}${poster}`,
                  }}
                  style={smallSize ? styles.smallShowImage : styles.showImage} />
                    : <View style={smallSize ? styles.smallEmptyImage : styles.emptyImage}/>
                }
              </View>
          ) : (<View style={styles.emptyImage} />)}
          <Text style={styles.showTitle} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={smallSize ? styles.smallHeader : styles.header}>
        {categoryTitle}
      </Text>
      <FlatList
        data={trakt ? shows : shows.results}
        keyExtractor={(item) => trakt ? (item.ids || item.show.ids).slug : item.id.toString()}
        renderItem={trakt ? renderItemTrakt : renderItemTmdb}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
  emptyImage: {
    width: 90,
    height: 135,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  smallEmptyImage: {
    width: 80,
    height: 120,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  showImage: {
    width: 90,
    height: 135,
    borderRadius: 5,
  },
  smallShowImage: {
    width: 80,
    height: 120,
    borderRadius: 5,
  },
  showTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
    width: 90,
    overflow: 'hidden',
    textAlign: 'center',
    marginTop: 5,
  },
  showItem: {
    marginRight: 15,
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
  smallRatingContainer: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    right: 10,
    margin: 5,
    padding: 5,
    borderRadius: 5,
  },
  rating: {
    color: 'white',
    fontWeight: '600',
  },
  smallHeader: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
});
