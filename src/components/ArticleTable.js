import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import ReviewModal from "../pages/ReviewModal";
const ArticleTable = ({ articles, onReviewUpdate }) => {
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const handleReviewClick = (article) => {
        setSelectedArticle(article);
        setShowReviewModal(true);
    };
    const handleReviewClose = async () => {
        setShowReviewModal(false);
        setSelectedArticle(null);
        await onReviewUpdate();
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'INCLUDED':
                return 'bg-green-100 text-green-800';
            case 'EXCLUDED':
                return 'bg-red-100 text-red-800';
            case 'MAYBE':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-50 border-b border-gray-200", children: [_jsx("th", { className: "px-6 py-3 text-left font-medium text-gray-700", children: "Title" }), _jsx("th", { className: "px-6 py-3 text-left font-medium text-gray-700", children: "Authors" }), _jsx("th", { className: "px-6 py-3 text-left font-medium text-gray-700", children: "Journal" }), _jsx("th", { className: "px-6 py-3 text-left font-medium text-gray-700", children: "Status" }), _jsx("th", { className: "px-6 py-3 text-left font-medium text-gray-700", children: "Action" })] }) }), _jsx("tbody", { children: articles.map((article) => (_jsxs("tr", { className: "border-b border-gray-200 hover:bg-gray-50", children: [_jsx("td", { className: "px-6 py-4", children: _jsxs("div", { className: "max-w-xs", children: [_jsx("p", { className: "font-medium text-gray-900", children: article.title }), article.pmid && (_jsxs("p", { className: "text-xs text-gray-500", children: ["PMID: ", article.pmid] }))] }) }), _jsx("td", { className: "px-6 py-4 text-gray-600 text-xs", children: article.authors || '-' }), _jsx("td", { className: "px-6 py-4 text-gray-600 text-xs", children: article.journal || '-' }), _jsx("td", { className: "px-6 py-4", children: _jsx("span", { className: `px-2 py-1 rounded text-xs font-medium ${getStatusColor(article.status)}`, children: article.status }) }), _jsx("td", { className: "px-6 py-4", children: _jsx("button", { onClick: () => handleReviewClick(article), className: "text-blue-600 hover:text-blue-800 font-medium", children: "Review" }) })] }, article.id))) })] }) }), articles.length === 0 && (_jsx("div", { className: "text-center py-8 text-gray-500", children: "No articles found" })), selectedArticle && showReviewModal && (_jsx(ReviewModal, { article: selectedArticle, onClose: handleReviewClose }))] }));
};
export default ArticleTable;
