import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./routes";
import Layout from "../components/layout/Layout";
import Login from "../pages/Auth/Login";

// Main Pages
import Dashboard from "../pages/Dashboard/Dashboard";
import DevicesPage from "../pages/Devices/DevicesPage";
// import DeviceDetailsPage from "../pages/Devices/DeviceDetailsPage";
import DiscoveryPage from "../pages/Discovery/DiscoveryPage";
import TopologyPage from "../pages/TopologyPage";

// Individual Components for Direct Access
import DeviceDetails from "../components/modals/DeviceDetails";
import DiscoveryWizard from "../components/modals/DiscoveryWizard";
import NetBoxImporter from "../components/modals/NetBoxImporter";
import TopologyScansView from "../pages/Network/TopologyScansView";

// Monitoring Components
import PerformanceDashboard from "../pages/Monitoring/PerformanceDashboard";
import NetworkTrafficAnalysis from "../pages/Analysis/NetworkTrafficAnalysis";
import WirelessNetworkMonitor from "../pages/Monitoring/WirelessNetworkMonitor";
import ApplicationPerformanceMonitor from "../pages/Monitoring/ApplicationPerformanceMonitor";
import CloudResourcesMonitor from "../pages/Monitoring/CloudResourcesMonitor";
import LogManagement from "../pages/Monitoring/LogManagement";
import GrafanaView from "../pages/Monitoring/GrafanaView";

// Management Components
import ConfigurationManager from "../pages/Settings/ConfigurationManager";
import BackupManagement from "../pages/Management/BackupManagement";
import FirmwareManagement from "../pages/Management/FirmwareManagement";
import AlertManagement from "../pages/Management/AlertManagement";
import UserList from "../pages/Management/UserList";
import UserRole from "../pages/Management/UserRole";
import UserProfile from "../pages/Management/UserProfile";

// Settings Components
import CredentialsManager from "../pages/Settings/CredentialsManager";
import GrafanaConfig from "../pages/Settings/GrafanaConfig";
import L2ServicesConfig from "../pages/Settings/L2ServicesConfig";

// Organization Components
import Regions from "../pages/Organization/Regions";
import Sites from "../pages/Organization/Sites";
import Locations from "../pages/Organization/Locations";
import ManufacturersPage from "../pages/Organization/Manufacturers";
import RacksPage from "../pages/Organization/RacksPage";
import DeviceRolesPage from "../pages/Organization/DeviceRolesPage";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />

        {/* App routes */}
        <Route path="/" element={<Layout />}>
          {/* Main Routes */}
          <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="devices" element={<DevicesPage />} />
          {/* <Route path="devices/:id" element={<DeviceDetailsPage />} /> */}
          <Route path="discovery" element={<DiscoveryPage />} />
          <Route path="topology" element={<TopologyPage />} />

          {/* Direct Component Access Routes (for modals/overlays) */}
          <Route
            path="device/:id"
            element={<DeviceDetails device={{} as any} onClose={() => {}} />}
          />
          <Route
            path="discovery/wizard"
            element={
              <DiscoveryWizard onComplete={() => {}} onCancel={() => {}} />
            }
          />
          <Route
            path="discovery/netbox"
            element={
              <NetBoxImporter onComplete={() => {}} onCancel={() => {}} />
            }
          />
          <Route
            path="topology/view"
            element={
              <TopologyScansView
                onDeviceSelect={() => {}}
                onSiteSelect={() => {}}
                scans={[]}
              />
            }
          />

          {/* Monitoring Direct Routes */}
          <Route
            path="monitoring/performance/:deviceId?"
            element={
              <PerformanceDashboard device={undefined} onClose={() => {}} />
            }
          />
          <Route
            path="monitoring/traffic"
            element={<NetworkTrafficAnalysis onClose={() => {}} />}
          />
          <Route
            path="monitoring/wireless"
            element={<WirelessNetworkMonitor onClose={() => {}} />}
          />
          <Route
            path="monitoring/applications"
            element={<ApplicationPerformanceMonitor onClose={() => {}} />}
          />
          <Route
            path="monitoring/cloud"
            element={<CloudResourcesMonitor onClose={() => {}} />}
          />
          <Route
            path="monitoring/logs"
            element={<LogManagement onClose={() => {}} />}
          />
          <Route
            path="monitoring/grafana"
            element={<GrafanaView onClose={() => {}} />}
          />

          {/* Management Direct Routes */}
          <Route
            path="management/configuration/:deviceId?"
            element={
              <ConfigurationManager
                onClose={() => {}}
                selectedDevice={undefined}
              />
            }
          />
          <Route
            path="management/backups"
            element={<BackupManagement onClose={() => {}} />}
          />
          <Route
            path="management/firmware"
            element={<FirmwareManagement onClose={() => {}} />}
          />
          <Route
            path="management/alerts"
            element={<AlertManagement onClose={() => {}} />}
          />
          <Route
            path="management/users"
            element={<UserList onClose={() => {}} />}
          />
          <Route
            path="management/roles"
            element={<UserRole onClose={() => {}} />}
          />
          <Route
            path="management/profile"
            element={<UserProfile onClose={() => {}} />}
          />

          {/* Settings Direct Routes */}
          <Route
            path="settings/credentials"
            element={<CredentialsManager onClose={() => {}} />}
          />
          <Route
            path="settings/grafana"
            element={<GrafanaConfig onClose={() => {}} />}
          />
          <Route
            path="settings/l2-services"
            element={<L2ServicesConfig onClose={() => {}} />}
          />

          {/* Organization Direct Routes */}
          <Route path="organization/regions" element={<Regions />} />
          <Route path="organization/sites" element={<Sites />} />
          <Route path="organization/locations" element={<Locations />} />
          <Route
            path="organization/manufacturers"
            element={<ManufacturersPage />}
          />
          <Route path="organization/racks" element={<RacksPage />} />
          <Route
            path="organization/device-roles"
            element={<DeviceRolesPage />}
          />

          {/* Catch all route */}
          <Route
            path="*"
            element={<Navigate to={ROUTES.DASHBOARD} replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
