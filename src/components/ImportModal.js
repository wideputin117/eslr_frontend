import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { apiClient } from '../api/client';
const ImportModal = ({ projectId, onClose, onSuccess }) => {
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCommitting, setIsCommitting] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);
    const handleFileSelect = async (e) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile)
            return;
        setIsLoading(true);
        setError(null);
        try {
            const previewData = await apiClient.importArticlesPreview(projectId, selectedFile);
            setPreview(previewData);
        }
        catch (err) {
            setError('Failed to preview file');
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleImport = async () => {
        if (!preview)
            return;
        setIsCommitting(true);
        setError(null);
        try {
            await apiClient.importArticlesCommit(projectId, preview.articles);
            onSuccess();
        }
        catch (err) {
            setError('Failed to import articles');
        }
        finally {
            setIsCommitting(false);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto", children: [_jsx("div", { className: "px-6 py-4 border-b border-gray-200", children: _jsx("h2", { className: "text-xl font-bold text-gray-900", children: "Import Articles" }) }), _jsxs("div", { className: "px-6 py-4", children: [error && (_jsx("div", { className: "mb-4 rounded-md bg-red-50 p-4", children: _jsx("p", { className: "text-sm text-red-700", children: error }) })), !preview ? (_jsxs("div", { children: [_jsxs("p", { className: "text-gray-600 mb-4", children: ["Upload an Excel file (.xlsx) with article data. The file should have columns:", _jsx("span", { className: "block text-sm mt-2 text-gray-500", children: "title (required), pmid, authors, journal, publicationYear, abstract, doi" })] }), _jsxs("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center", children: [_jsx("input", { ref: fileInputRef, type: "file", accept: ".xlsx", onChange: handleFileSelect, disabled: isLoading, className: "hidden" }), _jsx("button", { onClick: () => fileInputRef.current?.click(), disabled: isLoading, className: "text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50", children: isLoading ? 'Processing...' : 'Click to select file' })] })] })) : (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { className: "bg-blue-50 p-4 rounded", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Total Rows" }), _jsx("p", { className: "text-2xl font-bold text-blue-600", children: preview.totalRows })] }), _jsxs("div", { className: "bg-green-50 p-4 rounded", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Valid" }), _jsx("p", { className: "text-2xl font-bold text-green-600", children: preview.validCount })] }), _jsxs("div", { className: "bg-red-50 p-4 rounded", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Errors" }), _jsx("p", { className: "text-2xl font-bold text-red-600", children: preview.errorCount })] })] }), preview.errorCount > 0 && (_jsxs("div", { className: "border border-red-200 rounded p-4 bg-red-50", children: [_jsx("h4", { className: "font-medium text-red-900 mb-2", children: "Import Errors:" }), _jsx("div", { className: "space-y-1 text-sm text-red-700 max-h-48 overflow-y-auto", children: preview.errors.map((err, idx) => (_jsxs("p", { children: ["Row ", err.row, ": ", err.error] }, idx))) })] })), preview.validCount > 0 && (_jsxs("div", { className: "border border-green-200 rounded p-4 bg-green-50", children: [_jsxs("h4", { className: "font-medium text-green-900 mb-2", children: [preview.validCount, " articles ready to import"] }), _jsx("div", { className: "text-sm text-green-700 max-h-48 overflow-y-auto", children: preview.articles.map((article, idx) => (_jsx("p", { className: "truncate", children: article.title }, idx))) })] }))] })), _jsxs("div", { className: "flex justify-end gap-4 pt-6 mt-6 border-t border-gray-200", children: [_jsx("button", { onClick: onClose, disabled: isLoading || isCommitting, className: "px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50", children: "Close" }), preview && preview.validCount > 0 && (_jsx("button", { onClick: handleImport, disabled: isCommitting, className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50", children: isCommitting ? 'Importing...' : `Import ${preview.validCount} Articles` }))] })] })] }) }));
};
export default ImportModal;
