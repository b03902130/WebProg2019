import React, { Component } from 'react';
import cross from "./img/x.png";

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modifying: false,
        };
    }
    render() {
        return (
            <li className="todo-app__item">
                <div className="todo-app__checkbox" data-completed={this.props.item.completed}>
                    <input type="checkbox" id={this.props.item.id} onClick={this.props.complete} />
                    <label htmlFor={this.props.item.id}></label>
                </div>
                <input className="todo-app__item-detail"
                    id={this.props.item.id}
                    value={this.props.item.text}
                    readOnly={!this.state.modifying}
                    data-completed={this.props.item.completed}
                    onChange={this.props.modify}
                    onDoubleClick={(e) => { this.setState({ modifying: true }); }}
                    onBlur={(e) => { this.setState({ modifying: false }); }}
                    onKeyUp={(e) => {
                        if (e.keyCode === 13 || e.keyCode === 27) {
                            this.setState({ modifying: false });
                            e.target.blur();
                        }
                    }}
                />
                <img alt="delete item" className="todo-app__item-x" id={this.props.item.id} src={cross} onClick={this.props.delete} />
            </li>
        );
    }
}

export default ListItem;