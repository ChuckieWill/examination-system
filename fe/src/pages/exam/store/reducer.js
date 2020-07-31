import {fromJS} from 'immutable';
import { SET_GRADE_DATA, SET_EXAM_DATA } from './actionTypes'; 

const defaultState = fromJS({
  totalNum: 0,
  page: 0,
  examList: [],
  gradeList: [{
    level: 0,
    name: "詹姆斯",
    timeSubmit: "2020-07-30T03:59:31.555+00:00",
    id: 195,
    marks: 99,
    detail: "ok",
    status: "ok"
  },{
    level: 1,
    name: "乔丹",
    timeSubmit: "2020-07-29T03:59:31.555+00:00",
    id: 196,
    marks: 100,
    detail: "ok",
    status: "ok"
  }]
})

export default (state = defaultState, action) => {
  if (action.type === SET_EXAM_DATA){
    return state.merge({
      totalNum: action.data.totalNum,
      page: action.data.page,
      examList: fromJS(action.data.exams)
    })
  }
  if (action.type === SET_GRADE_DATA){
    return state.merge({
      gradeList: fromJS(action.data)
    })
  }


  return state;
}