/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';

const Author = ({ admin }) => (
  <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
    <div className="absolute left-0 right-0 -top-14">
      <img
        alt={admin.name}
        height="100px"
        width="100px"
        className="align-middle rounded-full"
        src={admin.photo[0].url}
      />
    </div>
    <h3 className="text-white mt-4 mb-4 text-xl font-bold">{admin.name}</h3>
    <p className="text-white text-ls italic">{admin.description}</p>
  </div>
    
);
export default Author;