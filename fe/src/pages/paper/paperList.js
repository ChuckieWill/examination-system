import React, { Component } from 'react';
import { connect } from 'react-redux';
import Topbar from '../../common/topbar';
import TableList from '../../common/table';
import { actionCreators } from './store';
import storage from '../../utils/storage';
import { Input, Button  } from 'antd';
import { formatDate } from '../../utils/formatTime/formatTime';
import './style.css';
import { actionCreators as sidebarCreators } from '../../common/sidebar/store';


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

class  PaperList  extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      delList: []
    }
    this.onAddPaper = this.onAddPaper.bind(this)
    this.onDelPaper = this.onDelPaper.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.onSearchLimit = this.onSearchLimit.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onDelTopic = this.onDelTopic.bind(this)
    this.onNavChange = this.onNavChange.bind(this)

  }

  render() {
    return (
      <div className='app-background'>
        <div className="paper-wrapper">
          <Topbar add={true} 
            addContent={'创建试卷'}
            onAdd={this.onAddPaper}
            del={true}
            delContent={'删除试卷'}
            onDel={this.onDelPaper}></Topbar>
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
    storage.set('paper-search', params)
    storage.set('paper-limit-search', false) //非条件查询
    // 3 发送网络请求
    this.props.getPaperData(params) 
  }
  componentWillUnmount(){
    //清除缓存
    storage.remove('paper-search')
    storage.remove('paper-limit-search')
  }


  //创建试卷
  getNewPaper(){
    const {  title } = this.state
    const { totalNum, page, list } = this.props
    return (
      <div>
        <div className='paper-list-search-pannel'>
          <div className='paper-list-item-input paper-list-search-item'>
            <label className='paper-list-item-input-title'>试卷名称：</label>
            <Input placeholder='输入试卷名称关键字'
              onChange={this.onInputChange}
              name='title'
              value={title}
              size='small'></Input>
          </div>
          <div className='paper-list-search-item'>
            <Button  
              size='small'
              type="primary" 
              ghost
              onClick={() => this.onSearchLimit(0)}>
              搜索
            </Button>
          </div>
          <div className='paper-list-search-item'>
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
          isNavShow={true}
          isOnChange={true}
          onNavChange={this.onNavChange}
          onChange={this.onDelTopic}
          onPageChange={this.onPageChange}></TableList>
      </div>
    )
  }
  //跳转到考试创建页面
  onNavChange(record){
    this.props.history.push('/admin/exam/new/' + record.title)
    this.props.onChange('/admin/exam/new')
  }
  //创建试卷
  onAddPaper(){
    this.props.history.push('/admin/paper/create')
  }
  //处理输入
  onInputChange(e) {
    let inputValue = e.target.value
    let inputName = e.target.name
    this.setState(() => {
      return {
        [inputName]: inputValue
      }
    })
  }
  //删除试卷
  onDelPaper(){
    console.log('删除试卷')
    const {userId, delList} = this.state
    // 1 判断是否有删除的内容
    if(delList.length === 0){
      alert('请勾选需要删除的试卷')
      return
    }
    // 2 整理删除参数
    let params = {
      userId: userId,
      papers: delList
    }
    // 3 发送网络请求
    this.props.getDelPaper(params)
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
  }

  //无条件查询题目-重置
  onSearch(page ){
    // 1 整理请求条件
    let params = {
      userId: this.state.userId,
      pageIndex: page
    }
    // 2 将查询条件放入缓存
    storage.set('paper-search', params)
    storage.set('paper-limit-search', false) //非条件查询
    // 3 发送网络请求
    this.props.getPaperData(params) 
    // 4 重置搜索条件
    this.setState(() => {
      return {
        title: ''
      }
    })

  }
  //条件查询题目
  onSearchLimit(page ){
    const { title, userId } = this.state
    if( title === ''){
      alert('请输入试卷名称')
      return
    }
    // 1 整理查询条件
    let params = {
      pageIndex: page,
      userId: userId,
      paperTitle: title
    }
    // 2 将查询条件放入缓存
    storage.set('paper-search', params)
    storage.set('paper-limit-search', true) //标记条件查询
    // 3 通过中间件发送网络请求
    this.props.getSearchPaper(params)
  }
  //表单翻页
  onPageChange(page){
    // console.log(page,'table-page-change')
    // 1 修改store中的请求页码
    // this.props.getChangePageIndex(page - 1)
    // 2 查询当前是否为条件查询
    const flag = storage.get('paper-limit-search')
    if(flag){
      //  2.1 条件查询下一页
      this.onSearchLimit(page-1)
    }else{
      // 2.2 无条件查询下一页
      this.onSearch(page-1)
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
      dispatch(actionCreators.getPaperData(params))
    },
    getSearchPaper(params){
      dispatch(actionCreators.searchPaper(params))
    },
    onChange(path){
      dispatch(sidebarCreators.getChangeIndex(path))
    },
    getDelPaper(params){
      dispatch(actionCreators.delPaper(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaperList);

