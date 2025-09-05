import { Project, ProjectStatus, Task, TaskStatus, TaskPriority, StaffMember, CostItem } from './types';

export const sampleStaff: StaffMember[] = [
    {
        id: 'sample-staff-1',
        name: 'Olivia Chen (Sample)',
        avatarUrl: 'https://i.pravatar.cc/150?u=olivia',
        role: 'Lead Developer',
        email: 'olivia.c@example.com',
        phone: '07700 900101',
        isSample: true,
    },
    {
        id: 'sample-staff-2',
        name: 'Ben Carter (Sample)',
        avatarUrl: 'https://i.pravatar.cc/150?u=ben',
        role: 'Junior Developer',
        email: 'ben.c@example.com',
        phone: '07700 900102',
        isSample: true,
    },
    {
        id: 'sample-staff-3',
        name: 'Sophia Rodriguez (Sample)',
        avatarUrl: 'https://i.pravatar.cc/150?u=sophia',
        role: 'QA Engineer',
        email: 'sophia.r@example.com',
        phone: '07700 900103',
        isSample: true,
    }
];

export const sampleProjects: Project[] = [
  {
    id: 'sample-proj-1',
    name: 'Client Project Alpha (Sample)',
    address: '123 Business Park, London, W1 1AA',
    client: 'Alpha Corp',
    progress: 75,
    status: ProjectStatus.Active,
    quoteAmount: 42000,
    isSample: true,
  },
  {
    id: 'sample-proj-2',
    name: 'Internal Initiative Q3 (Sample)',
    address: '456 Innovation Hub, Manchester, M1 1AA',
    client: 'Internal',
    progress: 10,
    status: ProjectStatus.Active,
    quoteAmount: 18500,
    isSample: true,
  },
   {
    id: 'sample-proj-3',
    name: 'Marketing Campaign Launch (Sample)',
    address: '789 Creative Suite, Birmingham, B1 1AA',
    client: 'Marketing Dept.',
    progress: 30,
    status: ProjectStatus.OnHold,
    quoteAmount: 110000,
    isSample: true,
  },
  {
    id: 'sample-proj-4',
    name: 'Software Upgrade (Sample)',
    address: '101 Tech Campus, Bristol, BS1 1AA',
    client: 'IT Department',
    progress: 100,
    status: ProjectStatus.Completed,
    quoteAmount: 32000,
    isSample: true,
  },
];


export const sampleTasks: Task[] = [
    // Project 1 Tasks
    { id: 'sample-task-1', title: 'Finalize project scope', description: 'Meet with Alpha Corp to get final sign-off on the design.', status: TaskStatus.Completed, priority: TaskPriority.High, dueDate: '2024-08-10T00:00:00Z', assigneeId: 'sample-staff-1', projectId: 'sample-proj-1', isSample: true },
    { id: 'sample-task-2', title: 'Procure necessary assets', description: 'Purchase stock imagery and software licenses.', status: TaskStatus.InProgress, priority: TaskPriority.High, dueDate: '2024-08-25T00:00:00Z', assigneeId: 'sample-staff-1', projectId: 'sample-proj-1', isSample: true },
    { id: 'sample-task-3', title: 'Initial setup & env config', description: 'Setup the development and staging environments.', status: TaskStatus.Completed, priority: TaskPriority.Medium, dueDate: '2024-08-15T00:00:00Z', assigneeId: 'sample-staff-2', projectId: 'sample-proj-1', isSample: true },
    { id: 'sample-task-4', title: 'Phase 1 development', description: 'Build out the core features as per the spec.', status: TaskStatus.InProgress, priority: TaskPriority.Medium, dueDate: '2024-09-05T00:00:00Z', assigneeId: 'sample-staff-1', projectId: 'sample-proj-1', isSample: true },
    { id: 'sample-task-5', title: 'Final review and deployment', description: 'Final QA pass and production deployment.', status: TaskStatus.ToDo, priority: TaskPriority.Low, dueDate: '2024-09-20T00:00:00Z', assigneeId: 'sample-staff-3', projectId: 'sample-proj-1', isSample: true },

    // Project 2 Tasks
    { id: 'sample-task-6', title: 'Market research and analysis', description: 'Analyze competitor strategies for Q3.', status: TaskStatus.InProgress, priority: TaskPriority.High, dueDate: '2024-08-30T00:00:00Z', assigneeId: 'sample-staff-1', projectId: 'sample-proj-2', isSample: true },
    { id: 'sample-task-7', title: 'Prepare campaign materials', description: 'Create ad copy, graphics, and landing pages.', status: TaskStatus.ToDo, priority: TaskPriority.Medium, dueDate: '2024-09-10T00:00:00Z', assigneeId: 'sample-staff-2', projectId: 'sample-proj-2', isSample: true },
    { id: 'sample-task-8', title: 'Launch social media campaign', description: 'Push the new campaign live across all platforms.', status: TaskStatus.ToDo, priority: TaskPriority.Medium, dueDate: '2024-09-25T00:00:00Z', assigneeId: 'sample-staff-1', projectId: 'sample-proj-2', isSample: true },

    // Project 4 (Completed) Tasks
    { id: 'sample-task-9', title: 'Server infrastructure setup', description: '', status: TaskStatus.Completed, priority: TaskPriority.High, dueDate: '2024-06-10T00:00:00Z', assigneeId: 'sample-staff-1', projectId: 'sample-proj-4', isSample: true },
    { id: 'sample-task-10', title: 'Database migration', description: '', status: TaskStatus.Completed, priority: TaskPriority.High, dueDate: '2024-06-20T00:00:00Z', assigneeId: 'sample-staff-2', projectId: 'sample-proj-4', isSample: true },
    { id: 'sample-task-11', title: 'Final deployment and testing', description: '', status: TaskStatus.Completed, priority: TaskPriority.Medium, dueDate: '2024-07-05T00:00:00Z', assigneeId: 'sample-staff-3', projectId: 'sample-proj-4', isSample: true },
];

export const sampleCosts: CostItem[] = [
    // Project 1 Costs
    { id: 'sample-cost-1', projectId: 'sample-proj-1', description: 'Software Licensing', amount: 7800, type: 'material', date: '2024-08-12T00:00:00Z', isSample: true },
    { id: 'sample-cost-2', projectId: 'sample-proj-1', description: 'Cloud Service Subscription', amount: 650, type: 'material', date: '2024-08-18T00:00:00Z', isSample: true },
    { id: 'sample-cost-3', projectId: 'sample-proj-1', description: 'Lead Developer - Labor (40 hours)', amount: 2800, type: 'labor', date: '2024-08-20T00:00:00Z', isSample: true },
    { id: 'sample-cost-4', projectId: 'sample-proj-1', description: 'Junior Developer - Labor (30 hours)', amount: 1050, type: 'labor', date: '2024-08-20T00:00:00Z', isSample: true },
    
    // Project 2 Costs
    { id: 'sample-cost-5', projectId: 'sample-proj-2', description: 'Stock Photo & Asset Purchase', amount: 3900, type: 'material', date: '2024-08-22T00:00:00Z', isSample: true },
    { id: 'sample-cost-6', projectId: 'sample-proj-2', description: 'Marketing Lead - Labor (16 hours)', amount: 1120, type: 'labor', date: '2024-08-25T00:00:00Z', isSample: true },

    // Project 4 Costs
    { id: 'sample-cost-7', projectId: 'sample-proj-4', description: 'New Server Hardware', amount: 3200, type: 'material', date: '2024-06-05T00:00:00Z', isSample: true },
    { id: 'sample-cost-8', projectId: 'sample-proj-4', description: 'Data Migration Tools', amount: 1500, type: 'material', date: '2024-06-25T00:00:00Z', isSample: true },
    { id: 'sample-cost-9', projectId: 'sample-proj-4', description: 'System Admin - Total Labor', amount: 14000, type: 'labor', date: '2024-07-10T00:00:00Z', isSample: true },
];