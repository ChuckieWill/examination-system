import {fromJS} from 'immutable';
import { SET_USER_DATA } from './actionTypes'; 

const defaultState = fromJS({
  totalNum: 0,
  page: 0,
  userList: []
})

export default (state = defaultState, action) => {
  if (action.type === SET_USER_DATA){
    return state.merge({
      totalNum: action.data.totalNum,
      page: action.data.page,
      examList: fromJS(action.data.data)
    })
  }
  return state;
}