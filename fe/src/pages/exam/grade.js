import React, { Component } from 'react';
import { connect } from 'react-redux';
import Topbar from '../../common/topbar';
// import TableList from '../../common/table';
import { actionCreators } from './store';
import storage from '../../utils/storage';
import { formatDate } from '../../utils/formatTime/formatTime';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import './style.css';

const columns = [
  {
    title: '学生姓名',
    dataIndex: 'name',
    key:'name',
    align: 'center'
  },
  {
    title: '年级',
    dataIndex: 'level',
    key:'level',
    align: 'center'

  },
  {
    title: '分数',
    dataIndex: 'grade',
    key:'grade',
    align: 'center'
  },
  {
    title: '交卷时间',
    dataIndex: 'submitTime',
    key:'submitTime',
    align: 'center'
  }
]

const levels = ['一年级','二年级','三年级','四年级','五年级','六年级']

class  Grade  extends Component {
  constructor(props){
    super(props)
    this.state = {
      exam: []
    }
    // this.onPageChange = this.onPageChange.bind(this)
    this.onBack = this.onBack.bind(this)
  }

  render() {
    return (
      <div className='app-background'>
        <div className="exam-wrapper">
          <Topbar back={true}
            backContent={'返回'}
            onBack={this.onBack}></Topbar>
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
    // 2 获取考试信息
    const record = this.props.match.params.record
    const exam = record.split(',')
    this.setState(() => {
      return {
        exam,
        userId: userInfo.userId,
      }
    })
    let params = {
      userId: userInfo.userId,
      examId: exam[0]
    }
    // 3 发送网络请求
    this.props.getGradeData(params) 
  }


  //创建试卷
  getNewPaper(){
    const { exam } =this.state
    const {  list } = this.props
    return (
      <div >
        <div className='grade-exam'>
          <div className='grade-exam-item'>
            <div className='grade-exam-item-title'>考试名称</div>
            <div>{exam[1]}</div>
          </div>
          <div className='grade-exam-item'>
            <div className='grade-exam-item-title'>考试时间</div>
            <div>{exam[2]} 到 {exam[3]} </div>
          </div>
        </div>
        <Table style={{ marginBottom: 25 }} 
          columns={columns} 
          dataSource={list} />
      </div>
    )
  }

 
  //返回试卷列表页
  onBack() {
    this.props.history.push('/admin/exam/list')
  }




  // //表单翻页
  // onPageChange(page){
  //   let params = {
  //     userId: this.state.userId,
  //     pageIndex: page
  //   }
  //   // 3 发送网络请求
  //   this.props.getGradeData(params) 
   
 
  // }
}

const mapStateToProps = (state) => {
  let newList = state.getIn(['exam', 'gradeList']).toJS()
  let tableList = newList.map((item) => {
    return {
      key: item.id,
      name: item.name,
      level: levels[item.level],
      grade: item.marks,
      submitTime: formatDate(new Date(item.timeSubmit), 'yyyy-MM-dd hh:mm'),}
  })
  return {
    list: tableList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGradeData(params){
      dispatch(actionCreators.getGradeData(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grade);

