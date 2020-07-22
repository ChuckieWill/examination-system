import React, { Component } from 'react';
import { connect } from 'react-redux';
import Topbar from '../../common/topbar';
// import {HomeWrapper} from './style';
import './style.css';


class  Paper  extends Component {
  constructor(props){
    super(props)
    this.onAddPaper = this.onAddPaper.bind(this)
    this.onDelPaper = this.onDelPaper.bind(this)
  }

  render() {
    return (
      <div className="paper-wrapper">
        <Topbar add={true} 
          addContent={'创建试卷'}
          onAdd={this.onAddPaper}
          del={true}
          delContent={'删除试卷'}
          onDel={this.onDelPaper}></Topbar>
          <div className='paper-container'>

          </div>
      </div>
      
    )
  }

  //创建试卷
  onAddPaper(){
    console.log('创建试卷')
  }
  //删除试卷
  onDelPaper(){
    console.log('删除试卷')
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

export default connect(mapStateToProps, mapDispatchToProps)(Paper);
// ?redirect=' + encodeURIComponent(window.location.pathname)

