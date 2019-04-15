import React from 'react';
import bgImage from "../image/bg.jpg";
import bgImage2 from "../image/bg2.jpg";
import Menu from "../Components/menu.js"
import { BrowserRouter } from 'react-router-dom'
import { NavLink, Switch, Route } from 'react-router-dom'

export default class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            condition: "",
        }
        this.getCondition = this.getCondition.bind(this);
    }
    
    getCondition = (x) => {
        this.setState({condition: x});
    }

    render() {
		let rec = this.props.scoreCard.records.map(e => 
			<tr>{e.map(
			  g => <td>{g}</td>
			)}</tr>
		  );
		var sectionStyle = {
			width: "100%",
			height: "100%",
			backgroundImage: `url(${bgImage})` 
		};
	  
		// var sectionStyle2 = {
		// 	width: "100%",
		// 	height: "300px",
		// 	backgroundImage: `url(${bgImage2})` 
		// };

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
        
        // var showBlock;
        // if (this.state.condition != ""){
        //     showBlock = <div style = {sectionStyle2}></div>
        // }

        return (
            <BrowserRouter>
            <body>
    	    <div style = {sectionStyle} id = "container">
    		    <table>
      			    <caption> {this.props.scoreCard.name}'s Score </caption>
      			    <thead>
        			    <tr>{ this.props.columnIndex.map(e => (
        				    <th>{e}</th>
    				    ))}
    				    </tr>
  				    </thead>
  				    <tbody>
    					{rec}
  					</tbody>
    			</table>
    		</div>
			<div id="menu">
                <Menu getCondition={this.getCondition.bind(this)}/>
			</div>
            {/* <div style={font} id={this.state.condition}>
                {this.state.condition}
                {showBlock}
            </div> */}
    		</body>
            </BrowserRouter>
        )
    }
}