import React from 'react';
import { cn } from '../../utils/cn';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  actions,
  className 
}) => {
  return (
    <div className={cn("mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between", className)}>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="mt-4 sm:mt-0 flex-shrink-0 flex space-x-3">
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;