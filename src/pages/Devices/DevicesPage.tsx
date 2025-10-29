import React, { useState } from 'react';
import type { Device } from '../../types';
import DeviceList from '../../components/tables/DeviceList';
import DeviceDetails from '../../components/modals/DeviceDetails';

const DevicesPage: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [showDeviceDetails, setShowDeviceDetails] = useState(false);

  const handleDeviceSelect = (device: Device) => {
    setSelectedDevice(device);
    setShowDeviceDetails(true);
  };

  const handleConfigureL2Services = (device: Device) => {
    // Navigate to L2 services configuration
    console.log('Configure L2 Services for:', device.hostname);
  };

  return (
    <>
      <DeviceList 
        onDeviceSelect={handleDeviceSelect} 
        onConfigureL2Services={handleConfigureL2Services} 
      />
      
      {showDeviceDetails && selectedDevice && (
        <DeviceDetails
          device={selectedDevice}
          onClose={() => {
            setShowDeviceDetails(false);
            setSelectedDevice(null);
          }}
        />
      )}
    </>
  );
};

export default DevicesPage;
