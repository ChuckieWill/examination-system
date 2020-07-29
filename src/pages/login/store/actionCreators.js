import axios from 'axios';
import storage from '../../../utils/storage';


import { CHANGE_USER_DATA }  from './actionTypes';

export const getChangeUserData = (data) => ({
  type: CHANGE_USER_DATA,
  data
})

//http://bl.7yue.pro/v1/classic/latest?appkey=K57S1kGd4CLBz2dw
export const getSignIn = (account, password) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/user/new',
      data: {
        account,
        password
      }
    }).then((res) => {
      console.log(res)
      if(res.data.status !== 'ok'){
        alert("账户或密码错误")
        return
      }
      storage.set("userInfo", res.data); //缓存到本地
      dispatch(getChangeUserData(res.data))
    }).catch((err) => {
      console.log(err)
      alert("账户或密码错误")
    })
  }
}