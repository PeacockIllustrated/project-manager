

import React, { useMemo, useState } from 'react';
import { useData } from '../../hooks/useData';
import { Project, ProjectStatus, CostItem, Document } from '../../types';
import { DollarSignIcon, TrendingUpIcon, AlertTriangleIcon, PlusIcon, ChevronDownIcon, FileTextIcon, EditIcon, TrashIcon } from '../icons/Icons.tsx';
import KPICard from '../financials/KPICard';
import CostModal from '../financials/LaborCostModal';
import Badge from '../ui/Badge';

interface ProjectFinancials extends Project {
    materialCosts: number;
    laborCosts: number;
    totalCost: number;
    profit: number;
    margin: number;
}

const ProjectCostDetails: React.FC<{ 
    costs: CostItem[]; 
    documents: Document[]; 
    onEdit: (cost: CostItem) => void; 
    onDelete: (costId: string) => void;
}> = ({ costs, documents, onEdit, onDelete }) => {

    const formatCurrency = (amount: number) => amount.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
    const getDocument = (docId: string) => documents.find(d => d.id === docId);

    if (costs.length === 0) {
        return <div className="p-6 text-center text-brand-text bg-brand-light-gray/50">No costs have been logged for this project yet.</div>;
    }

    return (
        <div className="bg-brand-light-gray/50 p-2 sm:p-4 animate-accordion-down">
            <div className="overflow-x-auto">
                <table className="min-w-full text-left bg-white rounded-lg shadow-inner">
                    <thead className="border-b border-brand-gray">
                        <tr>
                            <th scope="col" className="px-4 py-2 text-xs font-semibold text-brand-charcoal">Date</th>
                            <th scope="col" className="px-4 py-2 text-xs font-semibold text-brand-charcoal">Description</th>
                            <th scope="col" className="px-4 py-2 text-xs font-semibold text-brand-charcoal">Type</th>
                            <th scope="col" className="px-4 py-2 text-xs font-semibold text-brand-charcoal">Linked Document</th>
                            <th scope="col" className="px-4 py-2 text-xs font-semibold text-brand-charcoal text-right">Amount</th>
                            <th scope="col" className="relative px-4 py-2"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-gray">
                        {costs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(cost => {
                            const linkedDoc = cost.documentId ? getDocument(cost.documentId) : null;
                            return (
                                <tr key={cost.id}>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-brand-text">{new Date(cost.date).toLocaleDateString(undefined, { timeZone: 'UTC' })}</td>
                                    <td className="px-4 py-3 text-sm text-brand-charcoal font-medium truncate max-w-xs">{cost.description}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                                        <Badge text={cost.type} color={cost.type === 'material' ? 'blue' : 'yellow'} />
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                                        {linkedDoc ? (
                                            <a href={linkedDoc.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-brand-teal hover:underline">
                                                <FileTextIcon className="w-4 h-4 mr-1.5" />
                                                <span className="truncate max-w-xs">{linkedDoc.name}</span>
                                            </a>
                                        ) : <span className="text-brand-text">-</span>}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-brand-text text-right font-semibold">{formatCurrency(cost.amount)}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center space-x-2">
                                        <button onClick={() => onEdit(cost)} className="text-brand-text hover:text-brand-charcoal p-1 rounded-full hover:bg-brand-gray"><EditIcon className="w-4 h-4" /></button>
                                        <button onClick={() => onDelete(cost.id)} className="text-brand-text hover:text-red-600 p-1 rounded-full hover:bg-red-50"><TrashIcon className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


const Financials: React.FC = () => {
  const { projects, costs, documents, addCost, updateCost, deleteCost } = useData();
  const [isCostModalOpen, setIsCostModalOpen] = useState(false);
  const [costModalProject, setCostModalProject] = useState<Project | null>(null);
  const [editingCost, setEditingCost] = useState<CostItem | null>(null);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const formatCurrency = (amount?: number) => {
    if (typeof amount !== 'number') return '£0.00';
    return amount.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
  };

  const activeProjects = useMemo(() => 
    projects.filter(p => p.status !== ProjectStatus.Completed), 
    [projects]
  );
  
  const projectFinancials = useMemo((): ProjectFinancials[] => {
    return projects.map(project => {
        const projectCosts = costs.filter(c => c.projectId === project.id);
        const materialCosts = projectCosts.filter(c => c.type === 'material').reduce((acc, c) => acc + c.amount, 0);
        const laborCosts = projectCosts.filter(c => c.type === 'labor').reduce((acc, c) => acc + c.amount, 0);
        const totalCost = materialCosts + laborCosts;
        const quote = project.quoteAmount || 0;
        const profit = quote - totalCost;
        const margin = quote > 0 ? (profit / quote) * 100 : 0;

        return {
            ...project,
            materialCosts,
            laborCosts,
            totalCost,
            profit,
            margin,
        }
    })
  }, [projects, costs]);

  const financialSummary = useMemo(() => {
    const activeProjectIds = new Set(activeProjects.map(p => p.id));
    const activeFinancials = projectFinancials.filter(pf => activeProjectIds.has(pf.id));

    const summary = activeFinancials.reduce((acc, pf) => {
        acc.totalQuoted += pf.quoteAmount || 0;
        acc.totalCost += pf.totalCost;
        if (pf.totalCost > (pf.quoteAmount || 0) && (pf.quoteAmount || 0) > 0) {
            acc.projectsOverBudget += 1;
        }
        return acc;
    }, { totalQuoted: 0, totalCost: 0, projectsOverBudget: 0 });

    const totalProfit = summary.totalQuoted - summary.totalCost;
    const profitability = summary.totalQuoted > 0 ? (totalProfit / summary.totalQuoted) * 100 : 0;

    return { ...summary, profitability, totalProfit };
  }, [activeProjects, projectFinancials]);

  const handleOpenCostModal = (project: Project) => {
    setCostModalProject(project);
    setEditingCost(null);
    setIsCostModalOpen(true);
  };
  
  const handleEditCost = (cost: CostItem) => {
    const project = projects.find(p => p.id === cost.projectId);
    if(project){
        setCostModalProject(project);
        setEditingCost(cost);
        setIsCostModalOpen(true);
    }
  };
  
  const handleDeleteCost = async (costId: string) => {
    const costToDelete = costs.find(c => c.id === costId);
    if (costToDelete?.isSample) {
        alert("Sample costs are read-only and cannot be deleted.");
        return;
    }

    if (!window.confirm("Are you sure you want to delete this cost item?")) return;
    try {
        deleteCost(costId);
    } catch(error) {
        console.error("Error deleting cost item: ", error);
        alert("There was an error deleting the cost item.");
    }
  };

  const handleSaveCost = async (costData: Omit<CostItem, 'projectId' | 'id'> & { id?: string }) => {
    if (costData.id) { // Editing
        const originalCost = costs.find(c => c.id === costData.id);
        if (originalCost?.isSample) {
            alert("Sample costs are read-only and cannot be edited.");
            setIsCostModalOpen(false);
            setCostModalProject(null);
            setEditingCost(null);
            return;
        }
    }
    
    try {
        if (costData.id) {
            updateCost(costData as CostItem);
        } else if (costModalProject) {
            addCost({
                ...costData,
                projectId: costModalProject.id,
            });
        } else {
             throw new Error("Cannot save cost without a project context.");
        }
    } catch(error) {
        console.error("Error saving cost: ", error);
        alert("There was an error saving the cost item.");
    } finally {
        setIsCostModalOpen(false);
        setCostModalProject(null);
        setEditingCost(null);
    }
  };
  
  const handleToggleExpand = (projectId: string) => {
    setExpandedProjectId(prevId => prevId === projectId ? null : projectId);
  };

  return (
    <>
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-charcoal">Financial Overview</h1>
        <p className="text-brand-text mt-1">Summary of all active projects.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Quoted" value={formatCurrency(financialSummary.totalQuoted)} icon={<DollarSignIcon />} colorClass="bg-blue-500" />
        <KPICard title="Total Job Cost" value={formatCurrency(financialSummary.totalCost)} icon={<DollarSignIcon />} colorClass="bg-yellow-500" />
        <KPICard title="Overall Profit" value={formatCurrency(financialSummary.totalProfit)} icon={<TrendingUpIcon />} colorClass={financialSummary.profitability >= 0 ? "bg-green-500" : "bg-red-500"} />
        <KPICard title="Projects Over Budget" value={String(financialSummary.projectsOverBudget)} icon={<AlertTriangleIcon />} colorClass={financialSummary.projectsOverBudget > 0 ? "bg-red-500" : "bg-brand-teal"} />
      </div>

      <div className="bg-white rounded-xl shadow-md border border-brand-gray/50 overflow-hidden">
        <div className="p-4 border-b border-brand-gray flex justify-between items-center">
          <h2 className="text-xl font-bold text-brand-charcoal">Project Financial Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-brand-light-gray/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-sm font-semibold text-brand-charcoal">Project</th>
                <th scope="col" className="px-6 py-3 text-sm font-semibold text-brand-charcoal">Quote Amount</th>
                <th scope="col" className="px-6 py-3 text-sm font-semibold text-brand-charcoal">Material Costs</th>
                <th scope="col" className="px-6 py-3 text-sm font-semibold text-brand-charcoal">Labor Costs</th>
                <th scope="col" className="px-6 py-3 text-sm font-semibold text-brand-charcoal">Total Job Cost</th>
                <th scope="col" className="px-6 py-3 text-sm font-semibold text-brand-charcoal">Profit / Loss</th>
                <th scope="col" className="px-6 py-3 text-sm font-semibold text-brand-charcoal">Margin</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-brand-gray">
              {projectFinancials.map(pf => (
                  <React.Fragment key={pf.id}>
                    <tr className="hover:bg-brand-light-gray/50 transition-colors cursor-pointer" onClick={() => handleToggleExpand(pf.id)}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-brand-charcoal">
                        <div className="flex items-center">
                          <ChevronDownIcon className={`w-5 h-5 mr-2 transition-transform duration-200 ${expandedProjectId === pf.id ? 'rotate-180' : ''}`} />
                          {pf.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text">{formatCurrency(pf.quoteAmount)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text">{formatCurrency(pf.materialCosts)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text">{formatCurrency(pf.laborCosts)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-brand-charcoal">{formatCurrency(pf.totalCost)}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${pf.profit < 0 ? 'text-red-600' : 'text-green-600'}`}>{formatCurrency(pf.profit)}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${pf.margin < 0 ? 'text-red-600' : 'text-green-600'}`}>{pf.margin.toFixed(1)}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <button onClick={(e) => { e.stopPropagation(); handleOpenCostModal(pf); }} className="text-brand-teal hover:text-brand-charcoal font-semibold flex items-center">
                          <PlusIcon className="w-4 h-4 mr-1"/> Add Cost
                        </button>
                      </td>
                    </tr>
                    {expandedProjectId === pf.id && (
                        <tr>
                            <td colSpan={8}>
                                <ProjectCostDetails 
                                    costs={costs.filter(c => c.projectId === pf.id)}
                                    documents={documents}
                                    onEdit={handleEditCost}
                                    onDelete={handleDeleteCost}
                                />
                            </td>
                        </tr>
                    )}
                  </React.Fragment>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {isCostModalOpen && costModalProject && (
        <CostModal 
            isOpen={isCostModalOpen}
            onClose={() => setIsCostModalOpen(false)}
            onSave={handleSaveCost}
            project={costModalProject}
            costToEdit={editingCost}
        />
    )}
    </>
  );
};

export default Financials;