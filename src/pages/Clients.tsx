import React, { useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Plus, Search, Filter } from 'lucide-react';

import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import { DataTable } from '../components/ui/Table';
import { Card, CardContent } from '../components/ui/Card';
import { clients, Client } from '../data/clients';

const columnHelper = createColumnHelper<Client>();

const Clients: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCountry, setFilterCountry] = useState<string>('all');

  const countries = Array.from(new Set(clients.map(client => client.country)));

  const filteredClients = clients.filter(client => {
    const matchesCountry = filterCountry === 'all' || client.country === filterCountry;
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          client.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  const columns = [
    columnHelper.accessor(row => row, {
      id: 'avatar',
      header: '',
      cell: info => (
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={info.getValue().avatarUrl}
            alt={`${info.getValue().name} avatar`}
            className="w-full h-full object-cover"
          />
        </div>
      ),
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: info => <span className="font-medium text-blue-600">{info.getValue()}</span>,
    }),
    columnHelper.accessor('email', {
      header: 'Email',
    }),
    columnHelper.accessor('country', {
      header: 'Country',
    }),
    columnHelper.accessor('currency', {
      header: 'Currency',
    }),
    columnHelper.accessor('totalPaid', {
      header: 'Total Paid',
      cell: info => `$${info.getValue().toLocaleString()}`,
    }),
    columnHelper.accessor('activeProjects', {
      header: 'Active Projects',
      cell: info => (
        <span className={info.getValue() > 0 ? "text-green-600 font-medium" : "text-gray-600"}>
          {info.getValue()}
        </span>
      ),
    }),
  ];

  const handleRowClick = (client: Client) => {
    console.log('View client details:', client);
    // Would implement navigation to client details page
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clients"
        subtitle="Manage your client relationships"
        actions={
          <Button 
            variant="primary" 
            iconLeft={<Plus size={16} />}
          >
            Add Client
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
                placeholder="Search clients..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <select
                className="appearance-none w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
              >
                <option value="all">All Countries</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredClients}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Clients;