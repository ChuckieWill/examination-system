import React, { Component } from 'react';
import { connect } from 'react-redux';
import Topbar from '../../common/topbar';
// import {HomeWrapper} from './style';
import './style.css';


class  Home  extends Component {
  // constructor(props){
  //   super(props)
    
  // }

  render() {

    return (
      <div className="home-wrapper">
        <Topbar></Topbar>
        <div className='home-container'>

        </div>
      </div>
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.getIn(['login','status'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// ?redirect=' + encodeURIComponent(window.location.pathname)

