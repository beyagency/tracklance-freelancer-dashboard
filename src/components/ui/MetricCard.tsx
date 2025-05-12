import React from 'react';
import { Card } from './Card';
import { cn } from '../../utils/cn';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, trend, className }) => {
  return (
    <Card className={cn("h-full transition-transform duration-200 hover:shadow-md", className)}>
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="p-2 rounded-full bg-blue-50 text-blue-600">
            {icon}
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        
        {trend && (
          <div className="mt-auto pt-3">
            <span className={cn(
              "text-xs font-medium",
              trend.positive ? "text-green-600" : "text-red-600"
            )}>
              {trend.positive ? '↑' : '↓'} {trend.value}
            </span>
            <span className="text-xs text-gray-500 ml-1">vs last month</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MetricCard;