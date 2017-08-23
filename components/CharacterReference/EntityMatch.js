import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Copyable } from './Copyable';
import Router from 'next/router';
import { views, setBookmarks, entityID } from './modules';
import classnames from 'classnames';

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
const codeExample = (() => {
  const fns = {
    named: htmlEntity => {
      const code = /* @html */`
<span>${htmlEntity}</span>`.trim();
      return <pre><code>{code}</code></pre>;
    },
    css: escapedHexCode => {
      const code = /* @html */`
span:before {
  content: "${escapedHexCode}";
}`.trim();
      return <pre><code>{code}</code></pre>;
    },
    default: () => null,
    // css:
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
    const { desc, ...fields } = metadata;
    const nbsp = 0x000A0;
    const char = fields.character;
    const charDisplay = char.trim().length ? char : String.fromCharCode(nbsp);
    const uid = fields.hex;
    const isListView = view === views.list;
    const isDetailView = view === views.detail;
    const Category = view === views.detail && (
      <div className='color-sub-text mt3 mb4' style={{ fontSize: '.85rem' }}>
        <div>Category: <em>{fields.category}</em></div>
        <div>learn more about&nbsp;
          <a href='http://www.unicode.org/versions/Unicode10.0.0/ch04.pdf#G134153'>unicode categories</a>
        </div>
      </div>
    );
    // customized ordering of keys from `entities` object
    const entityPropsToShow = view === views.list
      ? [/* 'character' */, 'named', 'css', 'hex']
      : ['named', 'css', 'hex', 'dec', 'unicode'];
    const Description = (
      <h5 className='Match__Header Match__Desc'>
        {isListView &&
          <Link
            className='db black'
            query={{ query: metadata.hex }}
          >{desc}</Link>}
        {isDetailView && desc}
      </h5>
    );
    return (
      <div className={classnames({
        'Match': isListView,
        'Match--detail container-full-width': isDetailView
      })}
      >
        {isDetailView && Description}
        <Copyable
          className='Match__Char'
          textToCopy={char}
          uid={uid}
          onCopy={this.handleCopy}
        >{charDisplay}</Copyable>
        {isListView && Description}
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
                <div className='Match__MetadataValue'>
                  <Copyable
                    textToCopy={valueToCopy}
                    uid={uid}
                    onCopy={this.handleCopy}
                  >{valueToDisplay}</Copyable>
                  {isDetailView && codeExample(key, value)}
                </div>
              </div>
            );
          })}
        </div>
        {Category}
        {/* {view === views.list &&
          <Link
            query={{ query: metadata.hex }}
            className='f7 mt2 db tr black'
          >more →</Link>} */}
      </div>
    );
  }
}
