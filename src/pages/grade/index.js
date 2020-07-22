import React, { Component } from 'react';
import { connect } from 'react-redux';
import Topbar from '../../common/topbar';
// import {HomeWrapper} from './style';
import './style.css';


class  Grade  extends Component {
  constructor(props){
    super(props)
    this.onSelGrade = this.onSelGrade.bind(this)
  }

  render() {
    return (
      <div className="grade-wrapper">
        <Topbar 
          sel={true}
          selContent={'选择考试'}
          onSel={this.onSelGrade}></Topbar>
        <div className='grade-container'>

        </div>
      </div>
      
    )
  }

  //选择考试
  onSelGrade(){
    console.log('选择考试')
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

export default connect(mapStateToProps, mapDispatchToProps)(Grade);
// ?redirect=' + encodeURIComponent(window.location.pathname)

