import React, { Component } from 'react';
import {Provider} from 'react-redux'; 
import store from './store';   
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Sidebar from './common/sidebar';
import Home from './pages/home';
import Topic from './pages/topic';
import Login from './pages/login';
import User from './pages/user';
import CreatePaper from './pages/paper/createPaper';
import PaperList from './pages/paper/paperList';
import ExamList from './pages/exam/examList';
import NewExam from './pages/exam/newExam';
import Grade from './pages/exam/grade';
// import { AppWrapper } from './style';
import './style.css';



class  App  extends Component {
  render() {
    return (
      <div >
        <Provider store = {store}>  
          <BrowserRouter >
            <Switch>
              <Route path="/" component={Login} exact />
              <Route  path="/login" component={Login}/>
              <Route  path="/admin" render={ props => (
                <div>
              
                  <Route path="/admin" component={Sidebar}/>
                  <Route exact path="/admin" component={Home}/>
                  <Route exact path="/admin/topic/:isCreate" component={Topic}/>
                  <Route exact path="/admin/user" component={User}/>
                  <Route exact path="/admin/paper/create" component={CreatePaper}/>
                  <Route exact path="/admin/paper/list" component={PaperList}/>
                  <Route exact path="/admin/exam/list" component={ExamList}/>
                  <Route exact path="/admin/exam/new/:paperTitle" component={NewExam}/>
                  <Route exact path="/admin/exam/grade/:record" component={Grade}/>
                </div>
                  
              )}/>
            </Switch>
          </BrowserRouter>          
        </Provider>   
      </div>
    )
  }
  
}

export default App;
