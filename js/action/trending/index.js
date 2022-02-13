/*
* action 创建函数
*/
import types from "../types";
import DataStore, { FLAG_STORAGE } from "../../expand/dao/DataStore";
import { handleData } from "../ActionUtil";
/**
 * 获取最热数据的action
 * @param storeName
 * @returns {function()}
 */
export function onRefreshTrending(storeName, url, pageSize) {
  return dispatch => {
    dispatch({type: types.TRENDING_REFRESH, storeName});
    let dataStore = new DataStore()
    dataStore.fetchData(url, FLAG_STORAGE.flag_trending)
      .then(data => {
        console.log('data', data);
        handleData(types.TRENDING_REFRESH_SUCCESS, dispatch, storeName, data, pageSize)
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: types.TRENDING_REFRESH_FAIL,
          storeName,
          err
        })
      })
  }
}
export function onLoadMoreTrending(storeName, pageIndex, pageSize, dataArray = [], callback) {
  return dispatch => {
    setTimeout(() => {
      if((pageIndex - 1) * pageSize >= dataArray.length) {
        if(typeof callback === 'function') {
          callback('no more')
        }
        dispatch({
          type: types.TRENDING_LOAD_MORE_FAIL,
          error: 'no more',
          storeName,
          pageIndex: --pageIndex,
          projectModes: dataArray
        })
      } else {
        let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex
        dispatch({
          type: types.TRENDING_LOAD_MORE_SUCCESS,
          storeName,
          pageIndex,
          projectModes: dataArray.slice(0, max)
        })
      }
    }, 500)
  }
}
