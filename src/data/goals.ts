export interface Goal {
  id: string;
  name: string;
  category: 'income' | 'projects' | 'clients';
  target: number;
  current: number;
  period: string;
  description?: string;
}

export const goals: Goal[] = [
  {
    id: 'goal-001',
    name: 'Monthly Income',
    category: 'income',
    target: 5000,
    current: 4250,
    period: 'May 2023',
    description: 'Reach $5,000 in monthly income by the end of May'
  },
  {
    id: 'goal-002',
    name: 'New Clients',
    category: 'clients',
    target: 3,
    current: 2,
    period: 'Q2 2023',
    description: 'Acquire 3 new clients in Q2'
  },
  {
    id: 'goal-003',
    name: 'Completed Projects',
    category: 'projects',
    target: 5,
    current: 4,
    period: 'Q2 2023',
    description: 'Complete 5 client projects by the end of Q2'
  },
  {
    id: 'goal-004',
    name: 'Annual Revenue',
    category: 'income',
    target: 60000,
    current: 21500,
    period: '2023',
    description: 'Reach $60,000 in total revenue for 2023'
  }
];