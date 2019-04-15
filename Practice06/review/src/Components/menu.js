import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { NavLink, Switch, Route } from 'react-router-dom'
import Block1 from './block1';
import Block2 from './block2';
import Block3 from './block3';
import Block4 from './block4';
export default class Menu extends React.Component {
    constructor(props) {
        super(props);
    }
    // toBlock1(){
    //     window.location.hash = "#block1";
    //     this.props.getCondition("block1");
    // }
    render() {
        var toBlock1 = function(){
            //window.location.hash = "#block1";
            this.props.getCondition("block1");
		}
		var toBlock2 = function(){
            //window.location.hash = "#block2";
            this.props.getCondition("block2");
		}
		var toBlock3 = function(){
            //window.location.hash = "#block3";
            this.props.getCondition("block3");
		}
		var toBlock4 = function(){
            //window.location.hash = "#block4";
            this.props.getCondition("block4");
		}
        return (
            <div>
                <ul>
				    <li><a onMouseDown={toBlock1.bind(this)}><NavLink to="/block1">Intro</NavLink></a></li>
				    <li><a onMouseDown={toBlock2.bind(this)}><NavLink to="/block2">Photos</NavLink></a></li>
				    <li><a onMouseDown={toBlock3.bind(this)}><NavLink to="/block3">Member</NavLink></a></li>
				    <li><a onMouseDown={toBlock4.bind(this)}><NavLink to="/block4">Contact</NavLink></a></li>
			    </ul>
                <Switch>
                    <Route path="/block1" component={Block1} />
                    <Route path="/block2" component={Block2} />
                    <Route path="/block3" component={Block3} />
                    <Route path="/block4" component={Block4} />
                </Switch>
            </div>
        )
    }
}
