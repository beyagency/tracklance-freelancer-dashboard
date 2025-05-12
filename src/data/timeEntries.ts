export interface TimeEntry {
  id: string;
  date: string;
  projectId: string;
  project: string;
  client: string;
  hours: number;
  notes: string;
}

export const timeEntries: TimeEntry[] = [
  {
    id: 'time-001',
    date: '2023-05-12',
    projectId: 'proj-002',
    project: 'UX Audit for Peak Ventures',
    client: 'Peak Ventures',
    hours: 4.5,
    notes: 'Heuristic evaluation & report',
  },
  {
    id: 'time-002',
    date: '2023-05-13',
    projectId: 'proj-001',
    project: 'Rebranding for Flowly',
    client: 'Flowly Inc.',
    hours: 3,
    notes: 'Logo sketches, typography draft',
  },
  {
    id: 'time-003',
    date: '2023-05-14',
    projectId: 'proj-001',
    project: 'Rebranding for Flowly',
    client: 'Flowly Inc.',
    hours: 5,
    notes: 'Color palette exploration, logo refinement',
  },
  {
    id: 'time-004',
    date: '2023-05-15',
    projectId: 'proj-003',
    project: 'Landing Page for Launch',
    client: 'Orbit Studio',
    hours: 6.5,
    notes: 'Wireframing and initial designs',
  },
  {
    id: 'time-005',
    date: '2023-05-16',
    projectId: 'proj-001',
    project: 'Rebranding for Flowly',
    client: 'Flowly Inc.',
    hours: 4,
    notes: 'Brand guidelines first draft',
  },
  {
    id: 'time-006',
    date: '2023-05-17',
    projectId: 'proj-003',
    project: 'Landing Page for Launch',
    client: 'Orbit Studio',
    hours: 4,
    notes: 'Responsive design implementation',
  },
];

export const getWeeklySummary = () => {
  const totalHours = timeEntries.reduce((sum, entry) => sum + entry.hours, 0);
  
  const hoursByProject = timeEntries.reduce((acc: Record<string, number>, entry) => {
    acc[entry.project] = (acc[entry.project] || 0) + entry.hours;
    return acc;
  }, {});

  const mostTimeProject = Object.entries(hoursByProject)
    .sort((a, b) => b[1] - a[1])[0];

  return {
    totalHours,
    mostTimeProject: {
      name: mostTimeProject[0],
      hours: mostTimeProject[1]
    }
  };
};