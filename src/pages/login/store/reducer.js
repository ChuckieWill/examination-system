import {CHANGE_CURRENT} from './actionTypes';  //注意引入路径的变化
import {fromJS} from 'immutable';

const defaultState = fromJS({
  status: false,
  token: '',
  userId: 0
})

export default (state = defaultState, action) => {
  if (action.type === CHANGE_CURRENT){
    return state.set('currentIndex', action.index)
  }
  return state;
}