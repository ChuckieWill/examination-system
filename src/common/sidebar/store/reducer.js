import {CHANGE_CURRENT} from './actionTypes';  //注意引入路径的变化
import {fromJS} from 'immutable';

const defaultState = fromJS({
  currentPath: '/admin'
})

export default (state = defaultState, action) => {
  if (action.type === CHANGE_CURRENT){
    return state.set('currentPath', action.path)
  }
  return state;
}