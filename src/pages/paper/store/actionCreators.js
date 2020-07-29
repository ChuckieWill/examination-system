import axios from 'axios';
import { SET_PAPER_DATA  }  from './actionTypes';


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
      console.log(res)
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