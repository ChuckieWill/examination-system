import React, { Component } from 'react';
import {Globalstyle} from './style';
import {Provider} from 'react-redux'; 
import store from './store';   
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Sidebar from './common/sidebar';
import Home from './pages/home';
import Topic from './pages/topic';
import Login from './pages/login';



class  App  extends Component {
  render() {
    return (
      <div >
        <Globalstyle/>
        <Provider store = {store}>  
          <BrowserRouter >
            <Switch>
              <Route path="/" component={Login} exact />
              <Route  path="/login" component={Login}/>
              <Route  path="/admin" render={ props => (
                <div>
                  <Sidebar/>
                  <Route exact path="/admin" component={Home}/>
                  <Route exact path="/admin/topic" component={Topic}/>
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
