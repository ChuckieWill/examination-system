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
              <Route  path="/login" component={Login}/>
              <Route  path="/" render={ props => (
                <Switch>
                  <Sidebar/>
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/topic" component={Topic}/>
                </Switch>
              )}/>
            </Switch>
          </BrowserRouter>          
        </Provider>   
      </div>
    )
  }
  
}

export default App;
