import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../api/client';
import { Article, Project, ArticlesResponse } from '../types';
import Layout from '../components/Layout';
import ArticleTable from '../components/ArticleTable';
import ImportModal from '../components/ImportModal';

const ProjectWorkspace: React.FC = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 1 });

  const { projectId } = useParams();
  const navigate = useNavigate();

  const fetchProject = async () => {
    try {
      const data = await apiClient.getProject(projectId!);
      setProject(data);
    } catch (err: any) {
      setError('Failed to load project');
    }
  };

  const fetchArticles = async () => {
    try {
      const data: ArticlesResponse = await apiClient.getArticles(projectId!, {
        status: statusFilter || undefined,
        search: searchQuery || undefined,
        page: currentPage,
        limit: 20,
      });
      setArticles(data.articles);
      setPagination(data.pagination);
    } catch (err: any) {
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
    return <Layout title="Project Workspace"><div>Loading...</div></Layout>;
  }

  if (error) {
    return <Layout title="Project Workspace"><div className="text-red-600">{error}</div></Layout>;
  }

  return (
    <Layout title={project?.name || 'Project'}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back
          </button>
          <button
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Import Articles
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, authors, or PMID..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="UNREVIEWED">Unreviewed</option>
                <option value="INCLUDED">Included</option>
                <option value="EXCLUDED">Excluded</option>
                <option value="MAYBE">Maybe</option>
              </select>
            </div>
          </div>

          <ArticleTable
            articles={articles}
            projectId={projectId!}
            onReviewUpdate={handleReviewUpdate}
          />

          {pagination.pages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {currentPage} of {pagination.pages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(pagination.pages, currentPage + 1))}
                disabled={currentPage === pagination.pages}
                className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {showImportModal && (
        <ImportModal
          projectId={projectId!}
          onClose={() => setShowImportModal(false)}
          onSuccess={handleImportSuccess}
        />
      )}
    </Layout>
  );
};

export default ProjectWorkspace;
