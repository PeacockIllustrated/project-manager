export enum ProjectStatus {
  Active = 'Active',
  Quoting = 'Quoting',
  Completed = 'Completed',
  OnHold = 'On Hold',
}

export interface Project {
  id: string;
  name: string;
  address: string;
  client: string;
  progress: number; // Percentage 0-100
  status: ProjectStatus;
  quoteAmount?: number;
  isSample?: boolean;
}

export enum TaskStatus {
  ToDo = 'To Do',
  InProgress = 'In Progress',
  Completed = 'Completed',
}

export enum TaskPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface StaffMember {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
  email: string;
  phone: string;
  isSample?: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string; // ISO 8601 format
  assigneeId: string;
  projectId: string;
  isSample?: boolean;
}

export interface Document {
  id: string;
  name: string;
  url: string;
  projectId: string;
  fileType: string;
  storagePath: string;
  uploadedAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface CostItem {
  id: string;
  projectId: string;
  description: string;
  amount: number;
  type: 'material' | 'labor';
  date: string; // ISO 8601 format
  documentId?: string; // Optional link to a document
  isSample?: boolean;
}

export interface InvoiceData {
  vendor: string;
  date: string; // Expects YYYY-MM-DD
  totalAmount: number;
}

export interface ProjectWithTasks extends Project {
    tasks: Task[];
}

export type Page = 
  | 'Project Hub' 
  | 'Tasks' 
  | 'Schedule'
  | 'Staff'
  | 'Documents' 
  | 'Financials' 
  | 'Client Portal' 
  | 'Settings';

export enum ChangeRequestPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface ChangeRequest {
  id: string;
  description: string;
  featureArea: Page;
  priority: ChangeRequestPriority;
  submittedAt: {
    seconds: number;
    nanoseconds: number;
  };
}