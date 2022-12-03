import React from 'react';
import { LoaderWrapper } from './Loader.styled';
import { Vortex } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <LoaderWrapper>
      <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      />
    </LoaderWrapper>
  );
};
