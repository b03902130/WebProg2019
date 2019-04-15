import React from 'react';
import bgImage2 from "../image/bg2.jpg";
import { BrowserRouter } from 'react-router-dom'
import { NavLink, Switch, Route, Redirect} from 'react-router-dom'
export default class Block2 extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var sectionStyle2 = {
			width: "100%",
			height: "300px",
			backgroundImage: `url(${bgImage2})` 
        };
        var font = {
			color:'white',
			fontSize:40,
			fontWeight:'bold',
			textShadowColor:'#C0C0C0',
			textShadowRadius:2,
			textShadowOffset:{width:2,height:2},
			textAlign:'center',
			margin:50
        };
        var fontHome = {
			color:'white',
			fontSize:20,
			fontWeight:'bold',
			textShadowColor:'#C0C0C0',
			textShadowRadius:2,
			textShadowOffset:{width:2,height:2},
			margin:50
        };
        return (
            <div>
                <div style={font} id="block2">
                    Photos
                    <div style = {sectionStyle2}></div>
                </div>
                <div style={fontHome}>
                <NavLink to="/home">
                    Home
                </NavLink>
                </div>
                <Switch>
                    <Redirect from="/Home" to="/" />
                </Switch>
            </div>
        )
    }
}
