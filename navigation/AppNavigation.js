import React from 'react';
import {Text, TouchableOpacity, Image, StatusBar, View} from 'react-native';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import Icon from 'react-native-vector-icons/Feather';
import TVMain from '../screens/TV';
import MoviesMain from '../screens/Movies';
import WatchlistMain from '../screens/Watchlist';
import CalendarMain from '../screens/Calendar';
import {createStackNavigator} from '@react-navigation/stack';
import TVDetail from '../screens/TV/detail';
import TVSeasonDetail from '../screens/TV/seasonDetail';
import TVSearch from '../screens/TV/search';
import TVDetailTmdb from '../screens/TV/detail_tmdb';

const Tabs = AnimatedTabBarNavigator();

const TabBarIcon = (props) => {
  return (
    <Icon
      name={props.name}
      size={props.size ? props.size : 24}
      color={props.tintColor}
    />
  );
};

const TVNavigator = createStackNavigator();

const TVTabs = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: '#8588e2',
        inactiveTintColor: '#8588e2',
        activeBackgroundColor: 'rgba(63,66,127,0.7)',
        labelStyle: {
          fontWeight: 'bold',
        },
      }}
      appearence={{
        tabBarBackground: '#201F33',
      }}
      initialRouteName="TV">
      <Tabs.Screen
        name="TV"
        component={TVMain}
        options={{
          tabBarIcon: ({focused, color}) => (
            <TabBarIcon focused={focused} tintColor={color} name="tv" />
          ),
        }}
      />
      <Tabs.Screen
        name="Movies"
        component={MoviesMain}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <TabBarIcon focused={focused} tintColor={color} name="film" />
          ),
        }}
      />

      <Tabs.Screen
        name="Watchlist"
        component={WatchlistMain}
        options={{
          tabBarIcon: ({focused, color}) => (
            <TabBarIcon focused={focused} tintColor={color} name="list" />
          ),
        }}
      />
      <Tabs.Screen
        name="Calendar"
        component={CalendarMain}
        options={{
          tabBarIcon: ({focused, color}) => (
            <TabBarIcon focused={focused} tintColor={color} name="calendar" />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

// const TVStack = () => {
//     return (
//         <TVNavigator.Navigator
//             screenOptions={{
//                 headerStyle: {
//                     backgroundColor: '#14131C',
//                     shadowColor: 'transparent',
//                 },
//                 headerTintColor: '#fff',
//                 headerTitleStyle: {
//                     fontWeight: 'bold',
//                 },
//             }}>
//             <TVNavigator.Screen name="TV" component={TVMain} />
//             <TVNavigator.Screen name="Detail" component={TVDetail} />
//             <TVNavigator.Screen name="Season" component={TVSeasonDetail} options={({route}) => ({title: `Season ${route.params.season}`})}/>
//         </TVNavigator.Navigator>
//     );
// };

export default () => (
  <TVNavigator.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#14131C',
        shadowColor: 'transparent',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <TVNavigator.Screen name={'Home'} component={TVTabs} />
    <TVNavigator.Screen name={'Detail'} component={TVDetail} />
    <TVNavigator.Screen
      name="Season"
      component={TVSeasonDetail}
      options={({route}) => ({title: `Season ${route.params.season}`})}
    />
    <TVNavigator.Screen name={'Search'} component={TVSearch} />
    <TVNavigator.Screen name={'Detail_Tmdb'} component={TVDetailTmdb} options={() => ({title: 'Detail'})}/>
  </TVNavigator.Navigator>
);

// export default () => (
//     <Tabs.Navigator
//         tabBarOptions={{
//             activeTintColor: '#8588e2',
//             inactiveTintColor: '#8588e2',
//             activeBackgroundColor: 'rgba(63,66,127,0.7)',
//             labelStyle: {
//                 fontWeight: 'bold',
//             },
//         }}
//         appearence={{
//             tabBarBackground: '#201F33',
//         }}
//         initialRouteName="TV">
//         <Tabs.Screen
//             name="TV"
//             component={TVStack}
//             options={{
//                 tabBarIcon: ({focused, color}) => (
//                     <TabBarIcon focused={focused} tintColor={color} name="tv" />
//                 ),
//             }}
//         />
//         <Tabs.Screen
//             name="Movies"
//             component={MoviesMain}
//             options={{
//                 tabBarIcon: ({focused, color, size}) => (
//                     <TabBarIcon focused={focused} tintColor={color} name="film" />
//                 ),
//             }}
//         />
//
//         <Tabs.Screen
//             name="Watchlist"
//             component={WatchlistMain}
//             options={{
//                 tabBarIcon: ({focused, color}) => (
//                     <TabBarIcon focused={focused} tintColor={color} name="list" />
//                 ),
//             }}
//         />
//         <Tabs.Screen
//             name="Calendar"
//             component={CalendarMain}
//             options={{
//                 tabBarIcon: ({focused, color}) => (
//                     <TabBarIcon focused={focused} tintColor={color} name="calendar" />
//                 ),
//             }}
//         />
//     </Tabs.Navigator>
// );
