// Device Data Management System
// This file serves as the central data source for all device information
// Designed to be easily integrated with real-time sensor data

export interface Device {
  id: number;
  name: string;
  color: string;
  percentage: number;
  power: string;
  powerValue: number; // Numeric value for calculations
  isOnline: boolean;
  lastUpdated: Date;
  sensorId?: string; // For future sensor integration
  location?: string;
  deviceType: 'appliance' | 'electronics' | 'hvac' | 'lighting';
}

// Device color mapping for consistent UI
export const deviceColors: { [key: string]: string } = {
  'Oven': '#10b981',           // Emerald
  'PC': '#3b82f6',             // Blue  
  'Refrigerator': '#9333ea',   // Purple
  'TV': '#ffffff',             // White
  'Washing Machine': '#8b5cf6', // Violet
  'Air Conditioner': '#06b6d4', // Cyan
  'Microwave': '#84cc16',      // Lime
  'Dishwasher': '#f97316',     // Orange
  'Water Heater': '#ec4899',   // Pink
  'Gaming Console': '#6366f1', // Indigo
};

// Current device database - easily replaceable with API calls
export const deviceDatabase: Device[] = [
  {
    id: 1,
    name: 'Oven',
    color: deviceColors['Oven'],
    percentage: 35,
    power: '4.2 kW',
    powerValue: 4.2,
    isOnline: true,
    lastUpdated: new Date(),
    sensorId: 'SENSOR_001',
    location: 'Kitchen',
    deviceType: 'appliance'
  },
  {
    id: 2,
    name: 'PC',
    color: deviceColors['PC'],
    percentage: 20,
    power: '2.4 kW',
    powerValue: 2.4,
    isOnline: true,
    lastUpdated: new Date(),
    sensorId: 'SENSOR_002',
    location: 'Office',
    deviceType: 'electronics'
  },
  {
    id: 3,
    name: 'Refrigerator',
    color: deviceColors['Refrigerator'],
    percentage: 30,
    power: '3.6 kW',
    powerValue: 3.6,
    isOnline: true,
    lastUpdated: new Date(),
    sensorId: 'SENSOR_003',
    location: 'Kitchen',
    deviceType: 'appliance'
  },
  {
    id: 4,
    name: 'TV',
    color: deviceColors['TV'],
    percentage: 15,
    power: '1.8 kW',
    powerValue: 1.8,
    isOnline: true,
    lastUpdated: new Date(),
    sensorId: 'SENSOR_004',
    location: 'Living Room',
    deviceType: 'electronics'
  },
];

// Utility functions for data management
export class DeviceDataManager {
  private static devices: Device[] = [...deviceDatabase];

  // Get all devices
  static getAllDevices(): Device[] {
    return this.devices;
  }

  // Get top N devices by power consumption
  static getTopDevicesByPower(count: number = 4): Device[] {
    return this.devices
      .filter(device => device.isOnline)
      .sort((a, b) => b.powerValue - a.powerValue)
      .slice(0, count);
  }

  // Update device power reading (for sensor integration)
  static updateDevicePower(sensorId: string, powerValue: number): boolean {
    const deviceIndex = this.devices.findIndex(device => device.sensorId === sensorId);
    if (deviceIndex !== -1) {
      this.devices[deviceIndex].powerValue = powerValue;
      this.devices[deviceIndex].power = `${powerValue.toFixed(1)} kW`;
      this.devices[deviceIndex].lastUpdated = new Date();
      
      // Recalculate percentage based on total consumption
      this.recalculatePercentages();
      return true;
    }
    return false;
  }

  // Calculate total power consumption
  static getTotalPowerConsumption(): number {
    return this.devices
      .filter(device => device.isOnline)
      .reduce((total, device) => total + device.powerValue, 0);
  }

  // Recalculate percentages based on current power values
  private static recalculatePercentages(): void {
    const totalPower = this.getTotalPowerConsumption();
    this.devices.forEach(device => {
      if (device.isOnline && totalPower > 0) {
        device.percentage = Math.round((device.powerValue / totalPower) * 100);
      }
    });
  }

  // Add new device (for expansion)
  static addDevice(device: Omit<Device, 'id' | 'lastUpdated'>): Device {
    const newDevice: Device = {
      ...device,
      id: Math.max(...this.devices.map(d => d.id)) + 1,
      lastUpdated: new Date(),
    };
    this.devices.push(newDevice);
    this.recalculatePercentages();
    return newDevice;
  }

  // Remove device
  static removeDevice(deviceId: number): boolean {
    const initialLength = this.devices.length;
    this.devices = this.devices.filter(device => device.id !== deviceId);
    if (this.devices.length < initialLength) {
      this.recalculatePercentages();
      return true;
    }
    return false;
  }

  // Toggle device online status
  static toggleDeviceStatus(deviceId: number): boolean {
    const device = this.devices.find(d => d.id === deviceId);
    if (device) {
      device.isOnline = !device.isOnline;
      device.lastUpdated = new Date();
      this.recalculatePercentages();
      return true;
    }
    return false;
  }

  // Get devices by type
  static getDevicesByType(type: Device['deviceType']): Device[] {
    return this.devices.filter(device => device.deviceType === type && device.isOnline);
  }

  // Get devices by location
  static getDevicesByLocation(location: string): Device[] {
    return this.devices.filter(device => device.location === location && device.isOnline);
  }

  // Simulate real-time data updates (for testing)
  static simulateRealTimeUpdates(): void {
    this.devices.forEach(device => {
      if (device.isOnline) {
        // Simulate power fluctuation (±10%)
        const fluctuation = (Math.random() - 0.5) * 0.2; // ±10%
        const basePower = parseFloat(device.power.replace(' kW', ''));
        const newPower = Math.max(0.1, basePower * (1 + fluctuation));
        
        device.powerValue = Math.round(newPower * 10) / 10; // Round to 1 decimal
        device.power = `${device.powerValue} kW`;
        device.lastUpdated = new Date();
      }
    });
    this.recalculatePercentages();
  }
}

// Export current device data for immediate use
export const getCurrentDeviceData = () => DeviceDataManager.getTopDevicesByPower(4);
export const getTotalDeviceCount = () => DeviceDataManager.getAllDevices().length;
export const getTotalPowerUsage = () => DeviceDataManager.getTotalPowerConsumption();
