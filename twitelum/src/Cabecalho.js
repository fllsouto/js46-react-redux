import React, { Component } from 'react';

import './Cabecalho.css';

// Esse cara é muito simples, eu posso usar uma arrow function, 
// caso eu apenas precise do render
/* class Cabecalho extends Component {
    render() {
        // this.props.usuario
        return (
            <header className="cabecalho">
                <h1>Twitelum</h1>
                { this.props.children}
                <input type="search" placeholder="Busque alguma coisa"/>
          </header>
        );
    }
} */

const Cabecalho = (props) => {
    return (
        <header className="cabecalho">
            <h1>Twitelum</h1>
            { props.children}
            <input type="search" placeholder="Busque alguma coisa"/>
      </header>
    );
}

export default Cabecalho;