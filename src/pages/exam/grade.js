import React, { Component } from 'react';
import { connect } from 'react-redux';
import Topbar from '../../common/topbar';
import TableList from '../../common/table';
import { actionCreators } from './store';
import storage from '../../utils/storage';
import { formatDate } from '../../utils/formatTime/formatTime';
import './style.css';

// const columns = [
//   {
//     title: '考试号',
//     dataIndex: 'key',
//     key:'key',
//   },
//   {
//     title: '考试名称',
//     dataIndex: 'examTitle',
//     key:'examTitle',
//     align: 'center'

//   },
//   {
//     title: '考试开始时间',
//     dataIndex: 'examStartTime',
//     key:'examStartTime',
//     align: 'center'
//   },
//   {
//     title: '考试结束时间',
//     dataIndex: 'examEndTime',
//     key:'examEndTime',
//     align: 'center'
//   }
// ]

class  Grade  extends Component {
  constructor(props){
    super(props)
    this.state = {
      exam: []
    }
    this.onPageChange = this.onPageChange.bind(this)
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
      pageIndex: this.props.page
    }
    // 3 发送网络请求
    // this.props.getGradeData(params) 
  }


  //创建试卷
  getNewPaper(){
    const { exam } =this.state
    const { totalNum, page, list } = this.props
    return (
      <div >
        <div className='grade-exam'>
          <div className='grade-exam-item'>
            <div className='grade-exam-item-title'>考试名称</div>
            <div>{exam[0]}</div>
          </div>
          <div className='grade-exam-item'>
            <div className='grade-exam-item-title'>考试时间</div>
            <div>{exam[1]} 到 {exam[2]} </div>
          </div>
        </div>
        {/* <TableList
          list={list}
          totalNum={totalNum}
          page={page}
          columns={columns}
          type={'radio'}
          hideSelectAll={true}
          onPageChange={this.onPageChange}></TableList> */}
      </div>
    )
  }

 
  //返回试卷列表页
  onBack() {
    this.props.history.push('/admin/exam/list')
  }




  //表单翻页
  onPageChange(page){
    let params = {
      userId: this.state.userId,
      pageIndex: page
    }
    // 3 发送网络请求
    this.props.getGradeData(params) 
   
 
  }
}

const mapStateToProps = (state) => {
  let newList = state.getIn(['exam', 'gradeList']).toJS()
  // let tableList = newList.map((item) => {
  //   return {
  //     key: item.id,
  //     examTitle: item.examTitle,
  //     examStartTime: formatDate(new Date(item.examStartTime), 'yyyy-MM-dd hh:mm'),
  //     examEndTime: formatDate(new Date(((new Date(item.examStartTime)).getTime()) + item.examTotalTime * 60 * 1000), 'yyyy-MM-dd hh:mm')
  //   }
  // })
  return {
    page: state.getIn(['exam','gradePage']),
    totalNum: state.getIn(['exam', 'gradeTotalNum']),
    list: newList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getExamData(params){
      dispatch(actionCreators.getGradeData(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grade);

