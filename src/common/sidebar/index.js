import React, { Component } from 'react';
// import { SidebarWrapper } from './style';
import { HomeOutlined, ProfileOutlined, LineChartOutlined, FileTextOutlined, TeamOutlined, UserOutlined, FormOutlined } from '@ant-design/icons';
import { actionCreators } from './store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.css'

class  Sidebar  extends Component {
  // constructor(props){
  //   super(props)
  //   this.onExit = this.onExit.bind(this)
  // }
  render() {
    const {currentPath, onChange} = this.props
    return (
      <div className='sidebar-wrapper'>
        <div className="side-title">在线考试系统</div>
        <Link to='/admin'>
          <div className={ currentPath === '/admin' ? 'tab' : ' tab-active'} 
               onClick={() => onChange('/admin')}>
            <HomeOutlined className="icon" /> 
            首页
          </div>
        </Link>
        <Link to='/admin/topic'>
          <div className={ currentPath === '/admin/topic' ? 'tab' : ' tab-active'} 
               onClick={() => onChange('/admin/topic')}>
            <ProfileOutlined className="icon" /> 
            题目管理
          </div>
        </Link>
        <Link to='/admin/paper'>
          <div className={ currentPath === '/admin/paper' ? 'tab' : ' tab-active'} 
               onClick={() => onChange('/admin/paper')}>
            <FileTextOutlined className="icon" /> 
            试卷管理
          </div>
        </Link>
        <Link to='/admin/exam'>
          <div className={ currentPath === '/admin/exam' ? 'tab' : ' tab-active'} 
               onClick={() => onChange('/admin/exam')}>
            <FormOutlined className="icon" /> 
            考试管理
          </div>
        </Link>
        <Link to='/admin/grade'>
          <div className={ currentPath === '/admin/grade' ? 'tab' : ' tab-active'} 
               onClick={() => onChange('/admin/grade')}>
            < LineChartOutlined className="icon" /> 
            成绩管理
          </div>
        </Link>
        <Link to='/admin/user'>
          <div className={ currentPath === '/admin/user' ? 'tab' : ' tab-active'} 
               onClick={() => onChange('/admin/user')}>
            <TeamOutlined className="icon" /> 
            用户列表
          </div>
        </Link>
        <Link to='/login'>
          <div className={ currentPath === '/login' ? 'tab exit' : 'exit tab-active'} 
                onClick={() => onChange('/login')}>
            <UserOutlined className="icon" /> 
            退出系统
          </div>
        </Link>
        
      </div>
    ) 
  }

  componentDidMount(){
    const pathname = this.props.history.location.pathname
    this.props.onChange(pathname)
  }

  //退出
  // onExit(index){
  //   setTimeout(() => {
  //     this.props.history.push('/login')
  //   },500)
  //   this.props.onChange(index)
  // }

}

const mapStateToProps = (state) => {
  return {
    currentPath: state.getIn(['sidebar','currentPath'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange(path){
      dispatch(actionCreators.getChangeIndex(path))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
