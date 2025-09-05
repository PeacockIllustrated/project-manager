import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Project, Task, StaffMember, Document, CostItem, ChangeRequest } from '../types';
import * as LocalStorageService from '../services/localStorageService';

interface DataContextProps {
    projects: Project[];
    tasks: Task[];
    staffMembers: StaffMember[];
    documents: Document[];
    costs: CostItem[];
    loading: boolean;
    resetData: () => void;
    addProject: (project: Omit<Project, 'id'>) => void;
    updateProject: (project: Project) => void;
    deleteProject: (projectId: string) => void;
    addTask: (task: Omit<Task, 'id'>) => void;
    updateTask: (task: Task) => void;
    deleteTask: (taskId: string) => void;
    addStaff: (staff: Omit<StaffMember, 'id'>) => void;
    updateStaff: (staff: StaffMember) => void;
    deleteStaff: (staffId: string) => void;
    addCost: (cost: Omit<CostItem, 'id'>) => void;
    updateCost: (cost: CostItem) => void;
    deleteCost: (costId: string) => void;
    addDocument: (document: Omit<Document, 'id'>) => void;
    deleteDocument: (documentId: string) => void;
    addChangeRequest: (request: Omit<ChangeRequest, 'id' | 'submittedAt'>) => void;
}

export const DataContext = createContext<DataContextProps | undefined>(undefined);

interface DataProviderProps {
    children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
    const [documents, setDocuments] = useState<Document[]>([]); // In-memory only
    const [costs, setCosts] = useState<CostItem[]>([]);
    const [loading, setLoading] = useState(true);

    const loadData = useCallback(() => {
        setLoading(true);
        LocalStorageService.initializeData();
        setProjects(LocalStorageService.getProjects());
        setTasks(LocalStorageService.getTasks());
        setStaffMembers(LocalStorageService.getStaff());
        setCosts(LocalStorageService.getCosts());
        // Documents are not persisted
        setDocuments([]); 
        setLoading(false);
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const resetData = useCallback(() => {
        LocalStorageService.clearData();
        loadData();
    }, [loadData]);
    
    // Generic update and save function
    const updateAndSave = <T extends { id: string }>(
        items: T[], 
        setter: React.Dispatch<React.SetStateAction<T[]>>, 
        saveFunction: (data: T[]) => void, 
        updatedItem: T
    ) => {
        const newItems = items.map(item => item.id === updatedItem.id ? updatedItem : item);
        setter(newItems);
        saveFunction(newItems);
    };

    // Generic delete and save function
     const deleteAndSave = <T extends { id:string } >(
        items: T[],
        setter: React.Dispatch<React.SetStateAction<T[]>>,
        saveFunction: (data: T[]) => void,
        itemId: string
    ) => {
        const newItems = items.filter(item => item.id !== itemId);
        setter(newItems);
        saveFunction(newItems);
    }
    
    // Projects
    const addProject = (projectData: Omit<Project, 'id'>) => {
        const newProject = { ...projectData, id: uuidv4() };
        const updatedProjects = [...projects, newProject];
        setProjects(updatedProjects);
        LocalStorageService.saveProjects(updatedProjects);
    };
    const updateProject = (project: Project) => updateAndSave(projects, setProjects, LocalStorageService.saveProjects, project);
    const deleteProject = (projectId: string) => {
        const newProjects = projects.filter(p => p.id !== projectId);
        const newTasks = tasks.filter(t => t.projectId !== projectId);
        const newCosts = costs.filter(c => c.projectId !== projectId);
        const newDocuments = documents.filter(d => d.projectId !== projectId);

        setProjects(newProjects);
        setTasks(newTasks);
        setCosts(newCosts);
        setDocuments(newDocuments);

        LocalStorageService.saveProjects(newProjects);
        LocalStorageService.saveTasks(newTasks);
        LocalStorageService.saveCosts(newCosts);
    };
    
    // Tasks
    const addTask = (taskData: Omit<Task, 'id'>) => {
        const newTask = { ...taskData, id: uuidv4() };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        LocalStorageService.saveTasks(updatedTasks);
    };
    const updateTask = (task: Task) => updateAndSave(tasks, setTasks, LocalStorageService.saveTasks, task);
    const deleteTask = (taskId: string) => deleteAndSave(tasks, setTasks, LocalStorageService.saveTasks, taskId);
    
    // Staff
    const addStaff = (staffData: Omit<StaffMember, 'id'>) => {
        const newStaff = { ...staffData, id: uuidv4() };
        const updatedStaff = [...staffMembers, newStaff];
        setStaffMembers(updatedStaff);
        LocalStorageService.saveStaff(updatedStaff);
    };
    const updateStaff = (staff: StaffMember) => updateAndSave(staffMembers, setStaffMembers, LocalStorageService.saveStaff, staff);
    const deleteStaff = (staffId: string) => deleteAndSave(staffMembers, setStaffMembers, LocalStorageService.saveStaff, staffId);
    
    // Costs
    const addCost = (costData: Omit<CostItem, 'id'>) => {
        const newCost = { ...costData, id: uuidv4() };
        const updatedCosts = [...costs, newCost];
        setCosts(updatedCosts);
        LocalStorageService.saveCosts(updatedCosts);
    };
    const updateCost = (cost: CostItem) => updateAndSave(costs, setCosts, LocalStorageService.saveCosts, cost);
    const deleteCost = (costId: string) => deleteAndSave(costs, setCosts, LocalStorageService.saveCosts, costId);
    
    // Documents (in-memory only)
    const addDocument = (docData: Omit<Document, 'id'>) => {
        setDocuments(prev => [...prev, { ...docData, id: uuidv4() }]);
    };
    const deleteDocument = (docId: string) => {
        setDocuments(prev => prev.filter(d => d.id !== docId));
    };

    // Change Requests
    const addChangeRequest = (request: Omit<ChangeRequest, 'id' | 'submittedAt'>) => {
        const changeRequests = LocalStorageService.getChangeRequests();
        const newRequest = { ...request, id: uuidv4(), submittedAt: new Date().toISOString() };
        const updatedRequests = [...changeRequests, newRequest];
        LocalStorageService.saveChangeRequests(updatedRequests);
    };


    const value = {
        projects, tasks, staffMembers, documents, costs, loading, resetData,
        addProject, updateProject, deleteProject,
        addTask, updateTask, deleteTask,
        addStaff, updateStaff, deleteStaff,
        addCost, updateCost, deleteCost,
        addDocument, deleteDocument,
        addChangeRequest,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};