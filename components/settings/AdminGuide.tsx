
import React, { useState } from 'react';
import { ChevronDownIcon, BookOpenIcon } from '../icons/Icons.tsx';

const AdminGuide: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const fullGuideContent = [
    {
        title: 'The Project Hub: Your Command Center',
        content: `
            <p>The Project Hub is your central command for all projects.</p>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>View Projects:</strong> All your projects are displayed as cards. You can quickly see their status, progress, and client details.</li>
                <li><strong>Filter:</strong> Use the filters at the top ('All', 'Active', 'Quoting', etc.) to narrow down the projects you see.</li>
                <li><strong>Create a New Project:</strong> Click the "+ New Project" button. Fill in the details like name, client, and quote amount. Progress starts at 0% and status is typically 'Quoting' or 'Active'.</li>
                <li><strong>Edit & Delete:</strong> Use the three-dots menu on any project card to edit its details or delete it. <strong>Warning:</strong> Deleting a project also deletes all its associated tasks and documents permanently.</li>
            </ul>
        `
    },
    {
        title: 'Task Board: Managing the Work',
        content: `
            <p>The Task Board organizes all work into specific projects and stages.</p>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Project Groups:</strong> Tasks are grouped by their parent project. Each project has its own set of 'To Do', 'In Progress', and 'Completed' columns.</li>
                <li><strong>Adding Tasks:</strong> Click "+ Add Task". You must assign it to a project and a staff member, and give it a due date.</li>
                <li><strong>Editing Tasks:</strong> Click on any task card to open the editor. You can update its status, assignee, description, and more.</li>
                <li><strong>Completed Projects:</strong> Finished projects are moved to a collapsible section at the bottom to keep your active workspace clean.</li>
            </ul>
        `
    },
    {
        title: 'Schedule: Visualizing Timelines',
        content: `
            <p>The Schedule page provides a calendar-based view of all tasks.</p>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Multiple Views:</strong> Switch between 'Month', 'Week', and 'Team' views to get different perspectives on the workload.</li>
                <li><strong>Month View:</strong> A high-level overview of the entire month's tasks.</li>
                <li><strong>Week View:</strong> A more detailed look at the current week.</li>
                <li><strong>Team View:</strong> See tasks organized by assigned staff member, which is great for resource planning and preventing overload.</li>
            </ul>
        `
    },
    {
        title: 'Staff: Your Team Roster',
        content: `
            <p>Manage all your staff members from this page.</p>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Add New Staff:</strong> Click "+ New Staff" to add a team member. You'll need their name, role, and contact info.</li>
                <li><strong>Assigning Tasks:</strong> Staff members added here will appear in the 'Assign To' dropdown when creating or editing tasks.</li>
                <li><strong>Edit/Delete:</strong> Click the three-dots menu on a staff card to update their details or remove them from the system.</li>
            </ul>
        `
    },
    {
        title: 'Documents: Centralized File Management',
        content: `
            <p>Keep all project-related files organized and accessible.</p>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Project-Specific:</strong> First, select a project from the list on the left. The file manager on the right will then show documents for that project only.</li>
                <li><strong>Upload:</strong> Click the "Upload" button to add files (e.g., blueprints, contracts, photos) to the selected project.</li>
                <li><strong>AI Invoice Processing:</strong> If you upload an image of an invoice or receipt, the system will attempt to automatically read it. You'll be asked to confirm the details before it's logged as a cost.</li>
            </ul>
        `
    },
    {
        title: 'Financials: Tracking Job Costs',
        content: `
            <p>This section provides a detailed financial breakdown of each project.</p>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Financial Overview:</strong> The top cards give a summary of total quoted amounts, costs, and profit across all active projects.</li>
                <li><strong>Project Breakdown:</strong> The main table shows key financial metrics for each project. Click on a project row to expand it and see a detailed list of all logged costs.</li>
                <li><strong>Adding Costs:</strong> Click "Add Cost" on a project's row to manually log a material or labor expense.</li>
                <li><strong>Linking Documents:</strong> When adding a cost, you can link it to a document you've already uploaded (e.g., linking a material cost to its receipt). This creates a clear paper trail.</li>
            </ul>
        `
    },
    {
        title: 'Client Portal: The Client\'s View',
        content: `
            <p>This page shows you exactly what your clients see when they log in.</p>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Simplified Interface:</strong> The client portal is a read-only view designed for clarity. Clients can see project progress, a simplified schedule of key milestones, and any documents or photos you've shared.</li>
                <li><strong>Transparency:</strong> It's a great tool for keeping clients informed without them needing to contact you for basic updates.</li>
            </ul>
        `
    }
];

  return (
    <div className="bg-white rounded-xl shadow-md border border-brand-gray/50">
      <div className="p-6 border-b border-brand-gray flex items-center space-x-3">
        <BookOpenIcon className="w-6 h-6 text-brand-teal"/>
        <h2 className="text-xl font-bold text-brand-charcoal">Admin Guide</h2>
      </div>
      <div className="divide-y divide-brand-gray">
        {fullGuideContent.map((item, index) => (
            <div key={item.title} className="border-b border-brand-gray last:border-b-0">
                <button
                    onClick={() => handleToggle(index)}
                    className="flex justify-between items-center w-full p-4 text-left font-semibold text-brand-charcoal hover:bg-brand-light-gray/50 transition-colors"
                >
                    <span>{item.title}</span>
                    <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                </button>
                <div className={`grid transition-all duration-300 ease-in-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                         <div className="p-4 pt-0 text-sm text-brand-text" dangerouslySetInnerHTML={{ __html: item.content }} />
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGuide;