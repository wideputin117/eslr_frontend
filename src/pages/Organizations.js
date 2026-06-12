import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../api/client';
import Layout from '../components/Layout';
const Organizations = () => {
    const [organizations, setOrganizations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const data = await apiClient.getOrganizations();
                setOrganizations(data);
            }
            catch (err) {
                setError('Failed to load organizations');
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchOrganizations();
    }, []);
    if (isLoading) {
        return _jsx(Layout, { title: "Organizations", children: _jsx("div", { children: "Loading..." }) });
    }
    if (error) {
        return _jsx(Layout, { title: "Organizations", children: _jsx("div", { className: "text-red-600", children: error }) });
    }
    return (_jsx(Layout, { title: "Organizations", children: organizations.length === 0 ? (_jsx("p", { children: "No organizations found" })) : (_jsx("div", { className: "grid gap-6", children: organizations.map((org) => (_jsx("div", { className: "bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow", onClick: () => navigate(`/organizations/${org.id}/projects`), children: _jsxs("div", { className: "px-4 py-5 sm:p-6", children: [_jsx("h3", { className: "text-lg leading-6 font-medium text-gray-900", children: org.name }), org.description && (_jsx("p", { className: "mt-1 max-w-2xl text-sm text-gray-500", children: org.description })), _jsxs("div", { className: "mt-4 flex items-center", children: [_jsxs("span", { className: "text-sm text-gray-600", children: [org.projects?.length || 0, " projects"] }), _jsxs("span", { className: "ml-4 text-sm text-gray-600", children: [org.members?.length || 0, " members"] })] })] }) }, org.id))) })) }));
};
export default Organizations;
