import React, { Component } from 'react';
// import logo from './logo.svg';
import './Components.css';

class Buttons extends Component {
  // constructor(props) {
  //   super(props);
  // }
  isAll = () => {
    if(this.props.nowstate === "All") {
      return true;
    }
    else return false;
  }
  isActive = () => {
    if(this.props.nowstate === "Active") return true;
    else return false;
  }
  isCompleted = () => {
    if(this.props.nowstate === "Completed") return true;
    else return false;
  }
  handleClick = (now) => { this.props.onClick(now) };
  render() {
    return (
        <ul className="todo-app__view-buttons">
          <StateButton isState={this.isAll()} content="All" onClick={this.handleClick} />
          <StateButton isState={this.isActive()} content="Active" onClick={this.handleClick}/>
          <StateButton isState={this.isCompleted()} content="Completed" onClick={this.handleClick}/>
        </ul>
    );
  }
}

class StateButton extends Component {
  IsState = () => {
    if(this.props.isState){
      console.log(this.props.nowstate);
      return "todo-app__view-nowstate";
    }
    else
      return "";
  }
  handleClick = () => {
    let now = this.props.content;
    console.log("StateButton" + now)
    this.props.onClick(now);
    }
  render() {
    return <button className={this.IsState()} onClick={this.handleClick} >{this.props.content}</button>
  }
}

export default Buttons;