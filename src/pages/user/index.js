import React, { Component } from 'react';
import { connect } from 'react-redux';
import Topbar from '../../common/topbar';
import storage from '../../utils/storage';
import { actionCreators } from './store';

// import {HomeWrapper} from './style';
import './style.css';


class  User  extends Component {
  constructor(props){
    super(props)
    this.state = {
      delList: [] //删除用户的Id
    }
    this.onDelAllUser = this.onDelAllUser.bind(this)
    this.onDelUser = this.onDelUser.bind(this)
  }

  render() {
    return (
      <div className='app-background'>
        <div className="user-wrapper">
          <Topbar 
            del={true}
            delContent={'删除用户'}
            onDel={this.onDelAllUser}></Topbar>
          <div className='user-container'>
            {/* <TableList 
              list={list}
              totalNum={totalNum}
              page={page}
              columns={columns}
              isDelShow={true}
              isOnChange={true}
              onChange={this.onDelUser}
              hideSelectAll={true}
              onPageChange={this.onPageChange}>
            </TableList> */}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount(){
    // 1 获取本地缓存数据-userId
    const userInfo = storage.get('userInfo')
    this.setState(() => {
      return {
        userId: userInfo.userId
      }
    })
    let params = {
      userId: userInfo.userId,
      pageIndex: this.props.page
    }
    // 2 将查询条件放入缓存
    storage.set('exam-search', params)
    // 3 发送网络请求
    // this.props.getUserData(params) 
  }
  componentWillUnmount(){
    //清除缓存
    storage.remove('exam-search')
  }

  //删除题目-单条
  onDelTopic(delList, type){
    if(type === 'delMul'){
      this.setState(() => {
        return {
          delList
        }
      })
      return
    }
    // 1 整理删除参数
    let params = {
      userId: this.state.userId,
      subIds: delList
    }
    console.log(params)
    // 2 发送网络请求
    this.props.getDelTopic(params)
  }

  //删除用户
  onDelAllUser(){
    console.log('删除用户')
  }
  //表单翻页
  onPageChange(page){
    let params = {
      userId: this.state.userId,
      pageIndex: page
    }
    // 2 将查询条件放入缓存
    storage.set('user-search', params)
    // 3 发送网络请求
    this.props.getUserData(params) 
    
  
  }
}

const mapStateToProps = (state) => {
  let newList = state.getIn(['user', 'userList']).toJS()
  // let tableList = newList.map((item) => {
  //   return {
  //     key: item.id,
  //     examTitle: item.examTitle,
  //     examStartTime: formatDate(new Date(item.examStartTime), 'yyyy-MM-dd hh:mm'),
  //     examEndTime: formatDate(new Date(((new Date(item.examStartTime)).getTime()) + item.examTotalTime * 60 * 1000), 'yyyy-MM-dd hh:mm')
  //   }
  // })
  return {
    page: state.getIn(['user','page']),
    totalNum: state.getIn(['user', 'totalNum']),
    list: newList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserData(params){
      dispatch(actionCreators.getUserData(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
// ?redirect=' + encodeURIComponent(window.location.pathname)

