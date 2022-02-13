import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';

const Tab = createMaterialTopTabNavigator();

function _genTabs({Component, keys, theme, extra = {} = {}}) {
  const tabs = {}
  keys.forEach((item, index) => {
    if(item.checked) {
      tabs[`tab${index}`] = {
        screen: (props) => (<Component {...props} {...extra} tabLabel={item.name} theme={theme} />),
        navigationOptions: {
          title: item.name
        }
      }
    }
  });
  return tabs;
}

export function tabNav({Component, keys, theme, extra = {} = {}}) {
  return (
    <Tab.Navigator screenOptions={{
      lazy: true,
      tabBarItemStyle: styles.tabStyle,
      tabBarScrollEnabled: true,
      tabBarInactiveTintColor: '#fff',
      tabBarActiveTintColor: '#fff',
      tabBarStyle: {
        backgroundColor: theme.themeColor
      },
      tabBarIndicatorStyle: styles.tabBarIndicatorStyle, // 指示器的样式
      tabBarLabelStyle: styles.labelStyle
    }}>
      {
        Object.entries(_genTabs({Component, keys, theme, extra})).map(
          (item) => (
            <Tab.Screen 
              key={item[0]}
              name={item[0]}
              component={item[1].screen}
              options={item[1].navigationOptions}
            />
          )
        )
      }
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabStyle: {
    padding: 0
  },
  tabBarIndicatorStyle: {
    height: 2,
    backgroundColor: '#fff'
  },
  labelStyle: {
    textTransform: 'none',
    fontSize: 13,
    margin: 0
  }
})