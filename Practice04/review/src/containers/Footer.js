import React, { Component } from 'react';
// import logo from './logo.svg';
import './TodoList.css';
import TotalCount from './../components/TotalCount'
import Buttons from './../components/Buttons'

class Footer extends Component {
  handleClick = (now) => { this.props.onClick(now) };
  // handleClickActive = (now) => { this.props.onActive(now) };
  // handleClickComplete = (now) => { this.props.onComplete(now) };
  render() {
    return (
        <footer className="todo-app__footer">
          <TotalCount count={this.props.count} />
          <Buttons nowstate={this.props.nowState} onClick={this.handleClick} />
        </footer>
    );
  }
}

export default Footer;