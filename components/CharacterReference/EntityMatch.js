import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Copyable } from './Copyable';
import Router from 'next/router';
import { views, setBookmarks, entityID } from './modules';

const basePath = '/';

const createHref = (value) => {
  const encodedValue = encodeURIComponent(value);
  return `${basePath}detail/${encodedValue}`;
};

const Link = ({ query, children, ...rest }) => {
  const { query: value, filterBy = Router.query.filterBy } = query;
  return (
    <a
      href={createHref(value, filterBy)}
      onClick={(ev) => {
        ev.preventDefault();
        const _value = encodeURIComponent(value);
        const href = `${basePath}?detail=${_value}&view=detail`;
        const as = `${basePath}detail/${_value}`;
        Router.push(href, as, { shallow: true });
      }}
      {...rest}
    >{children}</a>
  );
};

const metadataKeyMapping = {
  character: 'char',
  named: 'html',
  category: 'cat',
};
const metadataValueTransform = (() => {
  const fns = {
    named: value => value.split(' ')[0],
    default: value => value,
  };
  return (key, value) => (fns[key] || fns.default)(value);
})();
export class EntityMatch extends Component {
  static propTypes = {
    view: PropTypes.oneOf(Object.keys(views))
  }

  static defaultProps = {
    onCopy: Function()
  }

  constructor(props) {
    super(props);
    this.entityID = entityID(this.props.metadata);
  }

  addToCopyCount = () => {
    setBookmarks(this.props.metadata.hex);
  }

  handleCopy = () => {
    this.addToCopyCount();
    this.props.onCopy(entityID);
    window.ga('send', {
      hitType: 'event',
      eventCategory: 'characterEntityReference',
      eventAction: 'entityCopy',
      eventValue: entityID(this.props.metadata)
    });
  }

  render() {
    const { metadata, view } = this.props;
    const { desc: description, ...fields } = metadata;
    const nbsp = 0x000A0;
    const char = fields.character;
    const charDisplay = char.trim().length ? char : String.fromCharCode(nbsp);
    const uid = fields.hex;
    const Category = view === views.detail && (
      <div className='color-sub-text' style={{ fontSize: '.75rem' }}>
        <em>{fields.category}</em>
      </div>
    );
    // customized ordering of keys from `entities` object
    const entityPropsToShow = view === views.list
      ? [/* 'character' */, 'named', 'css', 'hex']
      : ['named', 'css', 'hex', 'dec'];
    const Header = (
      <header className='Match__Header'>
        <div className='Match__Desc'>{description}</div>
      </header>
    );
    return (
      <div className='Match'>
        {Header}
        <Copyable
          className='Match__Char'
          textToCopy={char}
          uid={uid}
          onCopy={this.handleCopy}
        >{charDisplay}</Copyable>
        <div className='Match__Metadata'>
          {entityPropsToShow.map(key => {
            const value = fields[key];
            const keyDisplay = metadataKeyMapping[key] || key;
            // get first value since some values have multiple words in them
            const valueToCopy = metadataValueTransform(key, value);
            const valueToDisplay = key === 'character' ? charDisplay : valueToCopy;
            return (
              <div className='Match__MetadataField' key={key}>
                <span className='Match__MetadataKey'>{keyDisplay}</span>
                <Copyable
                  className='Match__MetadataValue'
                  textToCopy={valueToCopy}
                  uid={uid}
                  onCopy={this.handleCopy}
                >{valueToDisplay}</Copyable>
              </div>
            );
          })}
        </div>
        {Category}
        {view === views.list &&
          <Link
            query={{ query: metadata.hex }}
            className='f7 mt2 db tr black'
          >more →</Link>}
      </div>
    );
  }
}
