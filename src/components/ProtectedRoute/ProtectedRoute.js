import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// This component can take a component as a prop

const ProtectedRoute = ({ component: Component, ...props }) => (
  <Route>
    {
      () => (props.isLoggedIn ? <Component {...props} /> : <Redirect to="/" />)
    }
  </Route>
);

export default ProtectedRoute;
