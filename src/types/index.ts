export interface User {
  id: string;
  email: string;
  name?: string;
  memberships?: Membership[];
  projectMembers?: ProjectMember[];
}

export interface Membership {
  userId: string;
  organizationId: string;
  role: 'OWNER' | 'MEMBER' | 'REVIEWER';
  organization: Organization;
}

export interface Organization {
  id: string;
  name: string;
  description?: string;
  members?: Membership[];
  projects?: Project[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMember {
  userId: string;
  projectId: string;
  role: 'OWNER' | 'MEMBER' | 'REVIEWER';
  project: Project;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  organizationId: string;
  organization?: Organization;
  members?: ProjectMember[];
  _count?: { articles: number };
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: string;
  projectId: string;
  title: string;
  pmid?: string;
  authors?: string;
  journal?: string;
  publicationYear?: number;
  abstract?: string;
  doi?: string;
  status: 'UNREVIEWED' | 'INCLUDED' | 'EXCLUDED' | 'MAYBE';
  reviewNotes?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewer?: { id: string; name?: string; email: string };
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ArticlesResponse {
  articles: Article[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ImportPreviewResponse {
  articles: Partial<Article>[];
  errors: { row: number; error: string; pmid?: string }[];
  totalRows: number;
  validCount: number;
  errorCount: number;
}
