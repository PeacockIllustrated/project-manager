

import React, { useState, useEffect } from 'react';
import { useData } from '../../hooks/useData';
import ProjectSelector from '../documents/ProjectSelector';
import DocumentManager from '../documents/DocumentManager';

const Documents: React.FC = () => {
  const { projects, documents, costs, addDocument, deleteDocument } = useData();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Select first project by default on larger screens
  useEffect(() => {
    if (window.innerWidth >= 768 && projects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);


  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const projectDocuments = documents.filter(doc => doc.projectId === selectedProjectId);

  return (
    <div className="flex h-full bg-white rounded-xl shadow-md border border-brand-gray/50 overflow-hidden">
      {/* Project Selector View */}
      <div className={`w-full md:w-1/3 border-r border-brand-gray flex-col ${selectedProjectId ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-brand-gray">
          <h2 className="text-xl font-bold text-brand-charcoal">Projects</h2>
        </div>
        <div className="flex-grow overflow-y-auto">
          <ProjectSelector
            projects={projects}
            selectedProjectId={selectedProjectId}
            onSelectProject={setSelectedProjectId}
          />
        </div>
      </div>
      
      {/* Document Manager View */}
      <div className={`w-full md:w-2/3 flex-col ${selectedProjectId ? 'flex' : 'hidden md:flex'}`}>
        <DocumentManager
          project={selectedProject || null}
          documents={projectDocuments}
          costs={costs}
          onBack={() => setSelectedProjectId(null)}
          onAddDocument={addDocument}
          onDeleteDocument={deleteDocument}
        />
      </div>
    </div>
  );
};

export default Documents;