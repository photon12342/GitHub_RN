import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, DeviceInfo } from 'react-native'
import NavigationBar from 'react-native-navbar-plus'
import { WebView } from 'react-native-webview'
import ViewUtil from '../util/ViewUtil'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationUtil from '../navigator/NavigationUtil'
const TRENDING_URL = 'https://github.com/'

console.log('DeviceInfo', DeviceInfo.isIPhoneX_deprecated);
export default class Index extends Component {
  constructor(props) {
    super(props)
    console.log(this.props)
    // this.params = this.props.navigation.state.params;
    this.params = this.props.route.params
    const { projectModel } = this.params
    this.url = projectModel.html_url || TRENDING_URL + projectModel.fullName
    const title = projectModel.full_name || projectModel.fullName
    this.state = {
      title,
      url: this.url,
      canGoBack: false,
    }
  }
  onBack() {
    if(this.state.canGoBack) {
      this.WebView.goBack()
    } else {
      NavigationUtil.goBack(this.props.navigation)
    }
  }
  renderRightButton() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity>
          <FontAwesome
            name="star-o"
            size={20}
            style={{ color: '#fff', marginRight: 10 }}
          />
        </TouchableOpacity>
        {ViewUtil.getShareButton(() => {})}
      </View>
    )
  }
  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
      url: navState.url
    })
  }
  render() {
    const titleLayoutStyle = this.state.title.length > 20 ? {paddingRight: 30} : null;
    return (
      <View style={styles.container}>
        <NavigationBar
          leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
          title={this.state.title}
          titleLayoutStyle={titleLayoutStyle}
          style={{ backgroundColor: '#678', paddingTop: 30 }}
          rightButton={this.renderRightButton()}
        />
        <WebView
          ref={webView => this.webView = webView}
          source={{ uri: this.state.url }}
          startInLoadingState={true}
          onNavigationStateChange={e => this.onNavigationStateChange(e)}
        />
        <Text>最热</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
