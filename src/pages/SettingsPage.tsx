import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import CredentialsManager from '../pages/Settings/CredentialsManager';
import GrafanaConfig from '../pages/Settings/GrafanaConfig';
import L2ServicesConfig from '../pages/Settings/L2ServicesConfig';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const settingsTabs = [
    { id: 'credentials', label: 'Credentials', path: '/settings/credentials' },
    { id: 'grafana', label: 'Grafana', path: '/settings/grafana' },
    { id: 'l2-services', label: 'L2 Services', path: '/settings/l2-services' },
  ];

  const getCurrentTab = () => {
    const currentPath = location.pathname;
    return settingsTabs.find(tab => currentPath === tab.path) || settingsTabs[0];
  };

  const currentTab = getCurrentTab();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Settings</h2>
        <p className="text-gray-400">
          Configure system settings, credentials, and integrations.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700">
        <div className="border-b border-gray-700">
          <nav className="flex space-x-8 px-6">
            {settingsTabs.map((tab) => (
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
            <Route path="/" element={<CredentialsManager onClose={() => {}} />} />
            <Route path="/credentials" element={<CredentialsManager onClose={() => {}} />} />
            <Route path="/grafana" element={<GrafanaConfig onClose={() => {}} />} />
            <Route path="/l2-services" element={<L2ServicesConfig onClose={() => {}} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
