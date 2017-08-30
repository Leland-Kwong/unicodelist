import React, { Component } from 'react';
import getBasePath from '../utils/get-base-path';
import { CharacterReference } from '../components/index';

export default class CharCodes extends Component {
  static getInitialProps = ({ req, query }) => {
    const version = !process.browser
      ? require('../package.json').version
      : window.__appVersion__;

    return {
      basePath: getBasePath(req),
      query,
      version
    };
  }

  constructor(props) {
    super(props);
    if (process.browser) {
      window.__appVersion__ = this.props.version;
    }
  }

  render() {
    return (
      <CharacterReference {...this.props} />
    );
  }
}
