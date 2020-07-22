import React, { Component } from 'react';
// import {Globalstyle} from './style';
import {Provider} from 'react-redux'; 
import store from './store';   
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Sidebar from './common/sidebar';
import Home from './pages/home';
import Topic from './pages/topic';
import Login from './pages/login';
import User from './pages/user';
import Paper from './pages/paper';
import Exam from './pages/exam';
import Grade from './pages/grade';
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
                  <Route exact path="/admin/topic" component={Topic}/>
                  <Route exact path="/admin/user" component={User}/>
                  <Route exact path="/admin/paper" component={Paper}/>
                  <Route exact path="/admin/exam" component={Exam}/>
                  <Route exact path="/admin/grade" component={Grade}/>
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
