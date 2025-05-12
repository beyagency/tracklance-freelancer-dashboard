export interface Expense {
  id: string;
  date: string;
  item: string;
  category: 'software' | 'equipment' | 'services' | 'office' | 'travel' | 'other';
  cost: number;
  notes?: string;
}

export const expenses: Expense[] = [
  {
    id: 'exp-001',
    date: '2023-05-02',
    item: 'Figma Pro',
    category: 'software',
    cost: 12,
    notes: 'Monthly design tool'
  },
  {
    id: 'exp-002',
    date: '2023-04-25',
    item: 'Logitech MX Keys',
    category: 'equipment',
    cost: 100,
    notes: 'New keyboard'
  },
  {
    id: 'exp-003',
    date: '2023-05-05',
    item: 'Adobe Creative Cloud',
    category: 'software',
    cost: 52.99,
    notes: 'Monthly subscription'
  },
  {
    id: 'exp-004',
    date: '2023-04-30',
    item: 'Office Rent',
    category: 'office',
    cost: 350,
    notes: 'Coworking space monthly fee'
  },
  {
    id: 'exp-005',
    date: '2023-05-10',
    item: 'Domain Renewal',
    category: 'services',
    cost: 14,
    notes: 'Annual domain renewal for personal website'
  },
  {
    id: 'exp-006',
    date: '2023-05-12',
    item: 'Web Hosting',
    category: 'services',
    cost: 29,
    notes: 'Monthly hosting fee'
  },
  {
    id: 'exp-007',
    date: '2023-04-28',
    item: 'Client Meeting',
    category: 'travel',
    cost: 45,
    notes: 'Taxi and coffee for client meeting'
  }
];

export const getExpenseStats = () => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.cost, 0);
  
  const expensesByCategory = expenses.reduce((acc: Record<string, number>, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.cost;
    return acc;
  }, {});

  return {
    totalExpenses,
    expensesByCategory
  };
};