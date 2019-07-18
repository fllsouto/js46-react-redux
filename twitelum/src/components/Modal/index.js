import React, { Component } from 'react';
import Widget from './../Widget';

import './modal.css';

class Modal extends Component {
  // A mudança dessa props faria com que o elemento fosse renderizado inteiramente
  // É melhor 
  // if (!this.props.estaAberto) return null;

  render() {
    // if (!this.props.estaAberto) return null;
    return (
      <div
        onClick={this.props.onClose}
        className={`modal ${this.props.estaAberto ? 'modal--aberto' : ''}`}
      >
        <div
          className="modal__wrap"
          // onClick={this.handleClickWrap}
        >
          <Widget>
            {this.props.children}
          </Widget>
        </div>
      </div>
    );
  }
}

export default Modal;
