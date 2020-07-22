import React, { Component } from 'react';
// import { TopbarWrapper } from './style';
import { Button } from 'antd';
import { PlusCircleOutlined, DeleteOutlined, FileDoneOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './style.css';

class  Topbar  extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      
    }
    // this.props = {
    //   add: false, //控制添加按钮显示
    //   addContent: '',//添加按钮的内容
    //   del: false,//控制删除按钮显示
    //   delContent: '',//删除按钮的内容
    //   sel: false, //控制选择按钮显示
    //   selContent: '',//选择按钮内容
    // }
    this.onAdd = this.onAdd.bind(this)
    this.onDel = this.onDel.bind(this)
    this.onSel = this.onSel.bind(this)
  }  
  render() {
    return (
      <div className='tapbar-wrapper'>
        {this.getAdd()}
        {this.getDel()}
        {this.getSel()}
      </div>
    )
  }

  getAdd(){
    if(this.props.add){
      return (
        <Button type="primary" shape="round" 
          icon={<PlusCircleOutlined />} 
          onClick={this.onAdd}
          className='button-item'
          >
          {this.props.addContent}
        </Button>
      )
    }
  }

  getDel(){
    if(this.props.del){
      return (
        <Button  shape="round" 
           type="primary" 
           ghost
          icon={<DeleteOutlined />} 
          onClick={this.onDel}
          className='button-item'>
          {this.props.delContent}
        </Button>
      )
    }
  }

  getSel(){
    if(this.props.sel){
      return (
        <Button  shape="round" 
           type="primary" 
           ghost
          icon={<FileDoneOutlined />} 
          onClick={this.onSel}
          className='button-item'>
          {this.props.selContent}
        </Button>
      )
    }
  }

  //处理添加操作
  onAdd(){
    this.props.onAdd()
  }

  //处理删除操作
  onDel() {
    this.props.onDel()
  }

  //处理选择操作
  onSel(){
    this.props.onSel()
  }
}


export default Topbar;
