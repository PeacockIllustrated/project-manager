import { Project, Task, StaffMember, CostItem, ChangeRequest } from '../types';
import { sampleProjects, sampleTasks, sampleStaff, sampleCosts } from '../sample-data';

const PROJECTS_KEY = 'app_projects';
const TASKS_KEY = 'app_tasks';
const STAFF_KEY = 'app_staff';
const COSTS_KEY = 'app_costs';
const CHANGE_REQUESTS_KEY = 'app_change_requests';

// Generic getter
const getData = <T,>(key: string): T[] => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error(`Error reading ${key} from localStorage`, error);
        return [];
    }
};

// Generic setter
const saveData = <T,>(key: string, data: T[]): void => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving ${key} to localStorage`, error);
    }
};

// Initialization: If no data exists, populate with sample data
export const initializeData = (): void => {
    if (!localStorage.getItem(PROJECTS_KEY)) {
        saveData(PROJECTS_KEY, sampleProjects);
    }
    if (!localStorage.getItem(TASKS_KEY)) {
        saveData(TASKS_KEY, sampleTasks);
    }
    if (!localStorage.getItem(STAFF_KEY)) {
        saveData(STAFF_KEY, sampleStaff);
    }
    if (!localStorage.getItem(COSTS_KEY)) {
        saveData(COSTS_KEY, sampleCosts);
    }
    if (!localStorage.getItem(CHANGE_REQUESTS_KEY)) {
        saveData(CHANGE_REQUESTS_KEY, []);
    }
};

export const clearData = (): void => {
    localStorage.removeItem(PROJECTS_KEY);
    localStorage.removeItem(TASKS_KEY);
    localStorage.removeItem(STAFF_KEY);
    localStorage.removeItem(COSTS_KEY);
    localStorage.removeItem(CHANGE_REQUESTS_KEY);
}

// Projects
export const getProjects = (): Project[] => getData<Project>(PROJECTS_KEY);
export const saveProjects = (projects: Project[]): void => saveData(PROJECTS_KEY, projects);

// Tasks
export const getTasks = (): Task[] => getData<Task>(TASKS_KEY);
export const saveTasks = (tasks: Task[]): void => saveData(TASKS_KEY, tasks);

// Staff
export const getStaff = (): StaffMember[] => getData<StaffMember>(STAFF_KEY);
export const saveStaff = (staff: StaffMember[]): void => saveData(STAFF_KEY, staff);

// Costs
export const getCosts = (): CostItem[] => getData<CostItem>(COSTS_KEY);
export const saveCosts = (costs: CostItem[]): void => saveData(COSTS_KEY, costs);

// Change Requests
export const getChangeRequests = (): ChangeRequest[] => getData<ChangeRequest>(CHANGE_REQUESTS_KEY);
export const saveChangeRequests = (requests: ChangeRequest[]): void => saveData(CHANGE_REQUESTS_KEY, requests);
