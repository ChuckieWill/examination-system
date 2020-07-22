import {CHANGE_USER_DATA} from './actionTypes';  //注意引入路径的变化
import {fromJS} from 'immutable';

const defaultState = fromJS({
  totalNum: 0,
  page: 0,
  topicList: []
})

export default (state = defaultState, action) => {
  if (action.type === CHANGE_USER_DATA){
    
  }
  return state;
}