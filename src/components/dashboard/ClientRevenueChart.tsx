import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          let label = context.label || '';
          if (label) {
            label += ': ';
          }
          label += context.parsed + '%';
          return label;
        }
      }
    }
  },
};

const data = {
  labels: ['Flowly Inc.', 'Peak Ventures', 'Orbit Studio', 'TechLabs', 'Other'],
  datasets: [
    {
      data: [35, 20, 15, 15, 15],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(156, 163, 175, 0.8)',
      ],
      borderColor: [
        'rgba(59, 130, 246, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(249, 115, 22, 1)',
        'rgba(139, 92, 246, 1)',
        'rgba(156, 163, 175, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const ClientRevenueChart: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Revenue by Client</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 flex items-center justify-center">
          <Pie data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientRevenueChart;