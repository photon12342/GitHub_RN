import React, {useState} from 'react';
import {Linking, SafeAreaView, StyleSheet, View} from 'react-native';
import { Input, ConfirmButton, Tips, NavBar } from '../common/LoginComponent';
import Constants from '../expand/dao/Constants';
import LoginDao from '../expand/dao/LoginDao';
import NavigationUtil from '../navigator/NavigationUtil';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default (props: any) => {
  const {navigation} = props;
  const [userName, setUserName] = useState('18115161331');
  const [password, setPassword] = useState('z1c3b5m7');
  const [msg, setMsg] = useState('');
  const [helpUrl, setHelpUrl] = useState('https://api.devio.org/uapi/v2/api-docs');

  const login = () => {
    if(userName === '' || password === '') {
      setMsg('用户名或密码不能为空');
      return;
    }
    setMsg('');
    setHelpUrl('');
    LoginDao.getInstance().login(userName, password).then(res => {
      setMsg('登录成功')
      NavigationUtil.resetToHomePage({ navigation })
    }).catch(e => {
      const {code, data: {helpUrl = ''} = {} , msg} = e;
      setMsg(msg);
      setHelpUrl(helpUrl);
    })
  }
  return (
    <SafeAreaView style={styles.root}>
      <NavBar title="登录" rightTitle="注册" onRightClick={() => {
        // Linking.openURL(Constants.apiDoc)
        NavigationUtil.registration({ navigation });
      }} />
      <View style={styles.line}></View>
      <View style={styles.content}>
        {/* 18115161331 */}
        <Input 
          label="用户名"
          placeholder="请输入用户名"
          shortLine={true}
          value={userName}
          onChangeText={(text: string) => setUserName(text)}
        />
        <Input 
          label="密码"
          placeholder="请输入密码"
          secure={true}
          value={password}
          onChangeText={(text: string) => setPassword(text)}
        />
        <ConfirmButton title="登录" onClick={login} />
        <Tips msg={msg} helpUrl={helpUrl} />
        <View>
          <MaterialIcons name={'whatshot'} size={40} style={{ color: 'red' }} />
        </View>
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