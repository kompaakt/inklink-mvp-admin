import React, { useContext } from 'react';
import { BrowserRouter as Router, useRoutes, Route, Navigate } from 'react-router-dom';
import { SignUp } from './SignUp';
import { Layout } from './layout';
import { ArtistsList } from './pages/artist/list';
import { ArtistEdit } from './pages/artist/edit';
import { AuthContext } from './context/AuthProvider';

const Routes = () => {
  return useRoutes([
    { path: '/', element: <ArtistsList /> },
    { path: 'artists', element: <ArtistsList /> },
    { path: 'artists/:artistId', element: <ArtistEdit /> },
    { path: 'artists/create', element: <ArtistEdit create={true} /> },
  ]);
};

const ProtectedRoute = ({ userInfo, redirectPath = '/signup', children }) => {
  console.log({ userInfo, redirectPath });
  if (!userInfo) {
    console.log('navigate');
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

function App() {
  const { userInfo, isUserInfoLoading } = useContext(AuthContext);

  if (!userInfo && !isUserInfoLoading) {
    return <SignUp />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<SignUp />} />
          <Route
            path="artists"
            element={
              <ProtectedRoute userInfo={userInfo}>
                <ArtistsList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
