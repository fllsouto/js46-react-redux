import React, { Component } from 'react';

class NavMenu extends Component {
    render() {
        return (
            <>
                <nav className="cabecalho__navMenu">
                    <ul className="cabecalho__list">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/logout">Logout</a>
                        </li>
                    </ul>
                </nav>
                <a href={`/usuario/${this.props.usuario}`}>
                    {`@${this.props.usuario}`}
                </a>
            </>
        )
    }
}

export default NavMenu;