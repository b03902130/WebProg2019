import React, { Component } from 'react';
// import logo from './logo.svg';
import './Components.css';

class TotalCount extends Component {
  render() {
    return (
        <div className="todo-app__total">{this.props.count} left</div>
    );
  }
}

export default TotalCount;