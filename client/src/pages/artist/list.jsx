import React, { useEffect, useState, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Avatar } from '../../components/Avatar';
import { useDebouncedState } from '../../utils/useDebouncedState';

const get_artists = gql`
  query get_artists($query: String!) {
    artists(
      where: {
        _or: [{ name: { _ilike: $query } }, { ig: { _ilike: $query } }, { tg: { _ilike: $query } }]
      }
    ) {
      id
      name
      ig
      tg
      isPublished
      created_at
      updated_at
      avatar
    }
  }
`;

export const ArtistsList = ({ query: _query }) => {
  const [searchQueryParams] = useSearchParams();
  const q = searchQueryParams.get('q') ?? '';
  const debouncedQuery = useDebouncedState(q, 500);

  const { loading, error, data } = useQuery(get_artists, {
    variables: {
      query: `%${debouncedQuery}%`,
    },
  });

  if (error) return <>error</>;

  return (
    <div className="">
      <Link to="/artists/create">
        <button className="inline-flex items-center mb-2.5 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-50 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Создать
        </button>
      </Link>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {data?.artists?.map(({ name, id, tg, ig, isPublished, created_at, updated_at, avatar }) => (
          <div
            key={id}
            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 min-w-160"
          >
            <div className="flex-shrink-0">
              <Avatar avatar={avatar} fallback={`${name} avatar`} />
            </div>
            <div className="flex-1 min-w-0">
              <Link to={`/artists/${id}`} className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">{name}</p>
                <p className="text-sm text-gray-500 truncate">@{ig}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
