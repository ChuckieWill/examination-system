import React, { Component } from 'react';
import {Globalstyle} from './style';
import {Provider} from 'react-redux'; 
import store from './store';   
import {BrowserRouter, Route} from 'react-router-dom';
import Sidebar from './common/sidebar';
import Home from './pages/home';
import Topic from './pages/topic';


class  App  extends Component {
  render() {
    return (
      <div >
        <Globalstyle/>
        <Provider store = {store}>  
          <BrowserRouter >
            <Sidebar/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/topic" component={Topic}/>
          </BrowserRouter>          
        </Provider>   
      </div>
    )
  }
  
}

export default App;
