import axios from 'axios';
import { CHANGE_USER_DATA }  from './actionTypes';

export const getTopicData = (userId) => {
  return (dispatch) => {
    axios.get('/api/subject/list.json',{
      userId
    }).then((res) => {
      console.log(res)
    })
  }
}