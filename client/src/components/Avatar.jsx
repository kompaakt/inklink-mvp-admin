import React from 'react';

export const Avatar = ({ avatar, fallback }) => {
  if (avatar) return <img className="h-10 w-10 rounded-full" src={avatar} alt={fallback} />;

  return (
    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-300">
        <span className="text-xs font-medium leading-none text-white">
          {fallback[0]?.toUpperCase()}
        </span>
      </span>
    </div>
  );
};
