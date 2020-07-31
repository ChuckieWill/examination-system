import React, { Component } from 'react';
import Topbar from '../../common/topbar';
// import { TopicWrapper } from './style';
import './style.css';
import { Cascader, Button, Input, Checkbox  } from 'antd';
import 'antd/dist/antd.css';
import { actionCreators } from './store';
import { connect } from 'react-redux';
import storage from '../../utils/storage';
import TableList from '../../common/table';
import { formatDate } from '../../utils/formatTime/formatTime';

const { TextArea } = Input;

const types = [
  {
    value: '0',
    label: '单选题',
  },{
    value: '1',
    label: '多选题',
  }
]

const categorys = [
  {
    value: '一年级',
    label: '一年级',
  },{
    value: '二年级',
    label: '二年级',
  },{
    value: '三年级',
    label: '三年级',
  },{
    value: '四年级',
    label: '四年级',
  },{
    value: '五年级',
    label: '五年级',
  },{
    value: '六年级',
    label: '六年级',
  },
]

const difficultys = [
  {
    value: '0',
    label: '一星'
  },{
    value: '1',
    label: '二星'
  },{
    value: '2',
    label: '三星'
  },{
    value: '3',
    label: '四星'
  },{
    value: '4',
    label: '五星'
  }
]

const columns = [
  {
    title: '题目',
    dataIndex: 'title',
    key:'title',
    ellipsis: 'true',

  },
  {
    title: '题目分类',
    dataIndex: 'category',
    key:'category',
    align: 'center'

  },
  {
    title: '题型',
    dataIndex: 'type',
    key:'type',
    align: 'center'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key:'createTime',
    align: 'center'
  }
]


class  Topic  extends Component {  
  constructor(props){
    super(props)
    this.state = {
      addTopicShow: false,//控制添加题目的显示
      type: ['0'],
      category: ['一年级'],
      difficulty: ['0'],
      title: '',//题目标题
      option1: '',//题目选项
      option2: '',
      option3: '',
      option4: '',
      answers: [{selected: false},{selected: false},{selected: false},{selected: false}], //答案
      userId: 0,
      delList: [], //多条删除的条目id
    }
    this.onAddTopic = this.onAddTopic.bind(this)
    this.onTypeChange = this.onTypeChange.bind(this)
    this.onCategoryChange = this.onCategoryChange.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onAnswerChange = this.onAnswerChange.bind(this)
    this.onDifficultyChange = this.onDifficultyChange.bind(this)
    this.onSubmitTopic = this.onSubmitTopic.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.onDelTopic = this.onDelTopic.bind(this)
    this.onBack = this.onBack.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.onSearchLimit = this.onSearchLimit.bind(this)
    this.onDelAllTopic = this.onDelAllTopic.bind(this)
    
  } 
  render() {
    const { addTopicShow } = this.state
    return (
      <div className='app-background'>
        <div className="topic-wrapper">
        <Topbar add={!addTopicShow} 
          addContent={'添加题目'}
          onAdd={this.onAddTopic}
          del={!addTopicShow}
          delContent={'删除题目'}
          onDel={this.onDelAllTopic}
          back={addTopicShow}
          backContent={'返回'}
          onBack={this.onBack}></Topbar>
        <div className='topic-container'>
          { this.getHomeTopic() }
          { this.getSellectTopic() }
        </div>
      </div>
      </div>
      
    )
  }
  componentDidMount(){
    // 1 获取本地缓存数据-userId
    const userInfo = storage.get('userInfo')
    const isCreate = this.props.match.params.isCreate
    this.setState(() => {
      return {
        userId: userInfo.userId,
        addTopicShow: isCreate === 'true' ? true :  false
      }
    })
    let params = {
      userId: userInfo.userId,
      pageIndex: this.props.page
    }
    // 2 将查询条件放入缓存
    storage.set('topic-search', params)
    storage.set('topic-limit-search', false) //非条件查询
    // 3 发送网络请求
    this.props.getTopicData(params) 
  }
  componentWillUnmount(){
    //清除缓存
    storage.remove('topic-search-info')
    storage.remove('topic-limit-search')
  }
  //创建题目
  getSellectTopic(){
    const { addTopicShow, difficulty, category, type, title, option1,option2,option3,option4, answers} = this.state
    if(addTopicShow){
      return (
        <div>
          <div className='topic-serch-bar'>
            {/* 1 题目属性选择面板 */}
            <div className='topic-serch-bar-item'>
              <label>题型: </label>
              <Cascader size="small" 
              options={types} 
              onChange={this.onTypeChange} 
              placeholder='选择题型'
              value={type}/>
            </div>
            <div className='topic-serch-bar-item'>
              <label>题目分类: </label>
              <Cascader size="small" 
              options={categorys} 
              onChange={this.onCategoryChange} 
              placeholder='选择题目分类'
              value={category}/>
            </div>
            <div className='topic-serch-bar-item'>
            <label>题目难度: </label>
              <Cascader size="small" 
              options={difficultys} 
              onChange={this.onDifficultyChange} 
              placeholder='选择题目难度'
              value={difficulty}/>
            </div>
          </div>
          {/* 2 题目录入面板 */}
          <div className='topic-submit-data'>
            {/* 2.1 标题录入 */}
            <div className='topic-data-title'>
              <div className='topic-describ'>
                <div className='topic-icon'>题干</div>
                这里写题目描述
              </div>
              <div className='topic-title-input'>
                <div className='topic-title-div'></div>
                <TextArea rows={4} 
                  onChange={this.onInputChange}
                  name='title'
                  value={title}
                  />
              </div> 
            </div>
            {/* 2.2 选项录入 */}
            <div className='topic-data-options'>
              <div className='topic-describ'>
                <div className='topic-icon'>选项</div>
                这里写选项描述
              </div>
              <div className='topic-option'>
                <label className='topic-option-lable'>A.</label>
                <Input 
                  onChange={this.onInputChange}
                  name='option1'
                  value={option1}/>
              </div>
              <div className='topic-option'>
                <label className='topic-option-lable'>B.</label>
                <Input 
                  onChange={this.onInputChange}
                  value={option2}
                  name='option2'/>
              </div>
              <div className='topic-option'>
                <label className='topic-option-lable'>C.</label>
                <Input 
                  onChange={this.onInputChange}
                  value={option3}
                  name='option3'/>
              </div>
              <div className='topic-option'>
                <label className='topic-option-lable'>D.</label>
                <Input 
                  onChange={this.onInputChange}
                  value={option4}
                  name='option4'/>
              </div>
              
            </div>
            {/* 2.3 答案录入 */}
            <div className='topic-data-answer'>
              <div className='topic-describ'>
                <div className='topic-icon'>答案</div>
                这里写答案
              </div>
              <div className='topic-title-input'>
                <div className='topic-title-div'></div>
                <div className='topic-answer'>
                  <div className='topic-answer-item'>
                    <Checkbox onChange={(e) => this.onAnswerChange(e,0)}
                      className='topic-answer-icon'
                      checked={answers[0].selected}>A</Checkbox>
                  </div>
                  <div className='topic-answer-item'>
                    <Checkbox onChange={(e) => this.onAnswerChange(e,1)}
                      className='topic-answer-icon'
                      checked={answers[1].selected}>B</Checkbox>
                  </div>
                  <div className='topic-answer-item'>
                    <Checkbox onChange={(e) => this.onAnswerChange(e,2)}
                      className='topic-answer-icon'
                      checked={answers[2].selected}>C</Checkbox>
                  </div>
                  <div className='topic-answer-item'>
                    <Checkbox onChange={(e) => this.onAnswerChange(e,3)}
                      className='topic-answer-icon'
                      checked={answers[3].selected}>D</Checkbox>
                  </div>
                </div>
              </div> 
            </div>
          </div>
          {/* 3 保存题目 */}
          <div className='topic-submit'>
            <Button type="primary" 
              size= 'small'
              onClick={() => this.onSubmitTopic('next')}>
              保存并添加下一题
            </Button>
            <Button  
              type="primary" 
              size= 'small'
              ghost
              onClick={() => this.onSubmitTopic('exit')}>
              保存并退出
            </Button>
          </div>
        </div>
      )
    }
  }
  //题目管理首页
  getHomeTopic(){
    const { addTopicShow, type, category} = this.state
    const { totalNum, page, list } = this.props
    if(!addTopicShow){
      return (
        <div>
          <div className='topic-serch-bar'>
            <div className='topic-serch-bar-item'>
              <label>题型: </label>
              <Cascader size="small" 
              options={types} 
              onChange={this.onTypeChange} 
              placeholder='选择题型'
              value={type}/>
            </div>
            <div className='topic-serch-bar-item'>
              <label>题目分类: </label>
              <Cascader size="small" 
              options={categorys} 
              onChange={this.onCategoryChange} 
              placeholder='选择题目分类'
              value={category}/>
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
            isDelShow={true}
            isOnChange={true}
            onChange={this.onDelTopic}
            onPageChange={this.onPageChange}></TableList>
        </div>
      )
    }
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
  onCategoryChange(value){
    this.setState(() => {
      return {
        category: value
      }
    })
  }
  //题目难度选择
  onDifficultyChange(value){
    this.setState(() => {
      return {
        difficulty: value
      }
    })
  }
  //题目和选项输入处理
  onInputChange(e){
    let inputValue = e.target.value
    let inputName = e.target.name
    this.setState(() => {
      return {
        [inputName] : inputValue
      }
    })
  }
  //答案输入处理
  onAnswerChange(e ,index){
    let answers = this.state.answers
    answers[index].selected = e.target.checked
    this.setState(() => {
      return {
        answers
      }
    })
    console.log(this.state.answers)
  }
  //添加题目
  onAddTopic(){
    this.setState(() => {
      return {
        addTopicShow: true
      }
    })
  }
  //无条件查询题目-重置
  onSearch(page ){
    // 1 整理请求条件
    let params = {
      userId: this.state.userId,
      pageIndex: page
    }
    // 2 将查询条件放入缓存
    storage.set('topic-search', params)
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
  onSearchLimit(page ){
    // 1 整理查询条件
    let params = {
      pageIndex: page,
      userId: this.state.userId,
      category: this.state.category[0],  
      type: this.state.type[0],
    }
    // 2 将查询条件放入缓存
    storage.set('topic-search', params)
    storage.set('topic-limit-search', true) //标记条件查询
    // 3 通过中间件发送网络请求
    this.props.getSearchTopic(params)
  }
  //表单翻页
  onPageChange(page){
    // console.log(page,'table-page-change')
    // 1 修改store中的请求页码
    // this.props.getChangePageIndex(page - 1)
    // 2 查询当前是否为条件查询
    const flag = storage.get('topic-limit-search')
    if(flag){
      //  2.1 条件查询下一页
      this.onSearchLimit(page-1)
    }else{
      // 2.2 无条件查询下一页
      this.onSearch(page-1)
    }
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
  //删除题目-多条
  onDelAllTopic(){
    if(this.state.delList.length === 0){
      alert('未勾选删除的题目')
      return
    }
    // 1 整理删除参数
    let params = {
      userId: this.state.userId,
      subIds: this.state.delList
    }
    console.log(params)
    // 2 发送网络请求
    this.props.getDelTopic(params)
  }
  //提交题目
  onSubmitTopic(submit){
    const {type, category, difficulty, userId, title, option1, option2, option3, option4, answers} = this.state
    let answerFlag = false //记录是否填写答案
    let answer = []
    let  options = []
    if(title === ''){
      alert('题目标题未填')
      return
    }
    if(option1 !== ''){
      options.push(option1)
    }else{
      alert('选项A未填')
      return
    }
    if(option2 !== ''){
      options.push(option1)
    }else{
      alert('选项B未填')
      return
    }
    if(option3 !== ''){
      options.push(option1)
    }else{
      alert('选项C未填')
      return
    }
    if(option4 !== ''){
      options.push(option1)
    }else{
      alert('选项D未填')
      return
    }
    for(let i = 0 ; i<4; i++){
      if(answers[i].selected){
        answerFlag = true
        answer.push(i)
      }
    }
    if(!answerFlag){
      alert('未填答案')
      return 
    }
    let data = {
      userId,
      title,
      options,
      answer,
      category: category[0],
      type: type[0],
      difficulty: difficulty[0],
      createTime: new Date()
    }
    // console.log(data)
    
    this.setState(() => {
      return {
        type: ['0'],
        category: ['一年级'],
        difficulty: ['0'],
        title: '',//题目标题
        option1: '',//题目选项
        option2: '',
        option3: '',
        option4: '',
        answers: [{selected: false},{selected: false},{selected: false},{selected: false}], //答案
      }
    })
    //发送网络请求
    this.props.getSubmitTopic(data)
    //保存并退出
    if(submit === 'exit'){
      this.setState(() => {
        return {
          addTopicShow: false
        }
      })
    }
  }
  //从创建题目页面返回题目首页
  onBack(){
    this.setState(() => {
      return {
        addTopicShow: false,
        type: ['0'],
        category: ['一年级'],
        difficulty: ['0'],
        title: '',//题目标题
        option1: '',//题目选项
        option2: '',
        option3: '',
        option4: '',
        answers: [{selected: false},{selected: false},{selected: false},{selected: false}], //答案
      }
    })
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
      createTime: formatDate(new Date(item.createTime), 'yyyy-MM-dd hh:mm')
    }
  })
  return {
    page: state.getIn(['topic','page']),
    totalNum: state.getIn(['topic', 'totalNum']),
    list: tableList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTopicData(params){
      dispatch(actionCreators.getTopicData(params))
    },
    getSubmitTopic(data){
      dispatch(actionCreators.submitTopic(data))
    },
    getSearchTopic(params){
      dispatch(actionCreators.searchTopic(params))
    },
    getDelTopic(params){
      dispatch(actionCreators.delTopic(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Topic);

