import axios from 'axios';


export const getSignIn = () => {
  return (dispatch) => {
    axios.get('http://bl.7yue.pro/v1/classic/latest?appkey=K57S1kGd4CLBz2dw').then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
}