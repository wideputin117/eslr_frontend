import React, { useRef, useState } from 'react';
import { apiClient } from '../api/client';
import { ImportPreviewResponse } from '../types';

interface ImportModalProps {
  projectId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ projectId, onClose, onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<ImportPreviewResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommitting, setIsCommitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setIsLoading(true);
    setError(null);

    try {
      const previewData = await apiClient.importArticlesPreview(projectId, selectedFile);
      setPreview(previewData);
    } catch (err: any) {
      setError('Failed to preview file');
      setFile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = async () => {
    if (!preview) return;

    setIsCommitting(true);
    setError(null);

    try {
      await apiClient.importArticlesCommit(projectId, preview.articles);
      onSuccess();
    } catch (err: any) {
      setError('Failed to import articles');
    } finally {
      setIsCommitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Import Articles</h2>
        </div>

        <div className="px-6 py-4">
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {!preview ? (
            <div>
              <p className="text-gray-600 mb-4">
                Upload an Excel file (.xlsx) with article data. The file should have columns:
                <span className="block text-sm mt-2 text-gray-500">
                  title (required), pmid, authors, journal, publicationYear, abstract, doi
                </span>
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx"
                  onChange={handleFileSelect}
                  disabled={isLoading}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className="text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : 'Click to select file'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Total Rows</p>
                  <p className="text-2xl font-bold text-blue-600">{preview.totalRows}</p>
                </div>
                <div className="bg-green-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Valid</p>
                  <p className="text-2xl font-bold text-green-600">{preview.validCount}</p>
                </div>
                <div className="bg-red-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Errors</p>
                  <p className="text-2xl font-bold text-red-600">{preview.errorCount}</p>
                </div>
              </div>

              {preview.errorCount > 0 && (
                <div className="border border-red-200 rounded p-4 bg-red-50">
                  <h4 className="font-medium text-red-900 mb-2">Import Errors:</h4>
                  <div className="space-y-1 text-sm text-red-700 max-h-48 overflow-y-auto">
                    {preview.errors.map((err, idx) => (
                      <p key={idx}>
                        Row {err.row}: {err.error}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {preview.validCount > 0 && (
                <div className="border border-green-200 rounded p-4 bg-green-50">
                  <h4 className="font-medium text-green-900 mb-2">
                    {preview.validCount} articles ready to import
                  </h4>
                  <div className="text-sm text-green-700 max-h-48 overflow-y-auto">
                    {preview.articles.map((article, idx) => (
                      <p key={idx} className="truncate">
                        {article.title}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-4 pt-6 mt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              disabled={isLoading || isCommitting}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Close
            </button>
            {preview && preview.validCount > 0 && (
              <button
                onClick={handleImport}
                disabled={isCommitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isCommitting ? 'Importing...' : `Import ${preview.validCount} Articles`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
