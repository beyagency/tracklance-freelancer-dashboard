import React, { useState } from 'react';
import { Plus, Target } from 'lucide-react';

import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';
import { goals } from '../data/goals';

const GoalCard: React.FC<{ goal: typeof goals[0]; color: 'blue' | 'green' | 'orange' | 'purple' }> = ({ 
  goal, 
  color 
}) => {
  const percentage = Math.round((goal.current / goal.target) * 100);
  
  return (
    <Card className="h-full transition-transform duration-200 hover:shadow-md">
      <CardHeader>
        <CardTitle>{goal.name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="mb-2">
          <div className="flex justify-between items-baseline mb-1">
            <div className="text-sm text-gray-500">{goal.period}</div>
            <div className="text-sm font-medium">{percentage}%</div>
          </div>
          <ProgressBar 
            value={goal.current} 
            max={goal.target} 
            showValue={false} 
            color={color}
          />
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="font-medium text-gray-900">{goal.category === 'income' ? `$${goal.current.toLocaleString()}` : goal.current}</div>
          <div className="text-sm text-gray-500">Target: {goal.category === 'income' ? `$${goal.target.toLocaleString()}` : goal.target}</div>
        </div>
        
        {goal.description && (
          <p className="mt-3 text-sm text-gray-600">{goal.description}</p>
        )}
      </CardContent>
    </Card>
  );
};

const Goals: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Goals"
        subtitle="Track your business targets and progress"
        actions={
          <Button 
            variant="primary" 
            iconLeft={<Plus size={16} />}
          >
            Add Goal
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GoalCard goal={goals[0]} color="blue" />
        <GoalCard goal={goals[1]} color="green" />
        <GoalCard goal={goals[2]} color="purple" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Annual Revenue</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-1">
              <div className="text-sm text-gray-500">2023</div>
              <div className="text-sm font-medium">36%</div>
            </div>
            <ProgressBar 
              value={21500} 
              max={60000} 
              showValue={false} 
              color="blue"
              size="lg"
            />
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-2xl font-bold text-gray-900">$21,500</div>
            <div className="text-sm text-gray-500">Target: $60,000</div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-none">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Target size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                You're $750 away from your MacBook Pro upgrade! 💻
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Keep up the great work! You're making steady progress towards your goals.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Goals;