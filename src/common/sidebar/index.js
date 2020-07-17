import React, { Component } from 'react';
import { SidebarWrapper } from './style';
import { HomeOutlined, ProfileOutlined, LineChartOutlined, FileTextOutlined, TeamOutlined, UserOutlined, FormOutlined } from '@ant-design/icons';
import { actionCreators } from './store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class  Sidebar  extends Component {
  render() {
    const {currentIndex, onChange} = this.props
    return (
      <SidebarWrapper>
        <div className="side-title">在线考试系统</div>
        <Link to='/'>
          <div className={ currentIndex === 0 ? 'tab' : ' tab-active'} 
               onClick={() => onChange(0)}>
            <HomeOutlined className="icon" /> 
            首页
          </div>
        </Link>
        <Link to='/topic'>
          <div className={ currentIndex === 1 ? 'tab' : ' tab-active'} 
               onClick={() => onChange(1)}>
            <ProfileOutlined className="icon" /> 
            题目管理
          </div>
        </Link>
        <Link to='/topic'>
          <div className={ currentIndex === 2 ? 'tab' : ' tab-active'} 
               onClick={() => onChange(2)}>
            <FileTextOutlined className="icon" /> 
            试卷管理
          </div>
        </Link>
        <Link to='/topic'>
          <div className={ currentIndex === 3 ? 'tab' : ' tab-active'} 
               onClick={() => onChange(3)}>
            <FormOutlined className="icon" /> 
            考试管理
          </div>
        </Link>
        <Link to='/topic'>
          <div className={ currentIndex === 4 ? 'tab' : ' tab-active'} 
               onClick={() => onChange(4)}>
            < LineChartOutlined className="icon" /> 
            成绩管理
          </div>
        </Link>
        <Link to='/topic'>
          <div className={ currentIndex === 5 ? 'tab' : ' tab-active'} 
               onClick={() => onChange(5)}>
            <TeamOutlined className="icon" /> 
            用户列表
          </div>
        </Link>
        <Link to='/topic'>
          <div className={ currentIndex === 6 ? 'tab exit' : 'exit tab-active'} 
               onClick={() => onChange(6)}>
            <UserOutlined className="icon" /> 
            退出系统
          </div>
        </Link>
        
      </SidebarWrapper>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentIndex: state.getIn(['sidebar','currentIndex'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange(index){
      dispatch(actionCreators.getChangeIndex(index))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
