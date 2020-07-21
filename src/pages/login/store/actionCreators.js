import axios from 'axios';
import { CHANGE_USER_DATA }  from './actionTypes';

const getChangeUserData = (data) => ({
  type: CHANGE_USER_DATA,
  data
})

//http://bl.7yue.pro/v1/classic/latest?appkey=K57S1kGd4CLBz2dw
export const getSignIn = (account, password) => {
  return (dispatch) => {
    axios.get('/api/user/new/user.json',{
      account,
      password
    }).then((res) => {
      if(res.data.status !== 'ok'){
        alert("账户或密码错误123")
        return
      }
      dispatch(getChangeUserData(res.data))
    }).catch((err) => {
      console.log(err)
      alert("账户或密码错误456")
    })
  }
}