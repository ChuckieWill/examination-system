import { combineReducers } from 'redux-immutable';
import { sidebarReducer } from '../common/sidebar/store';   //从组件中引入拆分的`reducer.js`
import { LoginReducer } from '../pages/login/store';
import { TopicReducer } from '../pages/topic/store';
import { PaperReducer } from '../pages/paper/store';
import { ExamReducer } from '../pages/exam/store';
import { UserReducer } from '../pages/user/store';



const reducer =  combineReducers({
  sidebar: sidebarReducer,  //给组件中的`reducer`设置名称，便于管理
  login: LoginReducer,
  topic: TopicReducer,
  paper: PaperReducer,
  exam: ExamReducer,
  user: UserReducer
})

export default reducer;

