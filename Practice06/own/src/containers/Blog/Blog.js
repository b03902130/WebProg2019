import React, { Component } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

import Home from "./Home"
import Posts from "./Posts/Posts";
import PostRender from "./Posts/PostRender";

export default class Blog extends Component {
  render() {
    return (
      <div>
        <header id="header">
          <NavLink className="logo" to="/home">Home</NavLink>
          <NavLink className="logo" to="/posts">Posts</NavLink>
          <NavLink className="logo" to="/authors">Authors</NavLink>
        </header>

        <Switch>
          <Route exact path="/posts" component={Posts} />
          <Route path="/posts/:id?" component={PostRender} />
          <Route exact path="/" component={Home} />
          <Redirect from="/home" to="/" />
        </Switch>

        <footer id="footer">
          <div class="inner">
            <div class="content">
              <section>
                <h3>CUTE CAT CO.</h3>
                <p>Many many cute cats</p>
              </section>
              <section>
                <h4>Sem turpis amet semper</h4>
                <ul class="alt">
                  <li><a href="#">Dolor pulvinar sed etiam.</a></li>
                  <li><a href="#">Etiam vel lorem sed amet.</a></li>
                </ul>
              </section>
              <section>
                <h4>Magna sed ipsum</h4>
                <ul class="plain">
                  <li><a href="#"><i class="icon fa-twitter">&nbsp;</i>Twitter</a></li>
                  <li><a href="#"><i class="icon fa-facebook">&nbsp;</i>Facebook</a></li>
                </ul>
              </section>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
