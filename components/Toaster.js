import { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

export class Toaster extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  componentDidMount() {
    const div = this.div = document.createElement('div');
    div.className = 'Toaster';
    document.body.appendChild(div);
    const { children } = this.props;
    render(
      children,
      div
    );
  }

  componentWillUnmount() {
    document.body.removeChild(this.div);
  }

  render() {
    return null;
  }
}
