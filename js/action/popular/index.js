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
export function onRefreshPopular(storeName, url, pageSize) {
  return dispatch => {
    dispatch({type: types.POPULAR_REFRESH, storeName});
    let dataStore = new DataStore()
    dataStore.fetchData(url, FLAG_STORAGE.flag_popular)
      .then(data => {
        handleData(types.POPULAR_REFRESH_SUCCESS, dispatch, storeName, data, pageSize)
      })
      .catch(err => {
        dispatch({
          type: types.POPULAR_REFRESH_FAIL,
          storeName,
          err
        })
      })
  }
}
export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], callback) {
  return dispatch => {
    setTimeout(() => {
      if((pageIndex - 1) * pageSize >= dataArray.length) {
        if(typeof callback === 'function') {
          callback('no more')
        }
        dispatch({
          type: types.POPULAR_LOAD_MORE_FAIL,
          error: 'no more',
          storeName,
          pageIndex: --pageIndex,
          projectModes: dataArray
        })
      } else {
        let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex
        dispatch({
          type: types.POPULAR_LOAD_MORE_SUCCESS,
          storeName,
          pageIndex,
          projectModes: dataArray.slice(0, max)
        })
      }
    }, 500)
  }
}