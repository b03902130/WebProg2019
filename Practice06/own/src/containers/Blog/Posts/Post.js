import React, { Component } from "react";

export default class Post extends Component {
    render() {
        return (
            <div>
                <div id="heading" >
                    <h1>{"POST " + this.props.content.id}</h1>
                </div>

                <section id="main" className="wrapper">
                    <div className="inner">
                        <div className="content">
                            <h1>{this.props.content.title}</h1>
                            {
                                this.props.content.description.map((paragraph, index) => {
                                    return <p key={this.props.content.id + ":" + index}>{paragraph}</p>
                                })
                            }
                        </div>
                    </div>
                </section>
            </div>
        );
    }
};