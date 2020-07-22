import React, { Component } from 'react';
import { connect } from 'react-redux';
import Topbar from '../../common/topbar';
// import {HomeWrapper} from './style';
import './style.css';


class  User  extends Component {
  constructor(props){
    super(props)
    this.onDelUser = this.onDelUser.bind(this)
  }

  render() {
    return (
      <div className="user-wrapper">
        <Topbar 
          del={true}
          delContent={'删除用户'}
          onDel={this.onDelUser}></Topbar>
        <div className='user-container'>

        </div>
      </div>
      
    )
  }

  //删除用户
  onDelUser(){
    console.log('删除用户')
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
// ?redirect=' + encodeURIComponent(window.location.pathname)

