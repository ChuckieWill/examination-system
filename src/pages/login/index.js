import React, { Component } from 'react';
import { LoginWrapper } from './style';
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { actionCreators } from './store';


class  Login  extends Component {   
  constructor(props){
    super(props)
    this.state = {
      currentTab: true,//控制登录与注册的切换
      launch: false, //控制验证码的发送
      account: '',//用户名
      password: '',//密码
      conPassword: '',//确认密码
    }
    this.changeTab = this.changeTab.bind(this)
    this.getLogin = this.getLogin.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onRegister = this.onRegister.bind(this)
  }
  render() {
    return (
      <LoginWrapper>
        <div className='login'>
          <div className='pannel'>
            <div className='title'>在线考试系统</div>
            <div className='change'>
              <div className={this.state.currentTab ? 'tab tab-active' : 'tab '}
                onClick={this.changeTab}>登录</div>
              <div className={!this.state.currentTab ? 'tab tab-active' : 'tab '}
                onClick={this.changeTab}>注册</div>
            </div>
            {
              this.getLogin()
            }
          </div>
        </div>
        
      </LoginWrapper>
    )
  }

  componentDidUpdate() {
    //登录成功  跳转到首页
    if(this.props.status){
      setTimeout(() => {
        this.props.history.push('/admin')
      },500)
      
    }
  }



  //控制登录、注册界面的切换
  getLogin(){
    const { onSignIn } = this.props
    if(this.state.currentTab){
      return (
        <div >
          <Input className='login-contan' 
            placeholder="请输入手机号" 
            prefix={<UserOutlined />} 
            onChange={this.onInputChange}
            value={this.state.account}
            name='account'/>
          <Input className='login-contan' 
            placeholder="请输入密码" 
            prefix={<UnlockOutlined />} 
            onChange={this.onInputChange}
            value={this.state.password}
            name='password'
            type='password'/>
          <Button type="primary"  
            className='login-contan' 
            block
            onClick={() => onSignIn(this.state.account, this.state.password)}>登录</Button>
        </div>
      )
    }else{
      return (
        <div >
          <Input className='sign-contan' 
            placeholder="请输入手机号" 
            value={this.state.account}
            onChange={this.onInputChange}
            name='account'
            />
          <Input className='sign-contan' 
            placeholder="6 - 16 位密码，区分大小写"
            value={this.state.password}
            onChange={this.onInputChange}
            name='password'
             />
          <Input className='sign-contan' 
            placeholder="确认密码" 
            name='conPassword'
            onChange={this.onInputChange}
            value={this.state.conPassword}
            type='password'
            />
          {/*<div className='launch'>
            <Input className='sign-contan code-input' placeholder="输入验证码" />
            {
              this.state.launch ?  <Button type="primary"  className='login-contan code' block>验证码已发送</Button> : <Button  className='sign-contan code' block>获取验证码</Button> 
            }
          </div>*/}
          <Button type="primary"  
            className='sign-contan' 
            block
            onClick={() => this.onRegister(this.state.account, this.state.password, this.state.conPassword)}
            >注册</Button>
        </div>
      )
    }
  }

  //处理输入
  onInputChange(e){
    let inputValue = e.target.value
    let inputName = e.target.name
    this.setState(() => {
      return {
        [inputName] : inputValue
      }
    })
  }

  

  //登录、注册切换
  changeTab(){

    this.setState(() => {
      return {
        password: '',
        account: '',
        currentTab : !this.state.currentTab
      }
    })
  }

  //注册处理
  onRegister(account, password, conPassword){
    if(!(password === conPassword)){
      alert('两次密码输入不一致')
      this.setState(() => {
        return {
          password: '',
          conPassword: '',
        }
      })
    }else{
      this.props.onSignIn(account, password)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.getIn(['login','status'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //登录、注册处理
    onSignIn(account, password){
      dispatch(actionCreators.getSignIn(account, password))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
