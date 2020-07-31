import {CHANGE_USER_DATA} from './actionTypes';  //注意引入路径的变化
import {fromJS} from 'immutable';

const defaultState = fromJS({
  status: false,
  token: '',
  userId: 0
})

export default (state = defaultState, action) => {
  if (action.type === CHANGE_USER_DATA){
    const data = action.data
    return state.merge({
      status: data.status === 'ok' ? true : false,
      token: data.token,
      userId: data.userId
    })
  }
  return state;
}