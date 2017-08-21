import React from 'react';
import classnames from 'classnames';

export const Filters = ({
  onClick = Function,
  options = [{ label: String || React.Component, value: String }],
  value: activeValue = false
}) => {
  return (
    <div className='MatchFilters tc'>
      {options.map(opt => {
        const { label, value } = opt;
        return (
          <a
            tabIndex={0}
            key={value}
            className={classnames(
              'Filter__Toggle',
              { 'Filter__Toggle--active': activeValue === value }
            )}
            onClick={() => onClick(value)}
          >{label}</a>
        );
      })}
    </div>
  );
};
