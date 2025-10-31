import React, { useState } from "react";
import DiscoveryWizard from "../../components/modals/DiscoveryWizard";
import NetBoxImporter from "../../components/modals/NetBoxImporter";
import type { DiscoveryScan } from "../../types";

const DiscoveryPage: React.FC = () => {
  const [showDiscoveryWizard, setShowDiscoveryWizard] = useState(false);
  const [showNetBoxImporter, setShowNetBoxImporter] = useState(false);

  const handleDiscoveryComplete = (scan: DiscoveryScan) => {
    setShowDiscoveryWizard(false);
  };

  const handleNetBoxImportComplete = (scan: DiscoveryScan) => {
    setShowNetBoxImporter(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-5">
        <h2 className="text-2xl font-bold text-white mb-4">
          Network Discovery
        </h2>
        <p className="text-gray-400 mb-5">
          Discover and import network devices and topology information.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setShowDiscoveryWizard(true)}
            className="p-5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-left transition-colors"
          >
            <h3 className="text-lg font-semibold mb-2">New Discovery Scan</h3>
            <p className="text-blue-100">
              Start a new network discovery scan to find devices and
              connections.
            </p>
          </button>

          <button
            onClick={() => setShowNetBoxImporter(true)}
            className="p-5 bg-green-600 hover:bg-green-700 rounded-lg text-white text-left transition-colors"
          >
            <h3 className="text-lg font-semibold mb-2">Import from NetBox</h3>
            <p className="text-green-100">
              Import existing network topology from NetBox or Slurpit.
            </p>
          </button>
        </div>
      </div>

      {/* Modals */}
      {showDiscoveryWizard && (
        <DiscoveryWizard
          onComplete={handleDiscoveryComplete}
          onCancel={() => setShowDiscoveryWizard(false)}
        />
      )}

      {showNetBoxImporter && (
        <NetBoxImporter
          onComplete={handleNetBoxImportComplete}
          onCancel={() => setShowNetBoxImporter(false)}
        />
      )}
    </div>
  );
};

export default DiscoveryPage;
