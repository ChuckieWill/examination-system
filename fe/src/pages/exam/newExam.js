import React, { Component } from 'react';
import { connect } from 'react-redux';
import Topbar from '../../common/topbar';
import { actionCreators as paperCreators} from '../paper/store';
import { actionCreators } from './store' ;
import storage from '../../utils/storage';
import { Button, Input, DatePicker, TimePicker  } from 'antd';
import './style.css';
// import PaperTable from './common/paperTable';
import TableList from '../../common/table/index';
import { formatDate } from '../../utils/formatTime/formatTime';
const { TextArea } = Input;


const columns = [
  {
    title: '试卷名称',
    dataIndex: 'title',
    key:'title',
  },
  {
    title: '总分',
    dataIndex: 'totalCredit',
    key:'totalCredit',
    align: 'center'

  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key:'createTime',
    align: 'center'
  }
]

class NewExam extends Component {
  constructor(props) {
    super(props)
    this.state = {
      examTitle: '',
      examStartTime: '' ,
      examTotalTime: '' ,
      examDescribe: '',
      paperTitle: '',
      selectedPaper: {},
      dataMilli: '', 
      timeMilli: '',
    }
    this.onBack = this.onBack.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
    this.onTimeChange = this.onTimeChange.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.onSearchLimit = this.onSearchLimit.bind(this)
    this.onCreateExam = this.onCreateExam.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onSelect = this.onSelect.bind(this)

  }

  render() {
    return (
      <div className='app-background'>
        <div className="exam-wrapper">
        <Topbar
          back={true}
          backContent={'返回'}
          onBack={this.onBack}></Topbar>
        <div className='exam-new-container'>
          {this.getCreatePaper()}
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
    // 2 判断是否从试卷管理跳转过来
    const title = this.props.match.params.paperTitle
    if(title === '-1'){
      let params = {
        userId: userInfo.userId,
        pageIndex: this.props.page
      }
      // 2.1 将查询条件放入缓存
      storage.set('paper-exam-limit-search', false) //非条件查询
      // 2.2 发送网络请求
      this.props.getPaperData(params)
    }else{
      // 1 整理查询条件
      let params = {
        pageIndex: this.props.page,
        userId: userInfo.userId,
        paperTitle: title
      }
      // 2 将查询条件放入缓存
      storage.set('paper-exam-limit-search', true) //标记条件查询
      // 3 通过中间件发送网络请求
      this.props.getSearchPaper(params)
      // 4 设置初始试卷
      this.setState(() => {
        return {
          paperTitle: title
        }
      }) 
    }
     
  }
  componentWillUnmount(){
    //清除缓存
    storage.remove('paper-exam-limit-search')
  }

  //创建试卷
  getCreatePaper() {
    const { examTitle, examTotalTime, examDescribe,  selectedPaper } = this.state
    return (
      <div className='exam-new-create-pannel'>
        <div className='exam-new-create-input-item'>
          <div className='exam-new-create-input-item-label'>考试名称:</div>
          <Input placeholder='输入考试名称'
            onChange={this.onInputChange}
            name='examTitle'
            value={examTitle}></Input>
        </div>
        <div className='exam-new-create-input-item'>
          <div className='exam-new-create-input-item-label'>考试开始时间:</div>
            <DatePicker onChange={this.onDateChange}  
              className='exam-new-datepicker'
              placeholder='请选择日期'/>
            <TimePicker  
              onChange={this.onTimeChange} 
              placeholder='请选择时间'/>
        </div>
        <div className='exam-new-create-input-item'>
          <div className='exam-new-create-input-item-label'>考试时长(分钟):</div>
          <Input placeholder='输入考试时长'
            onChange={this.onInputChange}
            name='examTotalTime'
            value={examTotalTime}
            className='exam-new-create-input'></Input>
        </div>
        <div className='exam-new-create-input-item'>
          <div className='exam-new-create-input-item-label'>考试说明:</div>
            <TextArea rows={4} 
              placeholder='输入考试说明'
              onChange={this.onInputChange}
              name='examDescribe'
              value={examDescribe}
              />
        </div>
        <div className='exam-new-create-input-item exam-new-create-input-item-center'>
          <span>已选试卷：{selectedPaper.length === 0 ? '未选择' : selectedPaper.title}</span>
        </div>
        <div className='exam-new-create-input-item exam-new-create-input-item-center'>
          <Button
            size='small'
            type="primary"
            ghost
            onClick={this.onCreateExam}>
            创建试卷
          </Button>
        </div>
      </div>
    )
  }
  //试卷列表
  getNewPaper(){
    const {  paperTitle, selectedPaper } = this.state
    const { totalNum, page, list } = this.props
    return (
      <div className='paper-create-topic-list'>
        <div className='paper-topic-select'>
          选择试卷
        </div>
        <div className='paper-list-search-pannel'>
          <div className='paper-list-item-input paper-list-search-item'>
            <label className='paper-list-item-input-title'>试卷名称：</label>
            <Input placeholder='输入试卷名称关键字'
              onChange={this.onInputChange}
              name='paperTitle'
              value={paperTitle}
              size='small'></Input>
          </div>
          <div className='topic-serch-bar-item'>
            <Button
              size='small'
              type="primary"
              ghost
              onClick={() => this.onSearchLimit(0)}>
              搜索
            </Button>
          </div>
          <div className='topic-serch-bar-item'>
            <Button
              size='small'
              type="primary"
              ghost
              onClick={() => this.onSearch(0)}>
              重置
            </Button>
          </div>
        </div>
        <TableList list={list}
          totalNum={totalNum}
          page={page}
          columns={columns}
          hideSelectAll={true}
          subjects={selectedPaper.length === 0 ? [] : [selectedPaper.key]}
          type={'radio'}
          isSelectedState={true}
          isOnSelect={true}
          onSelect={this.onSelect}
          onPageChange={this.onPageChange}></TableList>
      </div>
    )
  }

  //处理输入
  onInputChange(e) {
    let inputValue = e.target.value
    let inputName = e.target.name
    if (inputName === 'examTotalTime') {
      if (!this.isNumber(inputValue)){
        alert('请输入数字');
        return
      }
    }
    this.setState(() => {
      return {
        [inputName]: inputValue
      }
    })
  }
  //返回试卷列表页
  onBack() {
    this.props.history.push('/admin/exam/list')
  }
  //选择日期
  onDateChange(date, dateString) {
    if(dateString === ''){
      this.setState(() => {
        return {
          dataMilli: ''
        }
      })
      return
    }
    let dataTime = new Date(dateString)
    let dataMilli = (dataTime.getTime()) - 8*60*60*1000
    this.setState(() => {
      return {
        dataMilli
      }
    })
  }
  //选择时间
  onTimeChange(time, timeString) {
    if(timeString === ''){
      this.setState(() => {
        return {
          timeMilli: ''
        }
      })
      return
    }
    let timeDate = formatDate(new Date(time), 'yyyy-MM-dd')
    let newTime = (new Date(timeDate)).getTime() - 8*60*60*1000
    let oldTime = (new Date(time)).getTime()
    let timeMilli = oldTime - newTime
    this.setState(() => {
      return {
        timeMilli
      }
    })
  }
  //添加到题库题目列表
  onSelect(record) {
    this.setState(() => {
      return {
        selectedPaper: record
      }
    })
  }

  //创建试卷
  onCreateExam() {
    // 1 判断输入是否有误
    const { userId, dataMilli, timeMilli, examTitle, examTotalTime, examDescribe,  selectedPaper  } = this.state
    if(examTitle === ''){
      alert('考试名称未填')
      return
    }
    if(examTotalTime === '' ){
      alert('考试时长未填')
      return
    }
    if(examDescribe === ''){
      alert('考试说明未填')
      return
    }
    if( JSON.stringify(selectedPaper) === '{}' ? true : false){
      alert('未选择试卷')
      return
    }
    if(dataMilli === '' || timeMilli === ''){
      alert('请选择时间')
      return
    }

    // 2 整理网络请求参数
    let data = {
      userId,
      examId: Math.ceil(Math.random() * 1000000 ),
      examTitle,
      examStartTime: new Date(dataMilli + timeMilli) ,
      examTotalTime,
      examDescribe,
      paperId: selectedPaper.key
    }
    console.log(data)
    // 3 发送网络请求
    this.props.getSubmitExam(data)

    this.props.history.push('/admin/exam/list')

  }

  //无条件查询题目-重置
  onSearch(page ){
    // 1 整理请求条件
    let params = {
      userId: this.state.userId,
      pageIndex: page
    }
    // 2 将查询条件放入缓存
    storage.set('paper-exam-limit-search', false) //非条件查询
    // 3 发送网络请求
    this.props.getPaperData(params) 
    // 4 重置搜索条件
    this.setState(() => {
      return {
        paperTitle: '',
        // selectedPaper: []
      }
    })

  }
  //条件查询题目
  onSearchLimit(page ){
    const { paperTitle, userId } = this.state
    if( paperTitle === ''){
      alert('请输入试卷名称')
      return
    }
    // 1 整理查询条件
    let params = {
      paperTitle,
      pageIndex: page,
      userId: userId,
    }
    // 2 将查询条件放入缓存
    storage.set('paper-exam-limit-search', true) //标记条件查询
    // 3 通过中间件发送网络请求
    this.props.getSearchPaper(params)
  }
  //表单翻页
  onPageChange(page){
    // console.log(page,'table-page-change')
    // 1 修改store中的请求页码
    // this.props.getChangePageIndex(page - 1)
    // 2 查询当前是否为条件查询
    const flag = storage.get('paper-exam-limit-search')
    if(flag){
      //  2.1 条件查询下一页
      this.onSearchLimit(page-1)
    }else{
      // 2.2 无条件查询下一页
      this.onSearch(page-1)
    }
  }
  //验证是否为数字
  isNumber(value) {         
    var patrn = /^(-)?\d+(\.\d+)?$/;
    if(value === ''){return true}
    if (patrn.exec(value) === null ) {
      return false
    } else {
      return true
    }
  }

}

const mapStateToProps = (state) => {
  let newList = state.getIn(['paper', 'paperList']).toJS()
  let tableList = newList.map((item) => {
    return {
      key: item.id,
      title: item.title,
      totalCredit: item.singleCount * item.creditSingleSelection + item.multiCount * item.creditMultiSelection,
      createTime: formatDate(new Date(item.timeCreate), 'yyyy-MM-dd hh:mm')
    }
  })
  return {
    page: state.getIn(['paper','page']),
    totalNum: state.getIn(['paper', 'totalNum']),
    list: tableList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPaperData(params){
      dispatch(paperCreators.getPaperData(params))
    },
    getSearchPaper(params){
      dispatch(paperCreators.searchPaper(params))
    },
    getSubmitExam(data){
      dispatch(actionCreators.submitExam(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewExam);

