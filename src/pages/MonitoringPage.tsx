import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import PerformanceDashboard from '../pages/Monitoring/PerformanceDashboard';
import NetworkTrafficAnalysis from '../pages/Analysis/NetworkTrafficAnalysis';
import WirelessNetworkMonitor from '../pages/Monitoring/WirelessNetworkMonitor';
import ApplicationPerformanceMonitor from '../pages/Monitoring/ApplicationPerformanceMonitor';
import CloudResourcesMonitor from '../pages/Monitoring/CloudResourcesMonitor';
import LogManagement from '../pages/Monitoring/LogManagement';
import GrafanaView from '../pages/Monitoring/GrafanaView';

const MonitoringPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const monitoringTabs = [
    { id: 'performance', label: 'Performance', path: '/monitoring/performance' },
    { id: 'traffic', label: 'Traffic Analysis', path: '/monitoring/traffic' },
    { id: 'wireless', label: 'Wireless', path: '/monitoring/wireless' },
    { id: 'applications', label: 'Applications', path: '/monitoring/applications' },
    { id: 'cloud', label: 'Cloud Resources', path: '/monitoring/cloud' },
    { id: 'logs', label: 'Log Management', path: '/monitoring/logs' },
    { id: 'grafana', label: 'Grafana', path: '/monitoring/grafana' },
  ];

  const getCurrentTab = () => {
    const currentPath = location.pathname;
    return monitoringTabs.find(tab => currentPath === tab.path) || monitoringTabs[0];
  };

  const currentTab = getCurrentTab();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Monitoring & Analytics</h2>
        <p className="text-gray-400">
          Monitor network performance, analyze traffic, and manage system logs.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700">
        <div className="border-b border-gray-700">
          <nav className="flex space-x-8 px-6">
            {monitoringTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  currentTab.id === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<PerformanceDashboard device={undefined} onClose={() => {}} />} />
            <Route path="/performance" element={<PerformanceDashboard device={undefined} onClose={() => {}} />} />
            <Route path="/traffic" element={<NetworkTrafficAnalysis onClose={() => {}} />} />
            <Route path="/wireless" element={<WirelessNetworkMonitor onClose={() => {}} />} />
            <Route path="/applications" element={<ApplicationPerformanceMonitor onClose={() => {}} />} />
            <Route path="/cloud" element={<CloudResourcesMonitor onClose={() => {}} />} />
            <Route path="/logs" element={<LogManagement onClose={() => {}} />} />
            <Route path="/grafana" element={<GrafanaView onClose={() => {}} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPage;
