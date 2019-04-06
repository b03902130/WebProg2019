import React, { Component } from 'react';
// import logo from './logo.svg';
import './Components.css';
import logo from './img/x.png';

class Item extends Component {
	// handleClick = () => this.setState(state => ({ value: state.value + 1 }));
	handleClick_o = () => {
		let id = this.props.id;
		console.log("help complete" + id);
        this.props.onComplete(id);
    }
	
	handleClick_x = () => {
		let id = this.props.id;
		console.log(this.props)
		console.log("help delete" + id);
        this.props.onDelete(id);
	}

	showcompleted = () => {
		let sty = this.props.itemstate === 1 ? {textDecorationLine: 'line-through'} : null;
		console.log(sty);
		return sty;
	}

	render() {
		return (
			<li className="todo-app__item">
				<div className="todo-app__checkbox" >
					<input id={this.props.id} type="checkbox" onClick={this.handleClick_o} />
					<label htmlFor={this.props.id} ></label>
				</div>
				<h1 className="todo-app__item-detail" >{this.props.content}</h1>
				<img src={logo} className="todo-app__item-x" alt="" onClick={this.handleClick_x} />
			</li>
		);
	}
}

export default Item;