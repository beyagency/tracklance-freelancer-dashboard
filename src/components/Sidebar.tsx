import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  Users, 
  FileText, 
  Clock, 
  Target, 
  DollarSign, 
  BarChart, 
  Settings as SettingsIcon,
  X
} from 'lucide-react';
import { cn } from '../utils/cn';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Projects', path: '/projects', icon: <Briefcase size={20} /> },
    { name: 'Clients', path: '/clients', icon: <Users size={20} /> },
    { name: 'Invoices', path: '/invoices', icon: <FileText size={20} /> },
    { name: 'Time Tracker', path: '/time-tracker', icon: <Clock size={20} /> },
    { name: 'Goals', path: '/goals', icon: <Target size={20} /> },
    { name: 'Expenses', path: '/expenses', icon: <DollarSign size={20} /> },
    { name: 'Reports', path: '/reports', icon: <BarChart size={20} /> },
    { name: 'Settings', path: '/settings', icon: <SettingsIcon size={20} /> },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div 
          className="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-20 w-64 transform bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600">Tracklance</h1>
          <button
            className="p-1 text-gray-500 rounded-md lg:hidden hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-4 py-3 text-gray-700 rounded-md group transition-colors duration-200",
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-gray-100"
                )
              }
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setOpen(false);
                }
              }}
            >
              <span className="inline-flex items-center justify-center mr-3 text-gray-500 group-hover:text-blue-600">
                {item.icon}
              </span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;