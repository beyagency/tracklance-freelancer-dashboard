import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import { Plus } from 'lucide-react';
import DashboardMetrics from '../components/dashboard/DashboardMetrics';
import RevenueChart from '../components/dashboard/RevenueChart';
import ClientRevenueChart from '../components/dashboard/ClientRevenueChart';
import RecentActivity from '../components/dashboard/RecentActivity';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your freelance business"
        actions={
          <Button 
            variant="primary" 
            iconLeft={<Plus size={16} />}
          >
            New Project
          </Button>
        }
      />
      
      <DashboardMetrics />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <ClientRevenueChart />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;