import React, { Component } from 'react';
// import logo from './logo.svg';
import './TodoList.css';
import Item from './../components/Item'
// import { all } from 'q';

let globalid = 0;
let Lists = [];

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = { theList: Lists, nowState: this.props.nowState };
		//this.handleDelete = this.handleDelete.bind(this);
	}
	handleCount = () => {
		let count = 0;
		for(let i=0; i<this.state.theList.length; i++){
			if(this.state.theList[i].itemstate===0){
				count++;
			}
		}
		this.props.onCount(count);
	}
	handleInput = e => {
		if (e.key === "Enter") {
			if (e.target.value !== "") {
				let newitem = { content: e.target.value, itemstate: 0, id: globalid }; //0: active 1: completed 2:deleted
				Lists.push(newitem);
				globalid++;
				e.target.value = "";
				e.target.blur();
				this.setState({ theList: Lists });
				this.handleCount();
			}
		}
	};
	handleComplete = (id) => {
		Lists[id].itemstate = (Lists[id].itemstate === 1) ?  0: 1;
		console.log(id, "completed");
		this.setState({ theList: Lists});
		this.handleCount();
	};
	handleDelete = (id) => {
		// console.log(id);
		// console.log(Lists);
		Lists[id].itemstate = 2;
		// console.log(id, "deleted");
		this.setState({ theList: Lists});
		this.handleCount();
    };
	render() {
		let toshow = (item) => {
			if(this.state.nowState === "All"){
				if(item.itemstate !== 2)
					return true;
			}
			else if(this.state.nowState === "Active"){
				if(item.itemstate === 0)
					return true;
			}
			else if(this.state.nowState === "Completed"){
				if(item.itemstate === 1)
					return true;
			}
			return false;

		}
		let showList = this.state.theList.filter(item => toshow(item))
		console.log(this.state.nowState)
		return (
			<section className="todo-app__main">
				<Input onKeyPress={this.handleInput}/>
				<List theList={showList} onComplete={this.handleComplete} onDelete={this.handleDelete}/>
			</section>
		);
	}
}

class List extends Component {
	handleComplete = (id) => {
        this.props.onComplete(id);
	};
	handleDelete = (id) => {
		console.log("in List" + id);
		this.props.onDelete(id);
    };
	render() {
		let listItems = this.props.theList.map( (item) => <Item content={item.content} itemstate={item.itemstate} key={item.id} id={item.id}
															onComplete={this.handleComplete}
															onDelete={this.handleDelete}/>);
		console.log(listItems)
		return (
			<ul className="todo-app__list">
				{listItems}
			</ul>
		);
	}
}

class Input extends Component {
	render() {
		return (
			<input className="todo-app__input"
				type="text"
				placeholder="I know you have a lot of things to do..."
				onKeyPress={this.props.onKeyPress}
			/>
			
		);
	}
}

export default Main;