import React, { useState } from 'react';
import { Article } from '../types';
import { apiClient } from '../api/client';
import ReviewModal from "../pages/ReviewModal";

interface ArticleTableProps {
  articles: Article[];
  projectId: string;
  onReviewUpdate: () => Promise<void>;
}

const ArticleTable: React.FC<ArticleTableProps> = ({ articles, projectId, onReviewUpdate }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleReviewClick = (article: Article) => {
    setSelectedArticle(article);
    setShowReviewModal(true);
  };

  const handleReviewClose = async () => {
    setShowReviewModal(false);
    setSelectedArticle(null);
    await onReviewUpdate();
  };

  const getStatusColor = (status: string) => {
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

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left font-medium text-gray-700">Title</th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">Authors</th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">Journal</th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">Status</th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="max-w-xs">
                    <p className="font-medium text-gray-900">{article.title}</p>
                    {article.pmid && (
                      <p className="text-xs text-gray-500">PMID: {article.pmid}</p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 text-xs">{article.authors || '-'}</td>
                <td className="px-6 py-4 text-gray-600 text-xs">{article.journal || '-'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(article.status)}`}>
                    {article.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleReviewClick(article)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {articles.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No articles found
        </div>
      )}

      {selectedArticle && showReviewModal && (
        <ReviewModal
          article={selectedArticle}
          onClose={handleReviewClose}
        />
      )}
    </>
  );
};

export default ArticleTable;
