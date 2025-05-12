export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  client: string;
  projectId: string;
  project: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dateIssued: string;
  dueDate: string;
  amount: number;
  lineItems?: {
    description: string;
    quantity: number;
    rate: number;
  }[];
}

export const invoices: Invoice[] = [
  {
    id: 'inv-001',
    number: 'A233',
    clientId: 'client-001',
    client: 'Flowly Inc.',
    projectId: 'proj-001',
    project: 'Rebranding',
    status: 'paid',
    dateIssued: '2023-05-01',
    dueDate: '2023-05-10',
    amount: 2500,
    lineItems: [
      {
        description: 'Logo Design',
        quantity: 1,
        rate: 800
      },
      {
        description: 'Brand Guidelines',
        quantity: 1,
        rate: 1200
      },
      {
        description: 'Stationery Design',
        quantity: 1,
        rate: 500
      }
    ]
  },
  {
    id: 'inv-002',
    number: 'A234',
    clientId: 'client-003',
    client: 'Orbit Studio',
    projectId: 'proj-003',
    project: 'Landing Page',
    status: 'sent',
    dateIssued: '2023-05-07',
    dueDate: '2023-05-17',
    amount: 900,
    lineItems: [
      {
        description: 'UI Design',
        quantity: 1,
        rate: 600
      },
      {
        description: 'Frontend Development',
        quantity: 3,
        rate: 100
      }
    ]
  },
  {
    id: 'inv-003',
    number: 'A235',
    clientId: 'client-002',
    client: 'Peak Ventures',
    projectId: 'proj-002',
    project: 'UX Audit',
    status: 'paid',
    dateIssued: '2023-04-02',
    dueDate: '2023-04-12',
    amount: 1200,
    lineItems: [
      {
        description: 'UX Analysis',
        quantity: 1,
        rate: 800
      },
      {
        description: 'Usability Report',
        quantity: 1,
        rate: 400
      }
    ]
  },
  {
    id: 'inv-004',
    number: 'A236',
    clientId: 'client-005',
    client: 'Designerly',
    projectId: 'proj-004',
    project: 'Website Redesign',
    status: 'overdue',
    dateIssued: '2023-04-15',
    dueDate: '2023-04-25',
    amount: 1800,
    lineItems: [
      {
        description: 'Website Audit',
        quantity: 1,
        rate: 400
      },
      {
        description: 'UI Design (5 pages)',
        quantity: 5,
        rate: 280
      }
    ]
  },
  {
    id: 'inv-005',
    number: 'A237',
    clientId: 'client-004',
    client: 'TechLabs',
    projectId: 'proj-004',
    project: 'Website Redesign',
    status: 'draft',
    dateIssued: '2023-05-15',
    dueDate: '2023-05-25',
    amount: 1700,
    lineItems: [
      {
        description: 'Responsive Design Implementation',
        quantity: 1,
        rate: 900
      },
      {
        description: 'CMS Integration',
        quantity: 1,
        rate: 800
      }
    ]
  }
];