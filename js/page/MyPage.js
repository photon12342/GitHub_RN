import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import { connect } from 'react-redux';
import action from '../action';
import NavigationUtil from '../navigator/NavigationUtil';

class MyPage extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text>MyPage</Text>
        <Button title="改变主题" onPress={() => {
          this.props.onThemeChange({
            themeColor: '#99ddff'
          })
        }} />
        <Button title="去登录" onPress={() => {
          NavigationUtil.goPage({navigation}, 'LoginPage');
        }} />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onThemeChange: (theme) => dispatch(action.onThemeChange(theme))
})

export default connect(null, mapDispatchToProps)(MyPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});