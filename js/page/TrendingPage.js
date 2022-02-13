import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  Button,
  RefreshControl,
} from 'react-native'
import { connect } from 'react-redux'
import { tabNav } from '../navigator/NavigationDelegate'
import NavigationBar from 'react-native-navbar-plus'
import keys from '../res/data/langs.json'
import action from '../action'
import TrendingItem from '../common/TrendingItem'
import NavigationUtil from '../navigator/NavigationUtil'

const URL = 'https://github.com/trending/'
const pageSize = 10

class TrendingPage extends Component {
  _tabNav() {
    const { theme } = this.props
    if (theme !== this.theme || !this.tabNav) {
      this.theme = theme
      this.tabNav = tabNav({
        Component: TrendingTabPage,
        theme: {
          themeColor:  '#2196F3'
        },
        keys,
      })
    }
    return this.tabNav
  }
  render() {
    const { theme } = this.props
    let statusBar = {
      backgroundColor: '#2196F3',
      barStyle: 'light-content',
    }
    let navigationBar = (
      <NavigationBar title="趋势" statusBar={statusBar} style={{backgroundColor: '#2196F3'}} />
    )
    const TabNavigator = keys.length
      ? this._tabNav()
      : null
    return (
      <View style={styles.container}>
        {navigationBar}
        {TabNavigator}
      </View>
    )
  }
}

class TrendingTab extends Component {
  constructor(props) {
    super(props)
    const { tabLabel } = this.props
    this.storeName = tabLabel
  }
  componentDidMount() {
    this.loadData()
  }
  loadData(loadMore) {
    const { onRefreshTrending, onLoadMoreTrending } = this.props
    const store = this._store()
    const url = this.genFetchUrl(this.storeName)
    if (loadMore) {
      onLoadMoreTrending(
        this.storeName,
        ++store.pageIndex,
        pageSize,
        store.items,
        callback => {
          console.log('弹出toast提示')
        }
      )
    } else {
      onRefreshTrending(this.storeName, url, pageSize)
    }
  }
  _store() {
    const { trending } = this.props
    let store = trending[this.storeName]
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        projectModes: [],
        hideLoadingMore: true,
      }
    }
    return store
  }
  genFetchUrl(key) {
    return URL + key + '?since=daily';
  }
  renderItem(data) {
    const item = data.item
    return <TrendingItem item={item} onSelect={() => {
      NavigationUtil.goPage({
        projectModel: item,
      }, 'DetailPage')
    }} />
  }
  genIndicator() {
    return this._store().hideLoadingMore ? null : (
      <View style={{ alignItems: 'center' }}>
        <ActivityIndicator style={{ color: 'red', margin: 10 }} />
        <Text>正在加载更多</Text>
      </View>
    )
  }
  render() {
    let store = this._store()
    return (
      <View>
        <FlatList
          data={store.projectModes}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => '' + (item.id || item.fullName)}
          refreshControl={
            <RefreshControl
              title="Loading"
              titleColor="red"
              colors={['red']}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            setTimeout(() => {
              if (this.canLoadMore) {
                this.loadData(true)
                this.canLoadMore = false
              }
            }, 1000)
          }}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            this.canLoadMore = true
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  trending: state.trending,
})
// 将dispatch映射给onThemeChange，然后注入到组件的props中
const mapDispatchToProps = dispatch => ({
  onRefreshTrending: (storeName, url, pageSize) =>
    dispatch(action.onRefreshTrending(storeName, url, pageSize)),
  onLoadMoreTrending: (storeName, pageIndex, pageSize, items, callback) =>
    dispatch(
      action.onLoadMoreTrending(storeName, pageIndex, pageSize, items, callback)
    ),
})
// 包装 component，注入 dispatch到TrendingTab
const TrendingTabPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendingTab)

export default TrendingPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
