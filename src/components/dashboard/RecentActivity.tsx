import React from 'react';
import { 
  FileText, 
  Briefcase, 
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';

interface ActivityItem {
  id: string;
  type: 'invoice' | 'project' | 'time';
  message: string;
  time: string;
}

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'invoice',
    message: 'Invoice #A233 paid by acme.co',
    time: '2 hours ago',
  },
  {
    id: '2',
    type: 'project',
    message: 'New project started: Rebranding for Flowly',
    time: '1 day ago',
  },
  {
    id: '3',
    type: 'time',
    message: 'Time log added to project: UX Audit for Peak Ventures',
    time: '2 days ago',
  },
  {
    id: '4',
    type: 'invoice',
    message: 'Invoice #A232 sent to Orbit Studio',
    time: '3 days ago',
  },
  {
    id: '5',
    type: 'project',
    message: 'Project completed: Website redesign for TechLabs',
    time: '5 days ago',
  },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'invoice':
      return <FileText size={18} className="text-blue-500" />;
    case 'project':
      return <Briefcase size={18} className="text-green-500" />;
    case 'time':
      return <Clock size={18} className="text-orange-500" />;
    default:
      return <CheckCircle size={18} className="text-gray-500" />;
  }
};

const RecentActivity: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Activity</CardTitle>
        <Button variant="ghost" size="sm" iconRight={<ArrowRight size={16} />}>
          View all
        </Button>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start px-6">
              <div className="flex-shrink-0 mr-4">
                <div className="p-2 rounded-full bg-gray-50">
                  {getActivityIcon(activity.type)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.message}
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;