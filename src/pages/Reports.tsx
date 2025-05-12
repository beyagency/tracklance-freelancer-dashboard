import React from 'react';
import { FileDown, Download, TrendingUp, BarChart, Users, DollarSign } from 'lucide-react';

import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { clients } from '../data/clients';
import { projects } from '../data/projects';
import { invoices } from '../data/invoices';
import { expenses } from '../data/expenses';

interface ReportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  buttonIcon: React.ReactNode;
}

const ReportCard: React.FC<ReportCardProps> = ({
  title,
  description,
  icon,
  buttonText,
  buttonIcon
}) => {
  return (
    <Card className="h-full transition-transform duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-blue-50 text-blue-600">
            {icon}
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <Button 
          variant="outline" 
          iconLeft={buttonIcon}
          size="sm"
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

const Reports: React.FC = () => {
  // Calculate top clients by revenue
  const topClients = [...clients]
    .sort((a, b) => b.totalPaid - a.totalPaid)
    .slice(0, 3);
  
  // Calculate most profitable projects
  const profitableProjects = [...projects]
    .sort((a, b) => b.budget - a.budget)
    .slice(0, 3);

  // Calculate total income
  const totalIncome = invoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  
  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.cost, 0);
  
  // Calculate net income
  const netIncome = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        subtitle="Insights and export options for your business data"
        actions={
          <Button 
            variant="primary" 
            iconLeft={<FileDown size={16} />}
          >
            Export All Data
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ReportCard
          title="Income & Expenses"
          description="Download a complete record of all your income and expenses for accounting and tax purposes."
          icon={<DollarSign size={20} />}
          buttonText="Export CSV"
          buttonIcon={<Download size={16} />}
        />
        
        <ReportCard
          title="Project Profitability"
          description="Analyze which projects generated the most profit based on budget vs. time invested."
          icon={<BarChart size={20} />}
          buttonText="Generate Report"
          buttonIcon={<FileDown size={16} />}
        />
        
        <ReportCard
          title="Client Analysis"
          description="Review client activity, payment history, and project satisfaction metrics."
          icon={<Users size={20} />}
          buttonText="View Analysis"
          buttonIcon={<TrendingUp size={16} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Clients by Revenue</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {topClients.map((client) => (
                <div key={client.id} className="flex items-center p-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                    <img
                      src={client.avatarUrl}
                      alt={`${client.name} avatar`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{client.name}</h3>
                    <p className="text-sm text-gray-500">{client.country}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">${client.totalPaid.toLocaleString()}</div>
                    <p className="text-sm text-gray-500">{client.activeProjects} active projects</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Most Profitable Projects</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {profitableProjects.map((project) => (
                <div key={project.id} className="flex items-center p-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.client}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">${project.budget.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">
                      {project.status === 'completed' ? 'Completed' : 'In progress'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Net Income</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-blue-700 mb-1">Total Income</h3>
              <div className="text-2xl font-bold text-gray-900">${totalIncome.toLocaleString()}</div>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="text-sm font-medium text-red-700 mb-1">Total Expenses</h3>
              <div className="text-2xl font-bold text-gray-900">${totalExpenses.toLocaleString()}</div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="text-sm font-medium text-green-700 mb-1">Net Income</h3>
              <div className="text-2xl font-bold text-gray-900">${netIncome.toLocaleString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;