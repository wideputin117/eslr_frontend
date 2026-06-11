import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Organizations from '../pages/Organizations';
import Projects from '../pages/Projects';
import ProjectWorkspace from '../pages/ProjectWorkspace';
import PrivateRoute from '../components/PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <PrivateRoute><Organizations /></PrivateRoute>,
  },
  {
    path: '/organizations/:organizationId/projects',
    element: <PrivateRoute><Projects /></PrivateRoute>,
  },
  {
    path: '/projects/:projectId',
    element: <PrivateRoute><ProjectWorkspace /></PrivateRoute>,
  },
]);
