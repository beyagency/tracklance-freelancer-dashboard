export interface Client {
  id: string;
  name: string;
  email: string;
  country: string;
  currency: string;
  totalPaid: number;
  activeProjects: number;
  avatarUrl: string;
  notes?: string;
}

export const clients: Client[] = [
  {
    id: 'client-001',
    name: 'Emma Dawson',
    email: 'emma@flowly.co',
    country: 'Canada',
    currency: 'USD',
    totalPaid: 3700,
    activeProjects: 1,
    avatarUrl: 'https://source.unsplash.com/100x100/?face/1',
    notes: 'Great communicator. Pays upfront.',
  },
  {
    id: 'client-002',
    name: 'Jason Kim',
    email: 'jason@peakventures.io',
    country: 'United States',
    currency: 'USD',
    totalPaid: 1200,
    activeProjects: 0,
    avatarUrl: 'https://source.unsplash.com/100x100/?face/2',
    notes: 'Prefers weekly updates via email.',
  },
  {
    id: 'client-003',
    name: 'Sarah Miller',
    email: 'sarah@orbitstudio.design',
    country: 'United Kingdom',
    currency: 'GBP',
    totalPaid: 900,
    activeProjects: 1,
    avatarUrl: 'https://source.unsplash.com/100x100/?face/3',
    notes: 'Detailed feedback. Clear project requirements.',
  },
  {
    id: 'client-004',
    name: 'Michael Chen',
    email: 'michael@techlabs.dev',
    country: 'Singapore',
    currency: 'USD',
    totalPaid: 3500,
    activeProjects: 0,
    avatarUrl: 'https://source.unsplash.com/100x100/?face/4',
    notes: 'Long-term client relationship. Quick to respond.',
  },
  {
    id: 'client-005',
    name: 'Olivia Rodriguez',
    email: 'olivia@designerly.co',
    country: 'Spain',
    currency: 'EUR',
    totalPaid: 2800,
    activeProjects: 1,
    avatarUrl: 'https://source.unsplash.com/100x100/?face/5',
    notes: 'Prefers video calls over email. Very collaborative.',
  },
];