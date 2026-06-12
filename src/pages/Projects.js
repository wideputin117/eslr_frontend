import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../api/client';
import Layout from '../components/Layout';
const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { organizationId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await apiClient.getProjects(organizationId);
                setProjects(data);
            }
            catch (err) {
                setError('Failed to load projects');
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, [organizationId]);
    if (isLoading) {
        return _jsx(Layout, { title: "Projects", children: _jsx("div", { children: "Loading..." }) });
    }
    if (error) {
        return _jsx(Layout, { title: "Projects", children: _jsx("div", { className: "text-red-600", children: error }) });
    }
    return (_jsxs(Layout, { title: "Projects", children: [_jsx("button", { onClick: () => navigate('/'), className: "mb-6 text-blue-600 hover:text-blue-800", children: "\u2190 Back to Organizations" }), projects.length === 0 ? (_jsx("p", { children: "No projects found" })) : (_jsx("div", { className: "grid gap-6", children: projects.map((project) => (_jsx("div", { className: "bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow", onClick: () => navigate(`/projects/${project.id}`), children: _jsxs("div", { className: "px-4 py-5 sm:p-6", children: [_jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900", children: project.name }), project.description && (_jsx("p", { className: "mt-1 max-w-2xl text-sm text-gray-500", children: project.description })), _jsx("div", { className: "mt-4", children: _jsxs("span", { className: "text-sm text-gray-600", children: [project._count?.articles || 0, " articles"] }) })] }) }, project.id))) }))] }));
};
export default Projects;
