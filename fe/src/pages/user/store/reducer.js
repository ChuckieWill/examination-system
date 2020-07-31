import {fromJS} from 'immutable';
import { SET_USER_DATA } from './actionTypes'; 

const defaultState = fromJS({
  userList: [{
    id: 195,
    roleCode: 0,
    nickName: "theStudent0",
    phoneNumber: null,
    password: "theStudentPassword",
    level: 0
  },{
    id: 196,
    roleCode: 0,
    nickName: "theStudent1",
    phoneNumber: null,
    password: "theStudentPassword",
    level: 3
  }]
})

export default (state = defaultState, action) => {
  if (action.type === SET_USER_DATA){
    return state.merge({
      userList: fromJS(action.data)
    })
  }
  return state;
}