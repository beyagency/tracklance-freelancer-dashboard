import React, { useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Plus, Search } from 'lucide-react';
import { format } from 'date-fns';

import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import { DataTable } from '../components/ui/Table';
import StatusBadge from '../components/ui/StatusBadge';
import { Card, CardContent } from '../components/ui/Card';
import { projects, Project } from '../data/projects';

const columnHelper = createColumnHelper<Project>();

const Projects: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(project => {
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const columns = [
    columnHelper.accessor('name', {
      header: 'Project Name',
      cell: info => <span className="font-medium text-blue-600">{info.getValue()}</span>,
    }),
    columnHelper.accessor('client', {
      header: 'Client',
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => <StatusBadge status={info.getValue()} />,
    }),
    columnHelper.accessor('startDate', {
      header: 'Start Date',
      cell: info => format(new Date(info.getValue()), 'MMM d, yyyy'),
    }),
    columnHelper.accessor('deadline', {
      header: 'Deadline',
      cell: info => format(new Date(info.getValue()), 'MMM d, yyyy'),
    }),
    columnHelper.accessor('budget', {
      header: 'Budget',
      cell: info => `$${info.getValue().toLocaleString()}`,
    }),
  ];

  const handleRowClick = (project: Project) => {
    console.log('View project details:', project);
    // Would implement navigation to project details view
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        subtitle="Manage all your client projects"
        actions={
          <Button 
            variant="primary" 
            iconLeft={<Plus size={16} />}
          >
            New Project
          </Button>
        }
      />

      <Card>
        <CardContent className="p-6">
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={filterStatus === 'all' ? 'primary' : 'outline'} 
                size="sm"
                onClick={() => setFilterStatus('all')}
              >
                All
              </Button>
              <Button 
                variant={filterStatus === 'in-progress' ? 'primary' : 'outline'} 
                size="sm"
                onClick={() => setFilterStatus('in-progress')}
              >
                In Progress
              </Button>
              <Button 
                variant={filterStatus === 'completed' ? 'primary' : 'outline'} 
                size="sm"
                onClick={() => setFilterStatus('completed')}
              >
                Completed
              </Button>
              <Button 
                variant={filterStatus === 'awaiting-feedback' ? 'primary' : 'outline'} 
                size="sm"
                onClick={() => setFilterStatus('awaiting-feedback')}
              >
                Awaiting Feedback
              </Button>
              <Button 
                variant={filterStatus === 'billed' ? 'primary' : 'outline'} 
                size="sm"
                onClick={() => setFilterStatus('billed')}
              >
                Billed
              </Button>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredProjects}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Projects;