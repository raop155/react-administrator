import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ children, ...rest }) => {
  const isLoggedIn = () => sessionStorage.getItem('userId');

  if (!isLoggedIn()) {
    return <Redirect to='/' />;
  }

  return <Route {...rest}>{children}</Route>;
};

export default ProtectedRoute;
