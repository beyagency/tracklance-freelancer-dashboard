import React, { useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Plus, Play, Pause, Search } from 'lucide-react';
import { format } from 'date-fns';

import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import { DataTable } from '../components/ui/Table';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { timeEntries, getWeeklySummary, TimeEntry } from '../data/timeEntries';
import { projects } from '../data/projects';

const columnHelper = createColumnHelper<TimeEntry>();

const TimeTracker: React.FC = () => {
  const [timerActive, setTimerActive] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [notes, setNotes] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const weeklySummary = getWeeklySummary();

  const filteredTimeEntries = timeEntries.filter(entry => {
    return entry.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
           entry.notes.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const columns = [
    columnHelper.accessor('date', {
      header: 'Date',
      cell: info => format(new Date(info.getValue()), 'MMM d, yyyy'),
    }),
    columnHelper.accessor('project', {
      header: 'Project',
      cell: info => <span className="font-medium text-blue-600">{info.getValue()}</span>,
    }),
    columnHelper.accessor('client', {
      header: 'Client',
    }),
    columnHelper.accessor('hours', {
      header: 'Time Spent (hrs)',
      cell: info => <span className="font-medium">{info.getValue().toFixed(1)}</span>,
    }),
    columnHelper.accessor('notes', {
      header: 'Notes',
      cell: info => (
        <div className="max-w-xs truncate">
          {info.getValue()}
        </div>
      ),
    }),
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Time Tracker"
        subtitle="Log your work hours for each project"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Timer Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Timer</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                >
                  <option value="">Select a project</option>
                  {projects.filter(p => p.status === 'in-progress').map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name} ({project.client})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="What are you working on?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="text-2xl font-mono font-bold">
                  00:00:00
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    variant={timerActive ? 'outline' : 'primary'}
                    iconLeft={timerActive ? <Pause size={18} /> : <Play size={18} />}
                    onClick={() => setTimerActive(!timerActive)}
                    disabled={!selectedProject}
                  >
                    {timerActive ? 'Pause' : 'Start'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    disabled={!timerActive}
                  >
                    Stop & Save
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Hours</h3>
                <p className="text-2xl font-bold">{weeklySummary.totalHours.toFixed(1)}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Most time spent on</h3>
                <p className="text-lg font-medium text-blue-600">
                  {weeklySummary.mostTimeProject.name}
                </p>
                <p className="text-sm text-gray-700">
                  {weeklySummary.mostTimeProject.hours.toFixed(1)} hrs
                </p>
              </div>
              
              <div className="pt-2">
                <Button variant="outline" size="sm" fullWidth>
                  View Full Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Entries Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Time Entries</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            iconLeft={<Plus size={16} />}
          >
            Add Manual Entry
          </Button>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search time entries..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredTimeEntries}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeTracker;