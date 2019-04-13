import React, { Component } from "react";

import Post from "./Post";
import database from "../../../database";

export default class PostRender extends Component {
    render() {
        const { id } = this.props.match.params;
        return id && database.ranking.includes(id) ? (
            <Post content={database.table[id]} />
        ) : (
            <div>
                <h3>Error: Post #{id} NOT FOUND</h3>
            </div>
        );
    }
}
