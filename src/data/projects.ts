export interface Project {
  id: string;
  name: string;
  client: string;
  clientId: string;
  status: 'in-progress' | 'completed' | 'awaiting-feedback' | 'billed';
  startDate: string;
  deadline: string;
  budget: number;
  description: string;
  timeTracked: number; // in hours
}

export const projects: Project[] = [
  {
    id: 'proj-001',
    name: 'Rebranding for Flowly',
    client: 'Flowly Inc.',
    clientId: 'client-001',
    status: 'in-progress',
    startDate: '2023-04-10',
    deadline: '2023-05-20',
    budget: 2500,
    description: 'Complete brand refresh including logo redesign, typography system, and brand guidelines document.',
    timeTracked: 24.5,
  },
  {
    id: 'proj-002',
    name: 'UX Audit for Peak Ventures',
    client: 'Peak Ventures',
    clientId: 'client-002',
    status: 'completed',
    startDate: '2023-03-01',
    deadline: '2023-04-01',
    budget: 1200,
    description: 'Comprehensive UX audit of mobile application with detailed improvement recommendations.',
    timeTracked: 32,
  },
  {
    id: 'proj-003',
    name: 'Landing Page for Launch',
    client: 'Orbit Studio',
    clientId: 'client-003',
    status: 'awaiting-feedback',
    startDate: '2023-04-25',
    deadline: '2023-05-15',
    budget: 900,
    description: 'Design and development of a high-converting product launch landing page.',
    timeTracked: 18.5,
  },
  {
    id: 'proj-004',
    name: 'Website Redesign',
    client: 'TechLabs',
    clientId: 'client-004',
    status: 'billed',
    startDate: '2023-02-15',
    deadline: '2023-04-15',
    budget: 3500,
    description: 'Complete website redesign with a focus on improved UX and conversion optimization.',
    timeTracked: 65,
  },
  {
    id: 'proj-005',
    name: 'Social Media Campaign',
    client: 'Flowly Inc.',
    clientId: 'client-001',
    status: 'completed',
    startDate: '2023-03-10',
    deadline: '2023-04-10',
    budget: 1800,
    description: 'Creation of social media assets and campaign strategy for product launch.',
    timeTracked: 28,
  },
];