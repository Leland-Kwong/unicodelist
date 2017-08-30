import React, { Component } from 'react';
import { Icon } from './allComponents';

const defaultRefFn = () => {};
export class Input extends Component {
  render() {
    const {
      className,
      containerClassName,
      label,
      inputRef = defaultRefFn,
      type,
      ...rest
    } = this.props;
    const SearchIcon = type === 'search'
      ? <Icon name='search' className='Input__SearchIcon' />
      : null;
    return (
      <div>
        {typeof label !== 'undefined'
        && <label>{label}</label>}
        <div className={`Input__Container ${containerClassName}`}>
          {SearchIcon}
          <input
            type={type}
            ref={inputRef}
            className={`Input ${className}`}
            {...rest}
          />
        </div>
      </div>
    );
  }
}
