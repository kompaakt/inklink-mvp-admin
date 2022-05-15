import React, { useState, useEffect } from 'react';
import { Avatar } from './Avatar';
// import { NhostClient } from '@nhost/nhost-js';

// const nhost = new NhostClient({
//   backendUrl: 'http://65.108.254.138:8000',
// });

export const AvatarEdit = ({ value, onChange, fallback }) => {
  const [signedUrl, setSignedUrl] = useState(null);
  // const [isImageLoading, setIsImageLoading] = useState(false);

  // useEffect(() => {
  //   if (!isImageLoading) {
  //     setIsImageLoading(true);
  //     console.log('isImageLoading');
  //     fetchWithAuthentication(`http://65.108.254.138:8000/v1/storage/files/${value}?w=100`)
  //       .then(convertImage)
  //       .then(setSignedUrl)
  //       .finally(() => {
  //         setIsImageLoading(false);
  //       });
  //   }
  // }, [value]);

  return (
    <div className="mt-1 flex items-center">
      <Avatar avatar={value} fallback={fallback} />
      <button
        type="button"
        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Изменить
      </button>
    </div>
  );
};

function fetchWithAuthentication(url) {
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  return fetch(url, { headers });
}

async function convertImage(response) {
  const binaryData = await response.arrayBuffer();
  const base64 = window.btoa(String.fromCharCode(...new Uint8Array(binaryData)));

  return `data:image/jpg;base64,${base64}`;
}
