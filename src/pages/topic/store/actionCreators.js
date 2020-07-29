import axios from 'axios';
import { SET_TOPIC_DATA  }  from './actionTypes';
import storage from '../../../utils/storage';


const setTopicData = (data) => ({
  type: SET_TOPIC_DATA,
  data
})

export const getTopicData = (params) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/subject/list',
      params
    }).then((res) => {
      dispatch(setTopicData(res.data))
      
    }).catch((err) => {
      console.log(err)

    })
  }
}

export const submitTopic = (data) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/subject/submit',
      data
    }).then((res) => {
      const flag = storage.get('topic-limit-search')
      const params = storage.get('topic-search')
      console.log(params)
      if(flag){
        dispatch(searchTopic(params))
      }else{
        dispatch(getTopicData(params))
      }
      console.log(res)
    }).catch((err) => {
      console.log(err)

    })
  }
}

export const searchTopic = (params) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/subject/search',
      params
    }).then((res) => {
      dispatch(setTopicData(res.data))
      // console.log(res.data,'topic-data')
    }).catch((err) => {
      console.log(err)

    })
  }
}

export const delTopic = (params) => {
  console.log(params)
 
  return (dispatch) => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/subject/delete',
      data: params
    }).then((res) => {
      // dispatch(setTopicData(res.data))
      console.log(res.data)
      if(res.data.status === 'ok'){
        const flag = storage.get('topic-limit-search')
        const params = storage.get('topic-search')
        console.log(params)
        if(flag){
          dispatch(searchTopic(params))
        }else{
          dispatch(getTopicData(params))
        }
      }
    }).catch((err) => {
      console.log(err)
    })
  }
}
