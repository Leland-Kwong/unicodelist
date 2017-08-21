import React from 'react';
import NextHead from 'next/head';

export const Style = ({ children }) => {
  return (
    <NextHead>
      <style dangerouslySetInnerHTML={{ __html: children }} />
    </NextHead>
  );
};
