import React from 'react';
import { cn } from '../../utils/cn';

type StatusType = 
  | 'in-progress' 
  | 'completed' 
  | 'awaiting-feedback' 
  | 'billed'
  | 'paid'
  | 'sent'
  | 'overdue'
  | 'draft';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  'in-progress': {
    label: 'In Progress',
    className: 'bg-blue-50 text-blue-700',
  },
  'completed': {
    label: 'Completed',
    className: 'bg-green-50 text-green-700',
  },
  'awaiting-feedback': {
    label: 'Awaiting Feedback',
    className: 'bg-purple-50 text-purple-700',
  },
  'billed': {
    label: 'Billed',
    className: 'bg-gray-50 text-gray-700',
  },
  'paid': {
    label: 'Paid',
    className: 'bg-green-50 text-green-700',
  },
  'sent': {
    label: 'Sent',
    className: 'bg-blue-50 text-blue-700',
  },
  'overdue': {
    label: 'Overdue',
    className: 'bg-red-50 text-red-700',
  },
  'draft': {
    label: 'Draft',
    className: 'bg-gray-50 text-gray-700',
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const { label, className: badgeClass } = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        badgeClass,
        className
      )}
    >
      {label}
    </span>
  );
};

export default StatusBadge;