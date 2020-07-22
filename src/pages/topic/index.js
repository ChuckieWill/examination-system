import React, { Component } from 'react';
import Topbar from '../../common/topbar';
// import { TopicWrapper } from './style';
import './style.css';
import { Cascader, Button } from 'antd';
import 'antd/dist/antd.css';
import { actionCreators } from './store';
import { connect } from 'react-redux';


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

class  Topic  extends Component {  
  constructor(props){
    super(props)
    this.onAddTopic = this.onAddTopic.bind(this)
    this.onDelTopic = this.onDelTopic.bind(this)
    this.onTypeChange = this.onTypeChange.bind(this)
    this.onCategoryChange = this.onCategoryChange.bind(this)
    this.state = {
      addTopicShow: false,
      type: ['0'],
      category: ['一年级']
    }
    this.props.getTopicData(this.props.userId) //获取题目数据
  } 
  render() {
    const { addTopicShow } = this.state
    return (
      <div className="topic-wrapper">
        <Topbar add={!addTopicShow} 
          addContent={'添加题目'}
          onAdd={this.onAddTopic}
          del={!addTopicShow}
          delContent={'删除题目'}
          onDel={this.onDelTopic}></Topbar>
        <div className='topic-container'>
          { this.getHomeTopic() }
          { this.getSellectTopic() }
        </div>
      </div>
    )
  }
  //创建题目
  getSellectTopic(){
    const { addTopicShow } = this.state
    if(addTopicShow){

    }
  }
  //题目管理首页
  getHomeTopic(){
    const { addTopicShow, onTypeChange, onCategoryChange, type, category} = this.state
    if(!addTopicShow){
      return (
        <div>
          <div className='topic-serch-bar'>
            <div className='topic-serch-bar-item'>
              <label>题型: </label>
              <Cascader size="small" 
              options={types} 
              onChange={onTypeChange} 
              placeholder='选择题型'
              defaultValue={type}/>
            </div>
            <div className='topic-serch-bar-item'>
              <label>题目分类: </label>
              <Cascader size="small" 
              options={categorys} 
              onChange={onCategoryChange} 
              placeholder='选择题目分类'
              defaultValue={category}/>
            </div>
            <div className='topic-serch-bar-item'>
              <Button  
                size='small'
                type="primary" 
                ghost
                onClick={this.onDel}>
                搜索
              </Button>
            </div>
          </div>
          
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
  //添加题目
  onAddTopic(){
    console.log('tinajaiajaia')
  }
  //删除题目
  onDelTopic(){
    console.log('del')
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.getIn(['login','userId'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTopicData(userId){
      dispatch(actionCreators.getTopicData(userId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Topic);

