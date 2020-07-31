import axios from 'axios';
import { SET_USER_DATA  }  from './actionTypes';


const setUserData = (data) => ({
  type: SET_USER_DATA,
  data
})



export const getUserData = (params) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/user/mystudents/all',
      params
    }).then((res) => {
      if(res.data.length === 0){
        return 
      }
      dispatch(setUserData(res.data))
      console.log(res,'getUserData')
      
    }).catch((err) => {
      console.log(err)

    })
  }
}



