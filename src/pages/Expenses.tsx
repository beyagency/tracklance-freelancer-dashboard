import React, { useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Plus, Search, Filter, PieChart } from 'lucide-react';
import { format } from 'date-fns';

import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import { DataTable } from '../components/ui/Table';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { expenses, getExpenseStats, Expense } from '../data/expenses';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const columnHelper = createColumnHelper<Expense>();

const categoryColors: Record<string, { bg: string, text: string }> = {
  software: { bg: 'bg-blue-100', text: 'text-blue-800' },
  equipment: { bg: 'bg-green-100', text: 'text-green-800' },
  services: { bg: 'bg-purple-100', text: 'text-purple-800' },
  office: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  travel: { bg: 'bg-orange-100', text: 'text-orange-800' },
  other: { bg: 'bg-gray-100', text: 'text-gray-800' },
};

const Expenses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const { totalExpenses, expensesByCategory } = getExpenseStats();
  const categories = Object.keys(categoryColors);

  const filteredExpenses = expenses.filter(expense => {
    const matchesCategory = filterCategory === 'all' || expense.category === filterCategory;
    const matchesSearch = 
      expense.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.notes?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    return matchesCategory && matchesSearch;
  });

  const columns = [
    columnHelper.accessor('date', {
      header: 'Date',
      cell: info => format(new Date(info.getValue()), 'MMM d, yyyy'),
    }),
    columnHelper.accessor('item', {
      header: 'Item',
      cell: info => <span className="font-medium text-gray-900">{info.getValue()}</span>,
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: info => {
        const category = info.getValue();
        const { bg, text } = categoryColors[category];
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
        );
      },
    }),
    columnHelper.accessor('cost', {
      header: 'Cost',
      cell: info => <span className="font-medium">${info.getValue().toFixed(2)}</span>,
    }),
    columnHelper.accessor('notes', {
      header: 'Notes',
      cell: info => info.getValue() || '-',
    }),
  ];

  // Prepare chart data
  const chartData = {
    labels: Object.keys(expensesByCategory).map(category => 
      category.charAt(0).toUpperCase() + category.slice(1)
    ),
    datasets: [
      {
        data: Object.values(expensesByCategory),
        backgroundColor: [
          'rgba(59, 130, 246, 0.6)',  // blue
          'rgba(16, 185, 129, 0.6)',  // green
          'rgba(139, 92, 246, 0.6)',  // purple
          'rgba(234, 179, 8, 0.6)',   // yellow
          'rgba(249, 115, 22, 0.6)',  // orange
          'rgba(156, 163, 175, 0.6)', // gray
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(234, 179, 8, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(156, 163, 175, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expenses"
        subtitle="Track your business costs"
        actions={
          <Button 
            variant="primary" 
            iconLeft={<Plus size={16} />}
          >
            Add Expense
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Expenses List</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search expenses..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="relative">
                  <select
                    className="appearance-none w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Filter size={18} className="text-gray-400" />
                  </div>
                </div>
              </div>

              <DataTable
                columns={columns}
                data={filteredExpenses}
              />
            </CardContent>
            <CardFooter className="bg-gray-50 border-t">
              <div className="flex items-center justify-between w-full">
                <span className="text-sm text-gray-500">Monthly Total</span>
                <span className="text-lg font-bold">${totalExpenses.toFixed(2)}</span>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Expenses by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <Pie
                  data={chartData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            const label = context.label || '';
                            const value = context.raw as number;
                            const percentage = ((value / totalExpenses) * 100).toFixed(1);
                            return `${label}: $${value.toFixed(2)} (${percentage}%)`;
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Expenses;