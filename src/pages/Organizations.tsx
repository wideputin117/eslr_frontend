import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../api/client';
import { Organization } from '../types';
import Layout from '../components/Layout';

const Organizations: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await apiClient.getOrganizations();
        setOrganizations(data);
      } catch (err: any) {
        setError('Failed to load organizations');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  if (isLoading) {
    return <Layout title="Organizations"><div>Loading...</div></Layout>;
  }

  if (error) {
    return <Layout title="Organizations"><div className="text-red-600">{error}</div></Layout>;
  }

  return (
    <Layout title="Organizations">
      {organizations.length === 0 ? (
        <p>No organizations found</p>
      ) : (
        <div className="grid gap-6">
          {organizations.map((org) => (
            <div
              key={org.id}
              className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/organizations/${org.id}/projects`)}
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{org.name}</h3>
                {org.description && (
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">{org.description}</p>
                )}
                <div className="mt-4 flex items-center">
                  <span className="text-sm text-gray-600">
                    {org.projects?.length || 0} projects
                  </span>
                  <span className="ml-4 text-sm text-gray-600">
                    {org.members?.length || 0} members
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

export default Organizations;
