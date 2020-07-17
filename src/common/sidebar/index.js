import React, { Component } from 'react';
import { SidebarWrapper } from './style';
import { HomeOutlined, ProfileOutlined, LineChartOutlined, FileTextOutlined, TeamOutlined, UserOutlined, FormOutlined } from '@ant-design/icons';
import { actionCreators } from './store';
import { connect } from 'react-redux';

class  Sidebar  extends Component {
  render() {
    const {currentIndex, onChange} = this.props
    return (
      <SidebarWrapper>
        <div className="side-title">在线考试系统</div>
        <a className={ currentIndex === 0 ? 'tab' : ' tab-active'} 
           href='/'
           onClick={() => onChange(0)}>
             <HomeOutlined className="icon" /> 首页</a>
        <a className={ currentIndex === 1 ? 'tab' : ' tab-active'}  
           href='/topic'
           onClick={() => onChange(1)}>
             <ProfileOutlined className="icon"/> 题目管理</a>
        <a className={ currentIndex === 2 ? 'tab' : ' tab-active'} 
           href='/'
           onClick={() => onChange(2)}>
             <FileTextOutlined className="icon"/> 试卷管理</a>
        <a className={ currentIndex === 3 ? 'tab' : ' tab-active'} 
           href='/'
           onClick={() => onChange(3)}>
             <FormOutlined className="icon"/> 考试管理</a>
        <a className={ currentIndex === 4 ? 'tab' : ' tab-active'} 
           href='/'
           onClick={() => onChange(4)}>
             <LineChartOutlined className="icon"/> 成绩管理</a>
        <a className={ currentIndex === 5 ? 'tab' : 'tab-active'} 
           href='/'
           onClick={() => onChange(5)}>
             <TeamOutlined className="icon"/> 用户列表</a>
        <div className={ currentIndex === 6 ? 'tab exit' : 'exit tab-active'} 
           href='/'
           onClick={() => onChange(6)}>
             <UserOutlined className="icon"/> 退出系统</div>
      </SidebarWrapper>
    )
  }

}

const mapStateToProps = (state) => {
  console.log(state)
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
