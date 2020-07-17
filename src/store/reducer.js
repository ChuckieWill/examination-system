import { combineReducers } from 'redux-immutable'
import { sidebarReducer } from '../common/sidebar/store'   //从组件中引入拆分的`reducer.js`

const reducer =  combineReducers({
  sidebar: sidebarReducer  //给组件中的`reducer`设置名称，便于管理
})

export default reducer;

