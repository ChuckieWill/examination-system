import React, { Component } from 'react';
import { connect } from 'react-redux';
import Topbar from '../../common/topbar';
import { Link } from 'react-router-dom';
import { actionCreators as sidebarCreators } from '../../common/sidebar/store';
import { formatDate } from '../../utils/formatTime/formatTime';

// import {HomeWrapper} from './style';
import './style.css';
import { ProfileOutlined, FileTextOutlined, FormOutlined } from '@ant-design/icons';


class  Home  extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      startTime: '',
      endTime: '',
      grade: 0,
      totalTime: 0,
      peoNum: 0,
      peoNuming: 0
    }
  }

  render() {
    const { startTime,endTime,grade,totalTime,peoNum,peoNuming} = this.state
    const { onChange } = this.props
    return (
      <div className='app-background'>
        <div className="home-wrapper">
          <Topbar></Topbar>
          <div className='home-container'>
            <div className='home-nav'>
              <Link to='/admin/topic/true'>
                <div className='home-nav-item' onClick={() => onChange('/admin/topic')}>
                    <div  className='home-nav-item-icon-topic'><ProfileOutlined className="home-icon" /> </div>
                    <div className='home-nav-item-content'>
                      <div className ='home-content-title' >添加题目</div>
                      <p className = 'home-content-des'>可以手工录入试题</p>
                    </div>
                  </div>
              </Link>
              <Link to='/admin/paper/create'>
                <div className='home-nav-item' onClick={() => onChange('/admin/paper/create')}>
                  <div className='home-nav-item-icon-paper' ><FileTextOutlined className="home-icon" /> </div>
                  <div className='home-nav-item-content'>
                    <div className ='home-content-title' >创建试卷</div>
                    <p className = 'home-content-des'>注意创建试卷前先添加题目</p>
                  </div>
                </div>
              </Link>
              <Link to='/admin/exam/new/-1'>
                <div className='home-nav-item' onClick={() => onChange('/admin/exam/new/-1')}>
                  <div className='home-nav-item-icon-exam'><FormOutlined className="home-icon" />  </div>
                  <div className='home-nav-item-content'>
                    <div className ='home-content-title' >创建考试</div>
                    <p className = 'home-content-des'>注意创建考试前先创建试卷</p>
                  </div>
                </div>
              </Link>
              
            </div>           
            <div className='home-exam-title'>正在进行的考试</div>
            <div className='home-exam'>
              <div className='home-exam-item'>
                <div className='home-exam-item-title'>考试名称1</div>
                <div className='home-exam-item-content'>{startTime} 到 {endTime}</div>
                <div className='home-exam-item-content'>
                  <div>分数: {grade}分</div>
                  <div>时长: {totalTime}min</div>
                </div>
                <div className='home-exam-item-content'>
                  <div className='home-exam-item-content-item'>应试人数: <div className='home-exam-item-content-num'> {peoNum}人</div></div>
                  <div className='home-exam-item-content-item'>正在考试人数: <div className='home-exam-item-content-num'> {peoNuming}人</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
    )
  }

  componentDidMount(){
    const title = '考试名称1'
    const startTime = formatDate(new Date() ,'yyyy-MM-dd hh:mm:ss')
    const endTime = formatDate((new Date((new Date()).getTime() + 120*60*1000)),'yyyy-MM-dd hh:mm:ss')
    const grade = 100
    const totalTime = 120
    const peoNum = 45
    const peoNuming = 40
    this.setState(() => {
      return {
        title,
        startTime,
        endTime,
        grade,
        totalTime,
        peoNum,
        peoNuming
      }
    })
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.getIn(['login','status'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange(path){
      dispatch(sidebarCreators.getChangeIndex(path))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// ?redirect=' + encodeURIComponent(window.location.pathname)

