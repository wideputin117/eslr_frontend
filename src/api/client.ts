import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
class APIClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Load token from localStorage
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.setAuthHeader();
    }

    // Add interceptor to set token
    this.client.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });
  }

  private setAuthHeader() {
    if (this.token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    }
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
    this.setAuthHeader();
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
    delete this.client.defaults.headers.common['Authorization'];
  }

  // Auth endpoints
  async register(email: string, password: string, name?: string) {
    const response = await this.client.post('/auth/register', { email, password, name });
    return response.data;
  }

  async login(email: string, password: string) {
    const response = await this.client.post('/auth/login', { email, password });
    return response.data;
  }

  async getMe() {
    const response = await this.client.get('/auth/me');
    return response.data;
  }

  // Organizations endpoints
  async getOrganizations() {
    const response = await this.client.get('/organizations');
    return response.data;
  }

  async getOrganization(organizationId: string) {
    const response = await this.client.get(`/organizations/${organizationId}`);
    return response.data;
  }

  // Projects endpoints
  async getProjects(organizationId?: string) {
    const params = organizationId ? { organizationId } : {};
    const response = await this.client.get('/projects', { params });
    return response.data;
  }

  async getProject(projectId: string) {
    const response = await this.client.get(`/projects/${projectId}`);
    return response.data;
  }

  // Articles endpoints
  async getArticles(projectId: string, filters?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const params = { projectId, ...filters };
    const response = await this.client.get('/articles', { params });
    return response.data;
  }

  async updateArticleReview(articleId: string, data: {
    status: string;
    reviewNotes?: string;
  }) {
    const response = await this.client.patch(`/articles/${articleId}/review`, data);
    return response.data;
  }

  async importArticlesPreview(projectId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await this.client.post(`/articles/import/preview?projectId=${projectId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async importArticlesCommit(projectId: string, articles: any[]) {
    const response = await this.client.post(`/articles/import/commit?projectId=${projectId}`, {
      articles,
    });
    return response.data;
  }
}

export const apiClient = new APIClient();
