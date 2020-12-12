import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Cookie from 'js-cookie';

export default class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            on: false
        }
    }

    onClickMenu = () => {
        this.setState({
            on: !this.state.on
        })

        const menu = document.querySelector('.menu')

        if (!this.state.on) {
            menu.classList.add('open')
        } else {
            menu.classList.remove('open');
        }
    }

  

    render() {
        return (
            <div >
                <div className="menu" onClick={this.onClickMenu}>
                    <div className="menu-icon"></div>
                </div>

                {this.state.on && (
                    <nav className="navbar">
                        <ul>
                            <Link className="nav-link" to="/">Home</Link>
                            <Link className="nav-link" to="/art">Art</Link>
                            <Link className="nav-link" to="/about">About</Link>
                        </ul>
                     
                    </nav>
                )
                }
            </div>
        )
    }

}


