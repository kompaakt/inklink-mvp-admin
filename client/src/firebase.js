import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAKtIG8BRtekyTUA_pAoYVuOchwIv8wsbo',
  databaseURL: 'https://inklink-de66a-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'inklink-de66a',
  storageBucket: 'inklink-de66a.appspot.com',
  messagingSenderId: '159871832161',
  appId: '1:159871832161:web:2488b2c00bc9c3227bda20',
  measurementId: 'G-B0YX0093CN',
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebase.auth();
