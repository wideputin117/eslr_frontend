import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../api/client';
import Layout from '../components/Layout';
import ArticleTable from '../components/ArticleTable';
import ImportModal from '../components/ImportModal';
const ProjectWorkspace = () => {
    const [project, setProject] = useState(null);
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showImportModal, setShowImportModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 1 });
    const { projectId } = useParams();
    const navigate = useNavigate();
    const fetchProject = async () => {
        try {
            const data = await apiClient.getProject(projectId);
            setProject(data);
        }
        catch (err) {
            setError('Failed to load project');
        }
    };
    const fetchArticles = async () => {
        try {
            const data = await apiClient.getArticles(projectId, {
                status: statusFilter || undefined,
                search: searchQuery || undefined,
                page: currentPage,
                limit: 20,
            });
            setArticles(data.articles);
            setPagination(data.pagination);
        }
        catch (err) {
            setError('Failed to load articles');
        }
    };
    useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            await fetchProject();
            await fetchArticles();
            setIsLoading(false);
        };
        load();
    }, [projectId]);
    useEffect(() => {
        setCurrentPage(1);
        fetchArticles();
    }, [searchQuery, statusFilter]);
    useEffect(() => {
        if (currentPage > 1) {
            fetchArticles();
        }
    }, [currentPage]);
    const handleImportSuccess = () => {
        setShowImportModal(false);
        fetchArticles();
    };
    const handleReviewUpdate = async () => {
        await fetchArticles();
    };
    if (isLoading) {
        return _jsx(Layout, { title: "Project Workspace", children: _jsx("div", { children: "Loading..." }) });
    }
    if (error) {
        return _jsx(Layout, { title: "Project Workspace", children: _jsx("div", { className: "text-red-600", children: error }) });
    }
    return (_jsxs(Layout, { title: project?.name || 'Project', children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("button", { onClick: () => navigate(-1), className: "text-blue-600 hover:text-blue-800", children: "\u2190 Back" }), _jsx("button", { onClick: () => setShowImportModal(true), className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700", children: "Import Articles" })] }), _jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Search" }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search by title, authors, or PMID...", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Status" }), _jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500", children: [_jsx("option", { value: "", children: "All Statuses" }), _jsx("option", { value: "UNREVIEWED", children: "Unreviewed" }), _jsx("option", { value: "INCLUDED", children: "Included" }), _jsx("option", { value: "EXCLUDED", children: "Excluded" }), _jsx("option", { value: "MAYBE", children: "Maybe" })] })] })] }), _jsx(ArticleTable, { articles: articles, projectId: projectId, onReviewUpdate: handleReviewUpdate }), pagination.pages > 1 && (_jsxs("div", { className: "mt-6 flex justify-center gap-2", children: [_jsx("button", { onClick: () => setCurrentPage(Math.max(1, currentPage - 1)), disabled: currentPage === 1, className: "px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50", children: "Previous" }), _jsxs("span", { className: "px-4 py-2", children: ["Page ", currentPage, " of ", pagination.pages] }), _jsx("button", { onClick: () => setCurrentPage(Math.min(pagination.pages, currentPage + 1)), disabled: currentPage === pagination.pages, className: "px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50", children: "Next" })] }))] })] }), showImportModal && (_jsx(ImportModal, { projectId: projectId, onClose: () => setShowImportModal(false), onSuccess: handleImportSuccess }))] }));
};
export default ProjectWorkspace;
