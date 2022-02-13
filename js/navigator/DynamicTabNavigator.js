import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { Component } from 'react';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';

import PopularPage from '../page/PopularPage';
import FavoritePage from '../page/FavoritePage';
import TrendingPage from '../page/TrendingPage';
import MyPage from '../page/MyPage';

const Tab = createBottomTabNavigator();
const TABS = {
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: '最热',
      headerShown: false,
      tabBarIcon: ({color, focus}) => (
        <MaterialIcons name={'whatshot'} size={26} style={{ color }} />
      )
    }
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: '趋势',
      headerShown: false,
      tabBarIcon: ({color, focus}) => (
        <Ionicons name={'md-trending-up'} size={26} style={{ color }} />
      )
    }
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: '收藏',
      headerShown: false,
      tabBarIcon: ({color, focus}) => (
        <MaterialIcons name={'favorite'} size={26} style={{ color }} />
      )
    }
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: '我的',
      headerShown: false,
      tabBarIcon: ({color, focus}) => (
        <Entypo name={'user'} size={26} style={{ color }} />
      )
    }
  },
}

class DynamicTabNavigator extends Component {
  _tabNavigator() {
    const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS;
    const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage}; // 可以自动义显示哪些导航
    const themeColor = this.props.theme.themeColor || this.props.theme;
    return (
      <Tab.Navigator>
        {
          Object.entries(tabs).map(item => {
            return (
              <Tab.Screen 
                key={item[0]}
                name={item[0]}
                component={item[1].screen}
                options={{
                  ...item[1].navigationOptions,
                  tabBarActiveTintColor: themeColor
                }}
              />
            )
          })
        }
      </Tab.Navigator>
    )
  }
  render() {
    const Tab = this._tabNavigator()
    return Tab;
  }
}
const mapStateToProps = (state) => ({
  theme: state.theme.theme
})

export default connect(mapStateToProps)(DynamicTabNavigator);