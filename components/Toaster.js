import { Component } from 'react';
import { render } from 'react-dom';

export class Toaster extends Component {
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
