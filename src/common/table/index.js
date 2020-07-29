import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table, Popconfirm } from 'antd';

//


class  TableList  extends Component { 
  constructor(props){
    super(props)
    this.state = {
      selectedRowKeys: [], 
      newColumns: []
    };
    this.onChange = this.onChange.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.onSelectAll = this.onSelectAll.bind(this)
    this.onNavChange = this.onNavChange.bind(this)

  }
  render() {
    const { list,totalNum,page, hideSelectAll, type, } = this.props
    const { selectedRowKeys, newColumns} = this.state;
    const rowSelection = {
      type: type ? type : 'checkbox',
      selectedRowKeys,
      hideSelectAll: hideSelectAll ? hideSelectAll : false,
      onChange: this.onChange,
      onSelect: this.onSelect,
      onSelectAll: this.onSelectAll,
    };
    const pagination = {
      total: totalNum,
      current: page+1,
      onChange: this.onPageChange
    }
    return (
      <div>
        <Table style={{ marginBottom: 16 }} 
          rowSelection={  rowSelection} 
          columns={newColumns} 
          dataSource={list}
          pagination={pagination} />
      </div>
    );
  }

  componentDidMount(){
    let columns = this.props.columns
    if(this.props.isSelectedState){
      this.setState(() => {
        return {
          selectedRowKeys: this.props.subjects
        }
      })
    }
    const flag = columns.find((item) => {
      return item.title === '操作'
    })
    if(flag) {
      this.setState(() => {
        return {
          newColumns: columns
        }
      })
      return
    }
    if( this.props.isDelShow ){
      columns.push({
        title: '操作',
        align: 'center',
        render: (text, record) =>
          this.props.list.length >= 1 ? (
            <Popconfirm title="确定删除吗?" onConfirm={() => this.handleDelete(record.key)}>
              <a href='删除'>删除</a>
            </Popconfirm>
          ) : null,
      })
    }
    if( this.props.isNavShow ){
      columns.push({
        title: '操作',
        align: 'center',
        render: (text, record) => {
          return (
              <a  onClick={() => this.onNavChange(record)} >创建考试</a>
          )
        }
          
      })
    }
    if( this.props.isNavGradeShow ){
      columns.push({
        title: '操作',
        align: 'center',
        render: (text, record) => {
          return (
              <a  onClick={() => this.onNavChange(record)} >查看成绩</a>
          )
        }
          
      })
    }
    this.setState(() => {
      return {
        newColumns: columns
      }
    })
    
  }



  onNavChange(record){
    this.props.onNavChange(record)
  }
  onChange(selectedRowKeys){
    if(this.props.isOnChange){
      this.props.onChange(selectedRowKeys, 'delMul')
    }
    this.setState({ selectedRowKeys });
  }
  onSelect(record, selected){
    if(this.props.isOnSelect){
      this.props.onSelect(record, selected)
    }
  }
  onSelectAll(selected, selectedRows){
    if(this.props.isOnSelectAll){
      this.props.onSelectAll(selected, selectedRows)
    }
  }
  //删除
  handleDelete = key => {
    let list = []
    list.push(key)
    this.props.onChange(list, 'delOne')

  };
  //页码改变
  onPageChange = (page) => {
    this.props.onPageChange(page)
    if(this.props.isSelectedState){
      this.setState(() => {
        return {
          selectedRowKeys: this.props.subjects
        }
      })
    }
  }
}

export default TableList;