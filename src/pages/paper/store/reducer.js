import {fromJS} from 'immutable';
import {SET_PAPER_DATA } from './actionTypes'; 

const defaultState = fromJS({
  totalNum: 0,
  page: 0,
  paperList: []
})

export default (state = defaultState, action) => {
  if (action.type === SET_PAPER_DATA){
    return state.merge({
      totalNum: action.data.totalNum,
      page: action.data.page,
      paperList: fromJS(action.data.data)
    })
  }
  return state;
}