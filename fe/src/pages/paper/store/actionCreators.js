import axios from 'axios';
import { SET_PAPER_DATA  }  from './actionTypes';
import storage from '../../../utils/storage';


const setPaperData = (data) => ({
  type: SET_PAPER_DATA,
  data
})

export const submitPaper = (data) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/paper/add',
      data
    }).then((res) => {
      const flag = storage.get('paper-limit-search')
      const params = storage.get('paper-search')
      if(flag){
        dispatch(searchPaper(params))
      }else{
        dispatch(getPaperData(params))
      }
      // console.log(res)
    }).catch((err) => {
      console.log(err)

    })
  }
}


export const getPaperData = (params) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/paper/list',
      params
    }).then((res) => {
      dispatch(setPaperData(res.data))
      // console.log(res,'getPaperData')
      
    }).catch((err) => {
      console.log(err)

    })
  }
}

export const searchPaper = (params) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/paper/search',
      params
    }).then((res) => {
      dispatch(setPaperData(res.data))
      // console.log(res.data,'paper-data')
    }).catch((err) => {
      console.log(err)

    })
  }
}

export const delPaper = (data) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/paper/delete',
      data
    }).then((res) => {
      // dispatch(setPaperData(res.data))
      // console.log(res.data,'paper-del')
      if(res.data.status === 'deleted'){
        const flag = storage.get('paper-limit-search')
        const params = storage.get('paper-search')
        if(flag){
          dispatch(searchPaper(params))
        }else{
          dispatch(getPaperData(params))
        }
      }
    }).catch((err) => {
      console.log(err)

    })
  }
}