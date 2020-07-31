import axios from 'axios';
import { SET_GRADE_DATA ,SET_EXAM_DATA }  from './actionTypes';


const setExamData = (data) => ({
  type: SET_EXAM_DATA,
  data
})

const setGradeData = (data) => ({
  type: SET_GRADE_DATA,
  data
})

export const submitExam = (data) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/exam/add',
      data
    }).then((res) => {
      console.log(res,'考试提交成功')
    }).catch((err) => {
      console.log(err)

    })
  }
}


export const getExamData = (params) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/home/testing',
      params
    }).then((res) => {
      dispatch(setExamData(res.data))
      console.log(res,'getPaperData')
      
    }).catch((err) => {
      console.log(err)

    })
  }
}

export const getGradeData = (params) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/user/exam/students',
      params
    }).then((res) => {
      if(res.data.length === 0){
        return 
      }
      dispatch(setGradeData(res.data))
      console.log(res,'getGradeData')
      
    }).catch((err) => {
      console.log(err)

    })
  }
}

