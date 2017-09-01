import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import { Toaster } from '../allComponents';

export class Copyable extends Component {
  static propTypes = {
    uid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  }

  static defaultProps = {
    uid: 0
  }

  state = {
    justCopied: false
  }

  componentDidMount() {
    const $this = findDOMNode(this);
    const clipboard = this.clipboard = new Clipboard($this);
    clipboard.on('success', (ev) => {
      this.props.onCopy(ev);
      this.setState({ justCopied: true }, () => {
        setTimeout(
          () => this.setState({ justCopied: false }),
          1500
        );
      });
    });
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    const {
      textToCopy,
      className,
      children
    } = this.props;
    const { justCopied } = this.state;
    return (
      <a
        className={(classnames(
          'Copyable',
          className,
        ))}
        data-clipboard-action='copy'
        data-clipboard-text={textToCopy}
      >
        {children}
        {justCopied &&
          <Toaster>
            <div className={'Copyable__Tooltip'}>
              <strong className='Copyable__TooltipTextToCopy'>{textToCopy}</strong>
              <div className='Copyable__TooltipTitle'>copied to clipboard</div>
            </div>
          </Toaster>}
      </a>
    );
  }
}
