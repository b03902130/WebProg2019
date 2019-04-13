import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import database from "../../database";

export default class Posts extends Component {
    constructor(props) {
        super(props)
        this.imgStyle = {
            width: "100%",
            marginBottom: "10px",
            borderRadius: "5px"
        };
    }

    render() {
        return (
            <div>
                <section id="banner">
                    <div className="inner">
                        <h1>MY CAT WEBSITE</h1>
                        <p>You can find many cute cats here, without a single dog.<br />No dog sorry.</p>
                    </div>
                </section>

                <section className="wrapper">
                    <div className="inner">
                        <header className="special">
                            <h2>TOP 3 STORIES</h2>
                        </header>
                        <div className="highlights">
                            {
                                database.ranking.slice(0,3).map(rank => {
                                    let record = database.table[rank];
                                    let short = record.description[0].split(" ");
                                    if (short.length > 30) {
                                        short = short.slice(0, 30);
                                        short.push("...");
                                    }
                                    return (
                                        <section key={record.id}>
                                            <div className="content">
                                                <header>
                                                    <NavLink to={"/posts/" + record.id}>
                                                        <img alt="cat" src={record.imgsrc} style={this.imgStyle} />
                                                    </NavLink>
                                                    <h3>{record.title}</h3>
                                                </header>
                                                <p>{short.join(" ")}</p>
                                            </div>
                                        </section>
                                    );
                                })
                            }
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
