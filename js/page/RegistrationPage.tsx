import React, {useState} from 'react';
import {Linking, SafeAreaView, StyleSheet, View} from 'react-native';
import { Input, ConfirmButton, Tips, NavBar } from '../common/LoginComponent';
import Constants from '../expand/dao/Constants';
import LoginDao from '../expand/dao/LoginDao';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavigationUtil from '../navigator/NavigationUtil';

export default (props: any) => {
  const {navigation} = props
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [helpUrl, setHelpUrl] = useState('https://api.devio.org/uapi/v2/api-docs');
  const register = () => {
    if(userName === '' || password === '') {
      setMsg('用户名或密码不能为空');
      return;
    }
    console.log('注册');
    
  }
  return (
    <SafeAreaView style={styles.root}>
      <NavBar title="注册" rightTitle="登录" onRightClick={() => {
        NavigationUtil.goPage({navigation}, 'LoginPage');
      }} />
      <View style={styles.line}></View>
      <View style={styles.content}>
        <Input 
          label="用户名"
          placeholder="请输入用户名"
          shortLine={true}
          onChangeText={(text: string) => setUserName(text)}
        />
        <Input 
          label="密码"
          placeholder="请输入密码"
          secure={true}
          onChangeText={(text: string) => setPassword(text)}
        />
        <ConfirmButton title="注册" onClick={register} />
        <Tips msg={msg} helpUrl={helpUrl} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    backgroundColor: '#f1f5f6',
    flexGrow: 1,
    paddingTop: 20
  },
  line: {
    height: 0.5,
    backgroundColor: '#d0d4d4'
  }
});