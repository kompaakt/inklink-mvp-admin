import React, { createContext, useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import { gql } from '@apollo/client';
import { apolloClient } from '../apolloClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isUserInfoLoading, setIsUserInfoLoading] = useState(true);

  useEffect(() => {
    if (userInfo) {
      setIsUserInfoLoading(false);
    }

    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        return refreshToken({ firebaseUser }).then(() => {
          return loadUserInfo({ uid: firebaseUser.uid })
            .then(setUserInfo)
            .then(() => {
              setIsUserInfoLoading(false);
            });
        });
      } else {
        setUserInfo(null);
        setIsUserInfoLoading(false);
      }
    });
  }, []);

  console.log('render');

  return (
    <AuthContext.Provider value={{ userInfo, isUserInfoLoading }}>{children}</AuthContext.Provider>
  );
};

const loadUserInfo = async ({ uid }) => {
  const loadUserInfoQuery = gql`
    query userInfo($uid: String!) {
      users(where: { firebaseUid: { _eq: $uid } }) {
        id
        role
        firebaseUid
        avatar
      }
    }
  `;

  const response = await apolloClient.query({
    query: loadUserInfoQuery,
    variables: {
      uid,
    },
  });

  if (response?.data?.users[0]) return response.data.users[0];

  return null;
};

const refreshToken = ({ firebaseUser }) => {
  return firebaseUser
    .getIdToken()
    .then((token) =>
      firebase
        .auth()
        .currentUser.getIdTokenResult()
        .then((result) => {
          if (result.claims['https://hasura.io/jwt/claims']) {
            return token;
          }
          const endpoint = 'https://us-central1-inklink-de66a.cloudfunctions.net/refreshToken';
          return fetch(`${endpoint}?uid=${firebaseUser.uid}`).then((res) => {
            if (res.status === 200) {
              return firebaseUser.getIdToken(true);
            }
            return res.json().then((e) => {
              throw e;
            });
          });
        }),
    )
    .then((validToken) => {
      window.token = validToken;
    })
    .catch(console.error);
};
