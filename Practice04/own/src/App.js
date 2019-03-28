import React, { Component } from 'react';
import TodoList from './containers/TodoList';
import './App.css';

class App extends Component {
    render() {
        return (
            <div id="root" className="todo-app__root">
                <header className="todo-app__header">
                    <h1 className="todo-app__title">todos</h1>
                </header>
                <TodoList />
            </div>
        );
    }
}

export default App;
