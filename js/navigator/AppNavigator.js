import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../page/LoginPage';
import HomePage from '../page/HomePage';
import WebViewPage from '../page/WebViewPage';
import DetailPage from '../page/DetailPage';
import SortKeyPage from '../page/SortKeyPage';
import SearchPage from '../page/SearchPage';
import CustomKeyPage from '../page/CustomKeyPage';
import AboutPage from '../page/AboutPage';
import AboutMePage from '../page/AboutMePage';
import CodePushPage from '../page/CodePushPage';
import RegistrationPage from '../page/RegistrationPage';
import WelcomePage from '../page/WelcomePage';

const Stack = createNativeStackNavigator();
// 在这里配置除tab页以外的页面
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="WelcomePage"
          component={WelcomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="LoginPage"
          component={LoginPage}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="RegistrationPage"
          component={RegistrationPage}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="HomePage"
          component={HomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="WebViewPage"
          component={WebViewPage}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="DetailPage"
          component={DetailPage}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="SortKeyPage"
          component={SortKeyPage}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="SearchPage"
          component={SearchPage}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="CustomKeyPage"
          component={CustomKeyPage}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="AboutPage"
          component={AboutPage}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="AboutMePage"
          component={AboutMePage}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="CodePushPage"
          component={CodePushPage}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}