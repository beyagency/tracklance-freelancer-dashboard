import React from 'react';
import { DollarSign, Briefcase, FileText, TrendingUp } from 'lucide-react';
import MetricCard from '../ui/MetricCard';

const DashboardMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard
        title="Monthly Earnings"
        value="$4,250"
        icon={<DollarSign size={20} />}
        trend={{ value: '12%', positive: true }}
      />
      <MetricCard
        title="Active Projects"
        value="3"
        icon={<Briefcase size={20} />}
      />
      <MetricCard
        title="Pending Invoices"
        value="$1,300"
        icon={<FileText size={20} />}
        trend={{ value: '5%', positive: false }}
      />
      <MetricCard
        title="YTD Revenue"
        value="$21,500"
        icon={<TrendingUp size={20} />}
        trend={{ value: '23%', positive: true }}
      />
    </div>
  );
};

export default DashboardMetrics;