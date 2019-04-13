import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import database from "../../../database";

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.imgStyle = {
            width: "30%",
            borderRadius: "5px"
        };
    }
    render() {
        const lists = database.ranking.map(rank => {
            let record = database.table[rank];
            let short = record.description[0].split(" ");
            if (short.length > 100) {
                short = short.slice(0, 100);
                short.push("...");
            }
            return (
                <div style={{marginBottom: "50px"}} key={record.id}>
                    <header>
                        <NavLink to={"/posts/" + record.id}>
                            <img alt="cat" src={record.imgsrc} style={this.imgStyle} />
                        </NavLink>
                        <h3>{record.title}</h3>
                    </header>
                    <p>{short.join(" ")}</p>
                </div>
            );
        });
        return (
            <div>
                <div id="heading" >
                    <h1>POSTS</h1>
                </div>

                <section id="main" className="wrapper">
                    <div className="inner">
                        <div className="content">
                            {lists}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
