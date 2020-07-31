import {SET_TOPIC_DATA } from './actionTypes';  //注意引入路径的变化
import {fromJS} from 'immutable';

const defaultState = fromJS({
  totalNum: 0,
  page: 0,
  topicList: []
})

export default (state = defaultState, action) => {
  if (action.type === SET_TOPIC_DATA){
    return state.merge({
      totalNum: action.data.totalNum,
      page: action.data.page,
      topicList: fromJS(action.data.data)
    })
  }
  return state;
}