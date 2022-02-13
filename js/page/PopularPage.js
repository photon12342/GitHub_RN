import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, ActivityIndicator, View, Button, RefreshControl} from 'react-native';
import { connect } from 'react-redux';
import { tabNav } from '../navigator/NavigationDelegate';
import NavigationBar from 'react-native-navbar-plus'
import keys from '../res/data/keys.json'
import action from '../action';
import PopularItem from '../common/PopularItem';
import NavigationUtil from '../navigator/NavigationUtil';


const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const pageSize = 10;

class PopularPage extends Component {
  render() {
    const {theme} = this.props;
    let navigationBar = <NavigationBar title="最热" />
    const TabNavigator = keys.length ? 
    tabNav({Component: PopularTabPage, theme: {themeColor: '#2196F3'}, keys}) : null
    return (
      <View style={styles.container}>
        {navigationBar}
        {TabNavigator}
      </View>
    );
  }
}

class PopularTab extends Component {
  constructor(props) {
    super(props);
    const {tabLabel} = this.props;
    this.storeName = tabLabel;
  }
  componentDidMount() {
    this.loadData()
  }
  loadData(loadMore) {
    const {onRefreshPopular, onLoadMorePopular} = this.props;
    const store = this._store();
    const url = this.genFetchUrl(this.storeName);
    if(loadMore) {
      onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {
        console.log('弹出toast提示');
      })
    } else {
      onRefreshPopular(this.storeName, url, pageSize)
    }
  }
  _store() {
    const {popular} = this.props;
    let store = popular[this.storeName];
    if(!store) {
      store = {
        items: [],
        isLoading: false,
        projectModes: [],
        hideLoadingMore: true
      }
    }
    return store
  }
  genFetchUrl(key) {
    return URL + key + QUERY_STR;
  }
  renderItem(data) {
    const item = data.item
    return <PopularItem 
      item={item}
      onSelect={() => {
        NavigationUtil.goPage({
          projectModel: item,
        }, 'DetailPage')
      }}
    />
  }
  genIndicator() {
    return this._store().hideLoadingMore ? null : (
      <View style={{alignItems: 'center'}}>
        <ActivityIndicator 
          style={{color: 'red', margin: 10}}
        />
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
          keyExtractor={item => "" + item.id}
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
              if(this.canLoadMore) {
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

const mapStateToProps = (state) => ({
  popular: state.popular,
})
// 将dispatch映射给onThemeChange，然后注入到组件的props中
const mapDispatchToProps = (dispatch) => ({
  onRefreshPopular: (storeName, url, pageSize) => dispatch(action.onRefreshPopular(storeName, url, pageSize)),
  onLoadMorePopular: (storeName, pageIndex, pageSize, items, callback) => dispatch(action.onLoadMorePopular(storeName, pageIndex, pageSize, items, callback))
})
// 包装 component，注入 dispatch到PopularTab
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);

export default PopularPage;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});