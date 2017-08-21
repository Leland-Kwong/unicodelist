import React, { Component } from 'react';
import classnames from 'classnames';

export class LoadingIndicator extends Component {
  render() {
    const { className, ...rest } = this.props;
    return (
      <div className={classnames('sk-folding-cube', className)} {...rest}>
        <div className='sk-cube1 sk-cube' />
        <div className='sk-cube2 sk-cube' />
        <div className='sk-cube4 sk-cube' />
        <div className='sk-cube3 sk-cube' />
      </div>
    );
  }
}
