import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { apiClient } from '../api/client';
const ReviewModal = ({ article, onClose }) => {
    const [status, setStatus] = useState(article.status);
    const [reviewNotes, setReviewNotes] = useState(article.reviewNotes || '');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await apiClient.updateArticleReview(article.id, {
                status,
                reviewNotes: reviewNotes || undefined,
            });
            await onClose();
        }
        catch (err) {
            setError('Failed to update review');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto", children: [_jsx("div", { className: "px-6 py-4 border-b border-gray-200", children: _jsx("h2", { className: "text-xl font-bold text-gray-900", children: "Review Article" }) }), _jsxs("div", { className: "px-6 py-4", children: [_jsxs("div", { className: "mb-6 pb-6 border-b border-gray-200", children: [_jsx("h3", { className: "font-bold text-lg text-gray-900 mb-2", children: article.title }), article.authors && (_jsxs("p", { className: "text-sm text-gray-600 mb-1", children: [_jsx("strong", { children: "Authors:" }), " ", article.authors] })), article.journal && (_jsxs("p", { className: "text-sm text-gray-600 mb-1", children: [_jsx("strong", { children: "Journal:" }), " ", article.journal] })), article.publicationYear && (_jsxs("p", { className: "text-sm text-gray-600 mb-1", children: [_jsx("strong", { children: "Year:" }), " ", article.publicationYear] })), article.pmid && (_jsxs("p", { className: "text-sm text-gray-600", children: [_jsx("strong", { children: "PMID:" }), " ", article.pmid] })), article.abstract && (_jsxs("div", { className: "mt-4", children: [_jsx("p", { className: "text-sm text-gray-600", children: _jsx("strong", { children: "Abstract:" }) }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: article.abstract })] }))] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [error && (_jsx("div", { className: "rounded-md bg-red-50 p-4", children: _jsx("p", { className: "text-sm text-red-700", children: error }) })), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Review Status" }), _jsxs("select", { value: status, onChange: (e) => setStatus(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500", children: [_jsx("option", { value: "UNREVIEWED", children: "Unreviewed" }), _jsx("option", { value: "INCLUDED", children: "Included" }), _jsx("option", { value: "EXCLUDED", children: "Excluded" }), _jsx("option", { value: "MAYBE", children: "Maybe" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Review Notes" }), _jsx("textarea", { value: reviewNotes, onChange: (e) => setReviewNotes(e.target.value), rows: 4, placeholder: "Add your review notes here...", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" })] }), _jsxs("div", { className: "flex justify-end gap-4 pt-4", children: [_jsx("button", { type: "button", onClick: onClose, className: "px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50", children: "Cancel" }), _jsx("button", { type: "submit", disabled: isLoading, className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50", children: isLoading ? 'Saving...' : 'Save Review' })] })] })] })] }) }));
};
export default ReviewModal;
