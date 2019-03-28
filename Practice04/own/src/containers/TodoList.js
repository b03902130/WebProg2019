import React, { Component } from 'react';
import ListItem from './ListItem';

class Item {
    constructor(id, text) {
        this.id = id;
        this.text = text;
        this.completed = false;
    }
}

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listitems: {},
            todocount: 0,
            view: "All"
        };
        this.usedID = 0;
        this.viewFilter = {
            All: key => true,
            Active: key => !this.state.listitems[key].completed,
            Completed: key => this.state.listitems[key].completed
        };
    }

    inputEnter = (e) => {
        if (e.keyCode === 13) {
            let text = e.target.value;
            e.target.value = "";
            this.setState((state, props) => {
                let idstring = this.usedID.toString();
                state.listitems[idstring] = new Item(idstring, text);
                this.usedID += 1;
                state.todocount += 1;
                return state;
            })
        }
    }

    itemComplete = (e) => {
        const id = e.target.id;
        this.setState((state, props) => {
            state.listitems[id].completed = !state.listitems[id].completed;
            state.todocount = this.state.listitems[id].completed ? this.state.todocount - 1 : this.state.todocount + 1;
            return state;
        });
    }

    itemModify = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        this.setState((state, props) => {
            state.listitems[id].text = value;
            return state;
        });
    }

    deleteSingle(id) {
        this.setState((state, props) => {
            if (!state.listitems[id].completed) {
                state.todocount -= 1;
            }
            delete state.listitems[id];
            return state;
        });
    }
    itemDelete = (e) => {
        const id = e.target.id;
        this.deleteSingle(id);
    }
    clearComplete = (e) => {
        let filteredkey = Object.keys(this.state.listitems).filter(key => this.state.listitems[key].completed);
        filteredkey.forEach(key => this.deleteSingle(key));
    }

    render() {
        let filteredkey = Object.keys(this.state.listitems).filter(this.viewFilter[this.state.view]);
        return (
            <React.Fragment>
                <section className="todo-app__main">
                    <input type="text" id="todo-input" className="todo-app__input" placeholder="What needs to be done?" onKeyUp={this.inputEnter} />
                    <ul className="todo-app__list" id="todo-list">
                        {
                            filteredkey.map(key => {
                                let itemkey = `item${key}`;
                                let item = this.state.listitems[key]
                                return <ListItem key={itemkey} item={item} complete={this.itemComplete} modify={this.itemModify} delete={this.itemDelete} />
                            })
                        }
                    </ul>
                </section>
                <footer className="todo-app__footer" id="todo-footer">
                    <div className="todo-app__total">{this.state.todocount} left</div>
                    <ul className="todo-app__view-buttons">
                        <button type="button" data-selected={this.state.view === "All"} onClick={(e) => { this.setState({ view: "All" }) }}>All</button>
                        <button type="button" data-selected={this.state.view === "Active"} onClick={(e) => { this.setState({ view: "Active" }) }}>Active</button>
                        <button type="button" data-selected={this.state.view === "Completed"} onClick={(e) => { this.setState({ view: "Completed" }) }}>Completed</button>
                    </ul>
                    <div className="todo-app__clean">
                        <button type="button" id="clear" onClick={this.clearComplete}>Clear completed</button>
                    </div>
                </footer>
            </React.Fragment>
        );
    }
}

export default TodoList;