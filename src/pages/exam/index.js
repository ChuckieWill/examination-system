import React, { Component } from 'react';
import { connect } from 'react-redux';
import Topbar from '../../common/topbar';
// import {HomeWrapper} from './style';
import './style.css';


class  Exam  extends Component {
  constructor(props){
    super(props)
    this.onAddExam = this.onAddExam.bind(this)
    this.onDelExam = this.onDelExam.bind(this)
  }

  render() {
    return (
      <div className="exam-wrapper">
        <Topbar add={true} 
          addContent={'创建考试'}
          onAdd={this.onAddExam}
          del={true}
          delContent={'删除考试'}
          onDel={this.onDelExam}></Topbar>
        <div className='exam-container'>

        </div>
      </div>
      
    )
  }

  //创建试卷
  onAddExam(){
    console.log('创建考试')
  }
  //删除试卷
  onDelExam(){
    console.log('删除考试')
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

export default connect(mapStateToProps, mapDispatchToProps)(Exam);
// ?redirect=' + encodeURIComponent(window.location.pathname)

