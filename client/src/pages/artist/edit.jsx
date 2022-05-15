import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import Ratings from 'react-ratings-declarative';
import { Switch } from '@headlessui/react';
import { gql } from '@apollo/client';
import { apolloClient } from '../../apolloClient';
import { machineTypes, ratingScale } from '../../const';
import { classNames } from '../../utils';
import { AvatarEdit } from '../../components/AvatarEdit';

export const ArtistEdit = ({ create }) => {
  let { artistId } = useParams();
  const [artist, setArtist] = useState({});
  const [isArtistLoading, setIsArtistLoading] = useState(!create);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      rating: 1,
    },
  });

  useEffect(() => {
    if (artistId) {
      setIsArtistLoading(true);
      loadArtist(artistId)
        .then((artistData) => {
          setArtist(artistData);
          reset(artistData);
        })
        .finally(() => {
          setIsArtistLoading(false);
        });
    }
  }, [artistId]);

  const onSubmit = (data) => console.log(data);

  if (isArtistLoading || !artist) {
    return null;
  }

  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Имя
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          {...register('name')}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="sssivooo"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="ig" className="block text-sm font-medium text-gray-700">
                        instagram
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          https://instagram.com/
                        </span>
                        <input
                          type="text"
                          {...register('ig')}
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="sssivooo"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="ig" className="block text-sm font-medium text-gray-700">
                        telegram
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          https://tg.me/
                        </span>
                        <input
                          type="text"
                          {...register('tg')}
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="sssivooo_tg"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                      Аватар
                    </label>
                    <Controller
                      control={control}
                      name="avatar"
                      render={({ field: { onChange, value } }) => (
                        <AvatarEdit value={value} onChange={onChange} fallback={''} />
                      )}
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-2">
                    <label className="text-base font-medium text-gray-900">Инструмент</label>
                    <fieldset className="mt-4">
                      <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                        {machineTypes.map(({ value, label }) => (
                          <div key={value} className="flex items-center">
                            <input
                              id={value}
                              {...register('machineType')}
                              name="machineType"
                              type="radio"
                              value={value}
                              defaultChecked={value === 'MACHINE'}
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            />
                            <label
                              htmlFor={value}
                              className="ml-3 block text-sm font-medium text-gray-700"
                            >
                              {label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Описание
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        {...register('description')}
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder=""
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">короткое описание</p>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Рейтинг
                    </label>
                    <div className="mt-1">
                      {!isArtistLoading && (
                        <Controller
                          control={control}
                          name="rating"
                          render={({ field: { onChange, value } }) => (
                            <Ratings
                              rating={value * ratingScale[1]}
                              widgetRatedColors="blue"
                              changeRating={(v) => {
                                onChange(v / ratingScale[1]);
                              }}
                            >
                              {new Array(5).fill().map((_, i) => (
                                <Ratings.Widget
                                  key={i}
                                  widgetRatedColor="rgb(79 70 229 / var(--tw-bg-opacity))"
                                  widgetDimension="20px"
                                />
                              ))}
                            </Ratings>
                          )}
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Опубликован?
                    </label>
                    <div className="mt-1">
                      <Controller
                        control={control}
                        name="isPublished"
                        render={({ field: { onChange, value } }) => (
                          <Switch
                            checked={value}
                            onChange={onChange}
                            className={classNames(
                              value ? 'bg-indigo-600' : 'bg-gray-200',
                              'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                            )}
                          >
                            <span className="sr-only">Опубликован</span>
                            <span
                              aria-hidden="true"
                              className={classNames(
                                value ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                              )}
                            />
                          </Switch>
                        )}
                      />
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const loadArtist = async (artistId) => {
  const loadArtistQuery = gql`
    query MyQuery($id: uuid!) {
      artists_by_pk(id: $id) {
        avatar
        created_at
        id
        ig
        isPublished
        name
        rating
        tg
        updated_at
        machineType
        description
        done_tattoos(limit: 10) {
          id
          url
          created_at
          updated_at
        }
        selection_entries(limit: 10) {
          id
          selection {
            weight
            updated_at
            position
            name
            featuredFrom
            id
            featuredTo
            featured
            created_at
            coverImageWide
            coverImage
            content
            abstract
          }
        }
        sketches(limit: 10) {
          id
          url
          updated_at
          artistId
          created_at
        }
      }
    }
  `;

  const result = await apolloClient.query({
    query: loadArtistQuery,
    variables: {
      id: artistId,
    },
  });

  if (!result?.data?.artists_by_pk) {
    throw new Error('error fetching artists_by_pk');
  }

  return result.data.artists_by_pk;
};
