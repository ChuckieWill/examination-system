import React, { Component } from 'react';
import { connect } from 'react-redux';
import Topbar from '../../common/topbar';
import { actionCreators as topicCreaors} from '../topic/store';
import { actionCreators } from './store' ;
import storage from '../../utils/storage';
import { Cascader, Button, Input } from 'antd';
import './style.css';
// import PaperTable from './common/paperTable';
import TableList from '../../common/table/index';

const types = [
  {
    value: '0',
    label: '单选题',
  }, {
    value: '1',
    label: '多选题',
  }
]

const difficultys = [
  {
    value: '0',
    label: '一星'
  }, {
    value: '1',
    label: '二星'
  }, {
    value: '2',
    label: '三星'
  }, {
    value: '3',
    label: '四星'
  }, {
    value: '4',
    label: '五星'
  }
]

const categorys = [
  {
    value: '一年级',
    label: '一年级',
  }, {
    value: '二年级',
    label: '二年级',
  }, {
    value: '三年级',
    label: '三年级',
  }, {
    value: '四年级',
    label: '四年级',
  }, {
    value: '五年级',
    label: '五年级',
  }, {
    value: '六年级',
    label: '六年级',
  },
]

const columns = [
  {
    title: '题目',
    dataIndex: 'title',
    key: 'title',
    ellipsis: 'true',

  },
  {
    title: '题目分类',
    dataIndex: 'category',
    key: 'category',
    align: 'center'

  },
  {
    title: '题型',
    dataIndex: 'type',
    key: 'type',
    align: 'center'
  },
  {
    title: '难度',
    dataIndex: 'difficulty',
    key: 'difficulty',
    align: 'center'
  }
]

class CreatePaper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: ['0'],
      category: ['一年级'],
      title: '',
      creditSingleSelection: '',
      creditMultiSelection: '',
      singleCount: 0,
      multiCount: 0,
      subjects: []
    }
    this.onBack = this.onBack.bind(this)
    this.onTypeChange = this.onTypeChange.bind(this)
    this.onCategoryChange = this.onCategoryChange.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.onSearchLimit = this.onSearchLimit.bind(this)
    this.onCreatePaper = this.onCreatePaper.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onSelect = this.onSelect.bind(this)

  }

  render() {
    return (
      <div className='app-background'>
        <div className="paper-wrapper">
          <Topbar
            back={true}
            backContent={'返回'}
            onBack={this.onBack}></Topbar>

          <div className='paper-container'>
            {this.getCreatePaper()}
            {this.getNewPaper()}
          </div>
        </div>
      </div>
      
    )
  }
  componentDidMount() {
    // 1 获取本地缓存数据-userId
    const userInfo = storage.get('userInfo')
    console.log(userInfo.userId)
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
    storage.set('paper-limit-search', false) //非条件查询
    // 3 发送网络请求
    this.props.getTopicData(params)
  }
  componentWillUnmount() {
    //清除缓存
    storage.remove('paper-limit-search')
  }

  //创建试卷
  getCreatePaper() {
    const { title, creditSingleSelection, creditMultiSelection, singleCount, multiCount } = this.state
    return (
      <div className='paper-create-pannel'>
        <div className='paper-create-input-item'>
          <div>试卷名称：</div>
          <Input placeholder='输入试卷名称'
            onChange={this.onInputChange}
            name='title'
            value={title}
            className='paper-create-input'></Input>
        </div>
        <div className='paper-create-input-item'>
          <label>单选题分值:</label>
          <Input placeholder='输入单选题分值'
            onChange={this.onInputChange}
            name='creditSingleSelection'
            value={creditSingleSelection}
            className='paper-create-input'></Input>
        </div>
        <div className='paper-create-input-item'>
          <label>多选题分值:</label>
          <Input placeholder='输入多选题分值'
            onChange={this.onInputChange}
            name='creditMultiSelection'
            value={creditMultiSelection}
            className='paper-create-input'></Input>
        </div>
        <div className='paper-create-input-item'>
          <span>单选题数：{singleCount}</span>
          <span>多选题数：{multiCount}</span>
        </div>
        <div className='paper-create-input-item'>
          <span>总题数：{singleCount + multiCount}</span>
          <span>总数：{singleCount * creditSingleSelection + multiCount * creditMultiSelection}</span>
        </div>
        <div className='paper-create-input-item'>
          <Button
            size='small'
            type="primary"
            ghost
            onClick={this.onCreatePaper}>
            创建试卷
          </Button>
        </div>
      </div>
    )
  }
  //试题列表
  getNewPaper() {
    const { type, category, subjects } = this.state
    const { totalNum, page, list } = this.props
    return (
      <div className='paper-create-topic-list'>
        <div className='paper-topic-select'>
          选择题目
        </div>
        <div className='topic-serch-bar'>
          <div className='topic-serch-bar-item'>
            <label>题型: </label>
            <Cascader size="small"
              options={types}
              onChange={this.onTypeChange}
              placeholder='选择题型'
              value={type} />
          </div>
          <div className='topic-serch-bar-item'>
            <label>题目分类: </label>
            <Cascader size="small"
              options={categorys}
              onChange={this.onCategoryChange}
              placeholder='选择题目分类'
              value={category} />
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
          subjects={subjects}
          hideSelectAll={true}
          isOnSelect={true}
          isSelectedState={true}
          onSelect={this.onSelect}
          onPageChange={this.onPageChange}></TableList>
      </div>
    )
  }

  //处理输入
  onInputChange(e) {
    let inputValue = e.target.value
    let inputName = e.target.name
    if (inputName === 'creditSingleSelection' || inputName === 'creditMultiSelection') {
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
    this.props.history.push('/admin/paper/list')
  }
  //题型选择
  onTypeChange(value) {
    this.setState(() => {
      return {
        type: value
      }
    })
  }
  //题目分类选择
  onCategoryChange(value) {
    this.setState(() => {
      return {
        category: value
      }
    })
  }
  //添加到题库题目列表
  onSelect(record, selected) {
    let  { singleCount, multiCount, subjects} = this.state
    if(selected){
      subjects.push(record.key)
      if(record.type === '单选题'){
        singleCount++
      }else{
        multiCount++
      }
    }else{
      let index = subjects.indexOf(record.key)
      subjects.splice(index, 1)
      if(record.type === '单选题'){
        singleCount--
      }else{
        multiCount--
      }
    }
    this.setState(() => {
      return{
        singleCount,
        multiCount,
        subjects
      }
    })

  }

  //创建试卷
  onCreatePaper() {
    // 1 判断输入是否有误
    const { userId, title, creditSingleSelection, creditMultiSelection, singleCount, multiCount, subjects } = this.state
    if(title === ''){
      alert('试卷名称未填')
      return
    }
    if(creditSingleSelection === '' || creditMultiSelection === ''){
      alert('题目分数未填')
      return
    }
    if(singleCount + multiCount === 0){
      alert('未添加题目')
      return
    }

    // 2 整理网络请求参数
    let data = {
      userId,
      title,
      creditSingleSelection,
      creditMultiSelection,
      singleCount,
      multiCount,
      timeCreate: new Date(),
      subjects
    }
    // 3 发送网络请求
    this.props.getSubmitPaper(data)
    // 4 创建完成并退出
    this.setState(() => {
      return {
        type: ['0'],
        category: ['一年级'],
        title: '',
        creditSingleSelection: '',
        creditMultiSelection: '',
        singleCount: 0,
        multiCount: 0,
        subjects: []
      }
    })
    this.props.history.push('/admin/paper/list')

  }

  //无条件查询题目-重置
  onSearch(page) {
    // 1 整理请求条件
    let params = {
      userId: this.state.userId,
      pageIndex: page
    }
    // 2 将查询条件放入缓存
    storage.set('topic-limit-search', false) //非条件查询
    // 3 发送网络请求
    this.props.getTopicData(params)
    // 4 重置搜索条件
    this.setState(() => {
      return {
        type: ['0'],
        category: ['一年级']
      }
    })

  }
  //条件查询题目
  onSearchLimit(page) {
    // 1 整理查询条件
    let params = {
      pageIndex: page,
      userId: this.state.userId,
      category: this.state.category[0],
      type: this.state.type[0],
    }
    // 2 将查询条件放入缓存
    storage.set('paper-limit-search', true) //标记条件查询
    // 3 通过中间件发送网络请求
    this.props.getSearchTopic(params)
  }
  //表单翻页
  onPageChange(page) {
    // console.log(page,'table-page-change')
    // 1 修改store中的请求页码
    // this.props.getChangePageIndex(page - 1)
    // 2 查询当前是否为条件查询
    const flag = storage.get('paper-limit-search')
    if (flag) {
      //  2.1 条件查询下一页
      this.onSearchLimit(page - 1)
    } else {
      // 2.2 无条件查询下一页
      this.onSearch(page - 1)
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
  let newList = state.getIn(['topic', 'topicList']).toJS()
  let tableList = newList.map((item) => {
    return {
      key: item.id,
      title: item.title,
      type: types[item.type].label,
      category: item.category,
      difficulty: difficultys[item.difficulty].label
    }
  })
  return {
    page: state.getIn(['topic', 'page']),
    totalNum: state.getIn(['topic', 'totalNum']),
    list: tableList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTopicData(params) {
      dispatch(topicCreaors.getTopicData(params))
    },
    getSearchTopic(params) {
      dispatch(topicCreaors.searchTopic(params))
    },
    getSubmitPaper(data){
      dispatch(actionCreators.submitPaper(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePaper);

