import React from 'react';
import { Main } from '../components/index';

export default () => {
  return (
    <Main>
      <div className='MainContent container-lg'>
        <div className='ErrorContent'>
          <h1>Oops!</h1>
          <p>The page you've requested does not exist. If you believe this to be an error, please <a href='mailto:leland.kwong@gmail.com'>contact me</a> and I'll get to the bottom of it.</p>
        </div>
      </div>
    </Main>
  );
};
