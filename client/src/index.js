import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthProvider';

import { apolloClient } from './apolloClient';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
);
