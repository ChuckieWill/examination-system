import React, { Component } from 'react';
import { connect } from 'react-redux';


class  Home  extends Component {
  // constructor(props){
  //   super(props)
    
  // }
  componentWillMount() {
    console.log(this.props.status)
    if(!this.props.status){
      console.log('dddd')
    }
  }
  componentDidMount(){
    console.log(this.props.status)
    if(!this.props.status){
      console.log('dddd')
    }
  }
  render() {
    return (
      <div>home111111111111111111111111111111111111111111111111111111111111</div>
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.getIn(['login','status'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// ?redirect=' + encodeURIComponent(window.location.pathname)

