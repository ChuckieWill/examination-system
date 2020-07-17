import styled from 'styled-components'


export const SidebarWrapper = styled.div`
  width: 12vw;
  height: 100vh;
  float: left;
  line-height: 20px;
  background-color: rgba(64, 61, 61, 1);
  box-sizing:border-box;
  text-align: center;
  border: 1px solid rgba(187, 187, 187, 1);
  position: relative;
  .side-title {
    height: 90px;
    background: #fff;
    line-height: 90px;
    font-size: 18px;
    color: #101010;
    text-align: center;
    border-bottom: 1px solid rgba(187, 187, 187, 1);
  }
  .tab {
    text-decoration: none;
    display: block;
    color: #403D3D;
    background: #fff;
    font-size: 14px;
    text-align: center;
    font-family: Roboto;
    border: 1px solid rgba(187, 187, 187, 1);
    height: 46px;
    line-height: 46px;
  }
  .tab-active{
    text-decoration: none;
    display: block;
    color: #fff;
    font-size: 14px;
    text-align: center;
    font-family: Roboto;
    border: 1px solid rgba(187, 187, 187, 1);
    height: 46px;
    line-height: 46px;
  }
  .exit{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    box-sizing:border-box;
  }
  .icon{
    font-size: 16px;
  }
`