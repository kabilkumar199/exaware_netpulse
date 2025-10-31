import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { Device, Interface } from "../../types";
import type { RootState } from "../../store/store";
import { ArrowLeft } from "lucide-react";

const DeviceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Get device from Redux store
  const devices = useSelector((state: RootState) => state.devices.devices);
  const loading = useSelector((state: RootState) => state.devices.loading);
  
  // Find device by ID
  const device = devices.find((d) => d.id === id);
  
  // If device not found in Redux, try mock data as fallback
  const [fallbackDevice, setFallbackDevice] = useState<Device | null>(null);
  
  useEffect(() => {
    if (!device && id) {
      // Import and use mock data as fallback
      import("../../data/mockData").then(({ mockDevices }) => {
        const found = mockDevices.find((d) => d.id === id);
        if (found) {
          setFallbackDevice(found);
        }
      });
    }
  }, [device, id]);
  
  const currentDevice = device || fallbackDevice;
  const [activeTab, setActiveTab] = useState<
    "overview" | "peripherals" | "interface" | "vpls" | "lldp"
  >("overview");

  // Handle device not found
  if (!loading && !currentDevice && id) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-2">Device Not Found</h2>
          <p className="text-gray-400 mb-4">Device with ID "{id}" could not be found.</p>
          <button
            onClick={() => navigate("/devices")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Devices
          </button>
        </div>
      </div>
    );
  }

  // Handle loading state
  if (loading || !currentDevice) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading device details...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "up":
        return "bg-green-900 text-green-300";
      case "down":
        return "bg-red-900 text-red-300";
      case "warning":
        return "bg-yellow-900 text-yellow-300";
      case "unknown":
        return "bg-gray-700 text-gray-300";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "up":
        return "🟢";
      case "down":
        return "🔴";
      case "warning":
        return "🟡";
      case "unknown":
        return "⚪";
      default:
        return "⚪";
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "peripherals", label: "Peripherals", icon: "🧩" },
    { id: "interface", label: "Interface", icon: "🔌" },
    { id: "vpls", label: "VPLS", icon: "🛰️" },
    { id: "lldp", label: "LLDP", icon: "🧭" },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Information */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="font-medium text-white mb-3">Information</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-400">Hostname:</span><span className="text-white">{currentDevice.hostname}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">FQDN:</span><span className="text-white">{currentDevice.fqdn || "N/A"}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Vendor:</span><span className="text-white">{currentDevice.vendor}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Model:</span><span className="text-white">{currentDevice.model}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">OS:</span><span className="text-white">{currentDevice.os}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Location:</span><span className="text-white">{currentDevice.location?.name || "Unknown"}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Last Seen:</span><span className="text-white">{formatDate(currentDevice.lastSeen)}</span></div>
            <div>
              <span className="text-gray-400">IP Addresses:</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {(currentDevice.ipAddresses || []).map((ip: string, index: number) => (
                  <span key={index} className="text-white font-mono text-xs bg-gray-800 px-2 py-1 rounded">{ip}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="font-medium text-white mb-3">Resources</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded p-3">
              <div className="text-xs text-gray-400 mb-1">Status</div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{getStatusIcon(currentDevice.status)}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(currentDevice.status)}`}>{currentDevice.status.toUpperCase()}</span>
              </div>
            </div>
            <div className="bg-gray-800 rounded p-3">
              <div className="text-xs text-gray-400 mb-1">Interfaces</div>
              <div className="text-lg text-white font-semibold">{(currentDevice.interfaces || []).length}</div>
            </div>
            <div className="bg-gray-800 rounded p-3">
              <div className="text-xs text-gray-400 mb-1">Monitors</div>
              <div className="text-lg text-white font-semibold">{(currentDevice.monitors || []).length}</div>
            </div>
            <div className="bg-gray-800 rounded p-3">
              <div className="text-xs text-gray-400 mb-1">Labels</div>
              <div className="text-lg text-white font-semibold">{(currentDevice.labels || []).length}</div>
            </div>
          </div>
          {(currentDevice.tags || []).length > 0 && (
            <div className="mt-4">
              <div className="text-xs text-gray-400 mb-2">Tags</div>
              <div className="flex flex-wrap gap-2">
                {(currentDevice.tags || []).map((tag: string, i: number) => (
                  <span key={i} className="px-2 py-1 bg-gray-600 text-gray-200 text-xs rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderInterface = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-white">
          Interfaces ({(currentDevice.interfaces || []).length})
        </h4>
        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Refresh
        </button>
      </div>

      <div className="space-y-3">
        {(currentDevice.interfaces || []).map((iface: Interface) => (
          <div key={iface.id} className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-white">{iface.name}</span>
                <span className="text-sm text-gray-400">#{iface.ifIndex}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    iface.operStatus === "up"
                      ? "bg-green-900 text-green-300"
                      : iface.operStatus === "down"
                      ? "bg-red-900 text-red-300"
                      : "bg-gray-600 text-gray-300"
                  }`}
                >
                  {iface.operStatus.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Description:</span>
                <div className="text-white">{iface.description || "N/A"}</div>
              </div>
              <div>
                <span className="text-gray-400">Speed:</span>
                <div className="text-white">
                  {iface.speed
                    ? `${(iface.speed / 1000000).toFixed(0)} Mbps`
                    : "N/A"}
                </div>
              </div>
              <div>
                <span className="text-gray-400">Duplex:</span>
                <div className="text-white">{iface.duplex || "N/A"}</div>
              </div>
              <div>
                <span className="text-gray-400">MAC:</span>
                <div className="text-white font-mono text-xs">
                  {iface.macAddress || "N/A"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPeripherals = () => (
    <div className="space-y-4">
      <div className="text-gray-400 text-sm">No peripherals data available.</div>
    </div>
  );

 

  const renderVPLS = () => (
    <div className="space-y-4">
      <div className="text-gray-400 text-sm">No VPLS configuration found.</div>
    </div>
  );

  const renderLLDP = () => (
    <div className="space-y-4">
      <div className="text-gray-400 text-sm">No LLDP neighbors discovered.</div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "peripherals":
        return renderPeripherals();
      case "interface":
        return renderInterface();
      case "vpls":
        return renderVPLS();
      case "lldp":
        return renderLLDP();
      default:
        return renderOverview();
    }
  };

  return (
    <>
       {/* Header */}
      <div className="px-6 py-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/devices")}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              aria-label="Back to devices"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-lg bg-gray-600 flex items-center justify-center">
              <span className="text-2xl">
                {currentDevice.vendor === "Cisco"
                  ? "🔷"
                  : currentDevice.vendor === "Dell"
                  ? "💻"
                  : currentDevice.vendor === "Fortinet"
                  ? "🛡️"
                  : "🖥️"}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                {currentDevice.hostname}
              </h2>
              <p className="text-sm text-gray-400">
                {currentDevice.vendor} {currentDevice.model} •{" "}
                {currentDevice.location?.name || "Unknown Location"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-4 border-b border-gray-700">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {/* <span>{tab.icon}</span> */}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6  overflow-y-auto">
        {renderTabContent()}
      </div>
    </>
  );
};

export default DeviceDetails;
