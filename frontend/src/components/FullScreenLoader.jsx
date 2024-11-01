import React from 'react';
import { ClipLoader } from 'react-spinners';

export const FullScreenLoader = () => (
  <div className="flex justify-center items-center w-full h-full fixed top-0 left-0 bg-gray-900 bg-opacity-75 z-50">
    <ClipLoader size={50} color={"#ffffff"} loading={true} />
  </div>
);
