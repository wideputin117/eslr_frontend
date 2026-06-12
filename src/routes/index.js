import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Organizations from '../pages/Organizations';
import Projects from '../pages/Projects';
import ProjectWorkspace from '../pages/ProjectWorkspace';
import PrivateRoute from '../components/PrivateRoute';
export const router = createBrowserRouter([
    {
        path: '/login',
        element: _jsx(Login, {}),
    },
    {
        path: '/',
        element: _jsx(PrivateRoute, { children: _jsx(Organizations, {}) }),
    },
    {
        path: '/organizations/:organizationId/projects',
        element: _jsx(PrivateRoute, { children: _jsx(Projects, {}) }),
    },
    {
        path: '/projects/:projectId',
        element: _jsx(PrivateRoute, { children: _jsx(ProjectWorkspace, {}) }),
    },
]);
