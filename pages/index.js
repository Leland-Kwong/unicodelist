import React, { Component } from 'react';
import getBasePath from '../utils/get-base-path';
import { CharacterReference } from '../components/index';

export default class CharCodes extends Component {
  static getInitialProps = ({ req, query }) => {
    return {
      basePath: getBasePath(req),
      query
    };
  }

  render() {
    return (
      <CharacterReference {...this.props} />
    );
  }
}
