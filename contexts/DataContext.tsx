import React, { createContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { collection, onSnapshot, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';
import { Project, Task, StaffMember, Document, CostItem } from '../types';
import { sampleProjects, sampleTasks, sampleStaff, sampleCosts } from '../sample-data';

interface DataContextProps {
    projects: Project[];
    tasks: Task[];
    staffMembers: StaffMember[];
    documents: Document[];
    costs: CostItem[];
    loading: boolean;
    showSampleData: boolean;
    toggleShowSampleData: () => void;
}

export const DataContext = createContext<DataContextProps>({
    projects: [],
    tasks: [],
    staffMembers: [],
    documents: [],
    costs: [],
    loading: true,
    showSampleData: false,
    toggleShowSampleData: () => {},
});

interface DataProviderProps {
    children: ReactNode;
}

const docToType = <T,>(doc: QueryDocumentSnapshot<DocumentData>): T => {
    return { ...doc.data(), id: doc.id } as T;
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [liveProjects, setLiveProjects] = useState<Project[]>([]);
    const [liveTasks, setLiveTasks] = useState<Task[]>([]);
    const [liveStaffMembers, setLiveStaffMembers] = useState<StaffMember[]>([]);
    const [liveDocuments, setLiveDocuments] = useState<Document[]>([]);
    const [liveCosts, setLiveCosts] = useState<CostItem[]>([]);
    const [loading, setLoading] = useState(true);

    const [showSampleData, setShowSampleData] = useState<boolean>(() => {
        try {
            const stored = localStorage.getItem('showSampleData');
            return stored ? JSON.parse(stored) : false;
        } catch {
            return false;
        }
    });

    useEffect(() => {
        localStorage.setItem('showSampleData', JSON.stringify(showSampleData));
    }, [showSampleData]);

    const toggleShowSampleData = () => {
        setShowSampleData(prev => !prev);
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);

            const unsubProjects = onSnapshot(collection(db, 'projects'), (snapshot) => {
                setLiveProjects(snapshot.docs.map(doc => docToType<Project>(doc)));
            });

            const unsubTasks = onSnapshot(collection(db, 'tasks'), (snapshot) => {
                setLiveTasks(snapshot.docs.map(doc => docToType<Task>(doc)));
            });

            const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
                setLiveStaffMembers(snapshot.docs.map(doc => docToType<StaffMember>(doc)));
            });

            const unsubDocuments = onSnapshot(collection(db, 'documents'), (snapshot) => {
                setLiveDocuments(snapshot.docs.map(doc => docToType<Document>(doc)));
            });
            
            const unsubCosts = onSnapshot(collection(db, 'costs'), (snapshot) => {
                setLiveCosts(snapshot.docs.map(doc => docToType<CostItem>(doc)));
            });

            setTimeout(() => setLoading(false), 1500);

            return () => {
                unsubProjects();
                unsubTasks();
                unsubUsers();
                unsubDocuments();
                unsubCosts();
            };
        };
        
        fetchInitialData();
    }, []);

    const projects = useMemo(() => showSampleData ? [...sampleProjects, ...liveProjects] : liveProjects, [showSampleData, liveProjects]);
    const tasks = useMemo(() => showSampleData ? [...sampleTasks, ...liveTasks] : liveTasks, [showSampleData, liveTasks]);
    const staffMembers = useMemo(() => showSampleData ? [...sampleStaff, ...liveStaffMembers] : liveStaffMembers, [showSampleData, liveStaffMembers]);
    const costs = useMemo(() => showSampleData ? [...sampleCosts, ...liveCosts] : liveCosts, [showSampleData, liveCosts]);
    const documents = useMemo(() => liveDocuments, [liveDocuments]); // No sample documents for now.

    return (
        <DataContext.Provider value={{ projects, tasks, staffMembers, documents, costs, loading, showSampleData, toggleShowSampleData }}>
            {children}
        </DataContext.Provider>
    );
};