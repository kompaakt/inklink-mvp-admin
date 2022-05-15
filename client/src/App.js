import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  useRoutes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { Layout } from './layout';
import { ArtistsList } from './pages/artist/list';
import { ArtistEdit } from './pages/artist/edit';
import { ArtistSignUp } from './pages/artistSignUp';
import { SignUp } from './pages/signUp';
import { AuthContext, AuthProvider } from './context/AuthProvider';

const Routes = () => {
  return useRoutes([
    // { path: 'signup', element: <SignUp /> },
    { path: '/', element: <ArtistsList /> },
    { path: 'artists', element: <ArtistsList /> },
    { path: 'artists/:artistId', element: <ArtistEdit /> },
    { path: 'artists/create', element: <ArtistEdit create={true} /> },
    { path: '/welcome', element: <ArtistSignUp /> },
  ]);
};

const ProtectedRoute = ({ userInfo, redirectPath = '/signup', children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname !== '/signup') {
    navigate('/signup');
  }
  return children;
};

function App() {
  const { userInfo } = useContext(AuthContext);

  console.log('userInfo', userInfo);

  if (window.location.pathname === '/signup' && !userInfo) {
    return <SignUp />;
  }

  if (window.location.pathname === '/welcome') {
    return <ArtistSignUp />;
  }

  return (
    <Layout>
      <Routes />
    </Layout>
  );
}

export default App;
