import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../api/client';
import { Project } from '../types';
import Layout from '../components/Layout';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { organizationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await apiClient.getProjects(organizationId);
        setProjects(data);
      } catch (err: any) {
        setError('Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [organizationId]);

  if (isLoading) {
    return <Layout title="Projects"><div>Loading...</div></Layout>;
  }

  if (error) {
    return <Layout title="Projects"><div className="text-red-600">{error}</div></Layout>;
  }

  return (
    <Layout title="Projects">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-blue-600 hover:text-blue-800"
      >
        ← Back to Organizations
      </button>

      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        <div className="grid gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{project.name}</h3>
                {project.description && (
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">{project.description}</p>
                )}
                <div className="mt-4">
                  <span className="text-sm text-gray-600">
                    {project._count?.articles || 0} articles
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Projects;
