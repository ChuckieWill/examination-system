import axios from 'axios';
import { SET_USER_DATA  }  from './actionTypes';


const setUserData = (data) => ({
  type: SET_USER_DATA,
  data
})



// export const getUserData = (params) => {
//   return (dispatch) => {
//     axios({
//       method: 'get',
//       url: 'http://localhost:8080/home/testing',
//       params
//     }).then((res) => {
//       // dispatch(setUserData(res.data))
//       console.log(res,'getPaperData')
      
//     }).catch((err) => {
//       console.log(err)

//     })
//   }
// }



