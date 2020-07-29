import {fromJS} from 'immutable';
import { SET_GRADE_DATA, SET_EXAM_DATA } from './actionTypes'; 

const defaultState = fromJS({
  totalNum: 0,
  page: 0,
  examList: [{
    id: 10,
   	examTitle: 'test',
    examStartTime: '2020-07-28T03:41:39.800+00:00' ,
    examTotalTime: 120 ,
    examDescribe: '无',
    paperId: 1,
  },{
    id: 110,
   	examTitle: 'test',
    examStartTime: '2020-07-28T03:41:39.800+00:00' ,
    examTotalTime: 120 ,
    examDescribe: '无',
    paperId: 1,
  },{
    id:1110,
   	examTitle: 'test',
    examStartTime: '2020-07-28T03:41:39.800+00:00' ,
    examTotalTime: 120 ,
    examDescribe: '无',
    paperId: 1,
  }],
  gradePage: 0,
  gradeTotalNum: 0,
  gradeList: {}
})

export default (state = defaultState, action) => {
  if (action.type === SET_EXAM_DATA){
    return state.merge({
      totalNum: action.data.totalNum,
      page: action.data.page,
      examList: fromJS(action.data.data)
    })
  }
  if (action.type === SET_GRADE_DATA){
    return state.merge({
      gradeTotalNum: action.data.totalNum,
      gradePage: action.data.page,
      gradeList: fromJS(action.data.data)
    })
  }


  return state;
}