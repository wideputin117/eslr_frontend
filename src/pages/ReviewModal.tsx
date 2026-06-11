import React, { useState } from 'react';
import { Article } from '../types';
import { apiClient } from '../api/client';

interface ReviewModalProps {
  article: Article;
  onClose: () => Promise<void>;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ article, onClose }) => {
  const [status, setStatus] = useState<string>(article.status);
  const [reviewNotes, setReviewNotes] = useState(article.reviewNotes || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await apiClient.updateArticleReview(article.id, {
        status,
        reviewNotes: reviewNotes || undefined,
      });
      await onClose();
    } catch (err: any) {
      setError('Failed to update review');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Review Article</h2>
        </div>

        <div className="px-6 py-4">
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="font-bold text-lg text-gray-900 mb-2">{article.title}</h3>
            {article.authors && (
              <p className="text-sm text-gray-600 mb-1">
                <strong>Authors:</strong> {article.authors}
              </p>
            )}
            {article.journal && (
              <p className="text-sm text-gray-600 mb-1">
                <strong>Journal:</strong> {article.journal}
              </p>
            )}
            {article.publicationYear && (
              <p className="text-sm text-gray-600 mb-1">
                <strong>Year:</strong> {article.publicationYear}
              </p>
            )}
            {article.pmid && (
              <p className="text-sm text-gray-600">
                <strong>PMID:</strong> {article.pmid}
              </p>
            )}
            {article.abstract && (
              <div className="mt-4">
                <p className="text-sm text-gray-600"><strong>Abstract:</strong></p>
                <p className="text-sm text-gray-500 mt-1">{article.abstract}</p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="UNREVIEWED">Unreviewed</option>
                <option value="INCLUDED">Included</option>
                <option value="EXCLUDED">Excluded</option>
                <option value="MAYBE">Maybe</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Notes
              </label>
              <textarea
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                rows={4}
                placeholder="Add your review notes here..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
