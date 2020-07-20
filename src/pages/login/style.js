import styled from 'styled-components';
import img from './images/img.png'


export const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: url(${img});
  background-size: cover;
  background-repeat:no-repeat;
  .login{
    margin: auto 0;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(187, 187, 187, 1);
  }
  .pannel {
    padding: 0 14px;
    margin: 44px auto;
    width: 340px;
    height: 370px;
    color: rgba(16, 16, 16, 1);
    background: #fff;
    font-size: 14px;
    border: 1px solid rgba(187, 187, 187, 1);
  }
  .title{
    margin: 40px auto;
    height: 33px;
    color: rgba(35, 36, 36, 1);
    font-size: 32px;
    text-align: center;
    font-family: SourceHanSansSC-regular;
  }
  .change{
    display: flex;
    justify-content: space-around;
  }
  .tab{
    padding: 0  4px 4px 4px;
    color: rgba(83, 84, 86, 1);
    font-size: 16px;
    font-family: SourceHanSansSC-regular;
  }
  .tab-active{
    border-bottom: 1.5px solid rgba(37, 147, 252, 1);
    color: rgba(37, 147, 252, 1);
  }
  .login-contan{
    margin-top: 30px;
  }
  .sign-contan{
    margin-top: 16px;
  }
  .launch{
    display: flex;
  }
  .code-input{
    flex: 2;
    margin-right: 8px;
  }
  .code{
    flex: 1;
  }
`

