import React, { Component } from 'react';
import { connect } from 'react-redux';
import Topbar from '../../common/topbar';
import TableList from '../../common/table';
import { actionCreators } from './store';
import storage from '../../utils/storage';
import { formatDate } from '../../utils/formatTime/formatTime';
import './style.css';

const columns = [
  {
    title: '考试号',
    dataIndex: 'key',
    key:'key',
  },
  {
    title: '考试名称',
    dataIndex: 'examTitle',
    key:'examTitle',
    align: 'center'

  },
  {
    title: '考试开始时间',
    dataIndex: 'examStartTime',
    key:'examStartTime',
    align: 'center'
  },
  {
    title: '考试结束时间',
    dataIndex: 'examEndTime',
    key:'examEndTime',
    align: 'center'
  }
]

class  ExamList  extends Component {
  constructor(props){
    super(props)
    this.onAddExam = this.onAddExam.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.onNavToGrade = this.onNavToGrade.bind(this)
  }

  render() {
    return (
      <div className='app-background'>
        <div className="exam-wrapper">
          <Topbar add={true} 
            addContent={'创建考试'}
            onAdd={this.onAddExam}></Topbar>
          <div className='topic-container'>
            {this.getNewPaper()}
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
    storage.set('exam-limit-search', false) //非条件查询
    // 3 发送网络请求
    this.props.getExamData(params) 
  }
  componentWillUnmount(){
    //清除缓存
    storage.remove('exam-search')
    storage.remove('exam-limit-search')
  }


  //创建试卷
  getNewPaper(){
    const { totalNum, page, list } = this.props
    return (
      <div className='exam-list-table'>
        <TableList 
          
          list={list}
          totalNum={totalNum}
          page={page}
          columns={columns}
          type={'radio'}
          isNavGradeShow={true}
          hideSelectAll={true}
          onNavChange={this.onNavToGrade}
          onPageChange={this.onPageChange}></TableList>
      </div>
    )
  }

  //创建试卷
  onAddExam(){
    this.props.history.push('/admin/exam/new/' + '-1')
  }

  //跳转到成绩管理页面
  onNavToGrade(record){
    const exam = []
    exam.push(record.examTitle, record.examStartTime, record.examEndTime)
    this.props.history.push('/admin/exam/grade/' + exam)
  }



  //表单翻页
  onPageChange(page){
    let params = {
      userId: this.state.userId,
      pageIndex: page
    }
    // 2 将查询条件放入缓存
    storage.set('exam-search', params)
    storage.set('exam-limit-search', false) //非条件查询
    // 3 发送网络请求
    this.props.getExamData(params) 
   
 
  }
}

const mapStateToProps = (state) => {
  let newList = state.getIn(['exam', 'examList']).toJS()
  let tableList = newList.map((item) => {
    return {
      key: item.id,
      examTitle: item.examTitle,
      examStartTime: formatDate(new Date(item.examStartTime), 'yyyy-MM-dd hh:mm'),
      examEndTime: formatDate(new Date(((new Date(item.examStartTime)).getTime()) + item.examTotalTime * 60 * 1000), 'yyyy-MM-dd hh:mm')
    }
  })
  return {
    page: state.getIn(['exam','page']),
    totalNum: state.getIn(['exam', 'totalNum']),
    list: tableList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getExamData(params){
      dispatch(actionCreators.getExamData(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamList);

