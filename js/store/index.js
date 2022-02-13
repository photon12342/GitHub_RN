import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer';

const logger = store => next => action => {
  if(typeof action === 'function') {
    // console.log('dispatching a function');
  } else {
    // console.log('dispatching', action);
  }
  const result = next(action);
  // console.log('nextState', store.getState());
  return result;
}

// 设置中间件
const middleWares = [logger, thunk];

/**
 * 创建store
 */
export default createStore(reducers, applyMiddleware(...middleWares))