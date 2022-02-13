import React, {Component} from 'react';
import { connect } from 'react-redux';
import NavigationUtil from '../navigator/NavigationUtil';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import SafeAreaViewPlus from 'react-native-safe-area-plus';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const themeColor = this.props.theme.themeColor || this.props.theme
    // 方便其他页面跳转的时候不传navigation
    NavigationUtil.navigation = this.props.navigation;
    return (
      <SafeAreaViewPlus topColor={themeColor}>
        <DynamicTabNavigator />
      </SafeAreaViewPlus>
    )
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme
})

export default connect(mapStateToProps)(HomePage);
