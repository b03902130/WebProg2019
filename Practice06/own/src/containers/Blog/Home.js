import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Posts extends Component {
    render() {
        return (
            <div>
                <section id="banner">
                    <div class="inner">
                        <h1>MY CAT WEBSITE</h1>
                        <p>You can find many cute cats here, without a single dog.<br />No dog sorry.</p>
                    </div>
                </section>

                <section class="wrapper">
                    <div class="inner">
                        <header class="special">
                            <h2>Quick Access</h2>
                            <p>You can see our latest pictures here</p>
                        </header>
                        <div class="highlights">
                            <section>
                                <div class="content">
                                    <header>
                                        <a href="#" class="icon fa-vcard-o"><span class="label">Icon</span></a>
                                        <h3>Feugiat consequat</h3>
                                    </header>
                                    <p>Nunc lacinia ante nunc ac lobortis ipsum. Interdum adipiscing gravida odio porttitor sem</p>
                                </div>
                            </section>
                            <section>
                                <div class="content">
                                    <header>
                                        <a href="#" class="icon fa-files-o"><span class="label">Icon</span></a>
                                        <h3>Ante sem integer</h3>
                                    </header>
                                    <p>Nunc lacinia ante nunc ac lobortis ipsum. Interdum adipiscing gravida odio porttitor sem non</p>
                                </div>
                            </section>
                            <section>
                                <div class="content">
                                    <header>
                                        <a href="#" class="icon fa-floppy-o"><span class="label">Icon</span></a>
                                        <h3>Ipsum consequat</h3>
                                    </header>
                                    <p>Nunc lacinia ante nunc ac lobortis ipsum. Interdum adipiscing gravida odio porttitor s</p>
                                </div>
                            </section>
                            <section>
                                <div class="content">
                                    <header>
                                        <a href="#" class="icon fa-line-chart"><span class="label">Icon</span></a>
                                        <h3>Interdum gravida</h3>
                                    </header>
                                    <p>Nunc lacinia ante nunc ac lobortis ipsum. Interdum adipiscing gravida odio porttito</p>
                                </div>
                            </section>
                            <section>
                                <div class="content">
                                    <header>
                                        <a href="#" class="icon fa-paper-plane-o"><span class="label">Icon</span></a>
                                        <h3>Faucibus consequat</h3>
                                    </header>
                                    <p>Nunc lacinia ante nunc ac lobortis ipsum. Interdum adipiscing gravida odio porttitor sem non </p>
                                </div>
                            </section>
                            <section>
                                <div class="content">
                                    <header>
                                        <a href="#" class="icon fa-qrcode"><span class="label">Icon</span></a>
                                        <h3>Accumsan viverra</h3>
                                    </header>
                                    <p>Nunc lacinia ante nunc ac lobortis ipsum. Interdum adipiscing gravida odio porttitor sem non mi int</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
