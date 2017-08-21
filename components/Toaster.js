import React, { Component } from 'react';

export class Toaster extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className='Toaster'>{children}</div>
    );
  }
}
