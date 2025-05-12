import React, { useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Plus, Search, Filter } from 'lucide-react';
import { format } from 'date-fns';

import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import { DataTable } from '../components/ui/Table';
import StatusBadge from '../components/ui/StatusBadge';
import { Card, CardContent } from '../components/ui/Card';
import { invoices, Invoice } from '../data/invoices';

const columnHelper = createColumnHelper<Invoice>();

const Invoices: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInvoices = invoices.filter(invoice => {
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    const matchesSearch = 
      invoice.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.project.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const columns = [
    columnHelper.accessor('number', {
      header: 'Invoice #',
      cell: info => <span className="font-medium">{info.getValue()}</span>,
    }),
    columnHelper.accessor('client', {
      header: 'Client',
    }),
    columnHelper.accessor('project', {
      header: 'Project',
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => <StatusBadge status={info.getValue()} />,
    }),
    columnHelper.accessor('dateIssued', {
      header: 'Date Issued',
      cell: info => format(new Date(info.getValue()), 'MMM d, yyyy'),
    }),
    columnHelper.accessor('dueDate', {
      header: 'Due Date',
      cell: info => format(new Date(info.getValue()), 'MMM d, yyyy'),
    }),
    columnHelper.accessor('amount', {
      header: 'Amount',
      cell: info => <span className="font-medium">${info.getValue().toLocaleString()}</span>,
    }),
  ];

  const handleRowClick = (invoice: Invoice) => {
    console.log('View invoice details:', invoice);
    // Would implement navigation to invoice details page
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        subtitle="Manage and track payments"
        actions={
          <Button 
            variant="primary" 
            iconLeft={<Plus size={16} />}
          >
            New Invoice
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
                placeholder="Search invoices..."
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
                variant={filterStatus === 'draft' ? 'primary' : 'outline'} 
                size="sm"
                onClick={() => setFilterStatus('draft')}
              >
                Draft
              </Button>
              <Button 
                variant={filterStatus === 'sent' ? 'primary' : 'outline'} 
                size="sm"
                onClick={() => setFilterStatus('sent')}
              >
                Sent
              </Button>
              <Button 
                variant={filterStatus === 'paid' ? 'primary' : 'outline'} 
                size="sm"
                onClick={() => setFilterStatus('paid')}
              >
                Paid
              </Button>
              <Button 
                variant={filterStatus === 'overdue' ? 'primary' : 'outline'} 
                size="sm"
                onClick={() => setFilterStatus('overdue')}
              >
                Overdue
              </Button>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredInvoices}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Invoices;