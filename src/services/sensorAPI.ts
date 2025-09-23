// Sensor API Service
// This file handles communication with real watt sensors
// Replace mock functions with actual API calls when sensors are connected

import { DeviceDataManager } from '@/data/deviceData';

export interface SensorReading {
  sensorId: string;
  powerValue: number;
  timestamp: Date;
  voltage?: number;
  current?: number;
  frequency?: number;
  status: 'online' | 'offline' | 'error';
}

export interface SensorConfig {
  sensorId: string;
  deviceName: string;
  apiEndpoint?: string;
  pollInterval: number; // in milliseconds
  calibrationFactor?: number;
}

export class SensorAPIService {
  private static instance: SensorAPIService;
  private sensors: Map<string, SensorConfig> = new Map();
  private pollingIntervals: Map<string, NodeJS.Timeout> = new Map();

  private constructor() {}

  static getInstance(): SensorAPIService {
    if (!SensorAPIService.instance) {
      SensorAPIService.instance = new SensorAPIService();
    }
    return SensorAPIService.instance;
  }

  // Register a new sensor
  registerSensor(config: SensorConfig): void {
    this.sensors.set(config.sensorId, config);
    this.startPolling(config.sensorId);
  }

  // Unregister a sensor
  unregisterSensor(sensorId: string): void {
    this.stopPolling(sensorId);
    this.sensors.delete(sensorId);
  }

  // Start polling a specific sensor
  private startPolling(sensorId: string): void {
    const config = this.sensors.get(sensorId);
    if (!config) return;

    const interval = setInterval(async () => {
      try {
        const reading = await this.readSensor(sensorId);
        if (reading && reading.status === 'online') {
          // Update device data with new reading
          DeviceDataManager.updateDevicePower(sensorId, reading.powerValue);
        }
      } catch (error) {
        console.error(`Error reading sensor ${sensorId}:`, error);
      }
    }, config.pollInterval);

    this.pollingIntervals.set(sensorId, interval);
  }

  // Stop polling a specific sensor
  private stopPolling(sensorId: string): void {
    const interval = this.pollingIntervals.get(sensorId);
    if (interval) {
      clearInterval(interval);
      this.pollingIntervals.delete(sensorId);
    }
  }

  // Read data from a specific sensor
  private async readSensor(sensorId: string): Promise<SensorReading | null> {
    const config = this.sensors.get(sensorId);
    if (!config) return null;

    try {
      // MOCK IMPLEMENTATION - Replace with actual sensor API calls
      // Example for different sensor types:
      
      if (config.apiEndpoint) {
        // HTTP-based sensor (e.g., WiFi-enabled smart plugs)
        return await this.readHTTPSensor(config);
      } else {
        // Serial/USB sensor (e.g., Arduino-based sensors)
        return await this.readSerialSensor(config);
      }
    } catch (error) {
      console.error(`Failed to read sensor ${sensorId}:`, error);
      return {
        sensorId,
        powerValue: 0,
        timestamp: new Date(),
        status: 'error'
      };
    }
  }

  // Read HTTP-based sensor (WiFi smart plugs, etc.)
  private async readHTTPSensor(config: SensorConfig): Promise<SensorReading> {
    // MOCK - Replace with actual HTTP request
    /*
    const response = await fetch(`${config.apiEndpoint}/power`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add authentication headers if needed
      }
    });
    
    const data = await response.json();
    return {
      sensorId: config.sensorId,
      powerValue: data.power * (config.calibrationFactor || 1),
      voltage: data.voltage,
      current: data.current,
      frequency: data.frequency,
      timestamp: new Date(data.timestamp),
      status: data.status
    };
    */

    // MOCK DATA - Remove when implementing real sensors
    return {
      sensorId: config.sensorId,
      powerValue: Math.random() * 5 + 1, // Random power between 1-6 kW
      voltage: 220 + Math.random() * 20, // 220-240V
      current: Math.random() * 20 + 5,   // 5-25A
      frequency: 50,
      timestamp: new Date(),
      status: 'online'
    };
  }

  // Read Serial/USB sensor (Arduino, etc.)
  private async readSerialSensor(config: SensorConfig): Promise<SensorReading> {
    // MOCK - Replace with actual serial communication
    /*
    // Example using Web Serial API (Chrome only)
    if ('serial' in navigator) {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });
      
      const reader = port.readable.getReader();
      const { value } = await reader.read();
      
      // Parse sensor data from serial input
      const sensorData = JSON.parse(new TextDecoder().decode(value));
      
      return {
        sensorId: config.sensorId,
        powerValue: sensorData.power * (config.calibrationFactor || 1),
        timestamp: new Date(),
        status: 'online'
      };
    }
    */

    // MOCK DATA - Remove when implementing real sensors
    return {
      sensorId: config.sensorId,
      powerValue: Math.random() * 4 + 0.5, // Random power between 0.5-4.5 kW
      timestamp: new Date(),
      status: 'online'
    };
  }

  // Get all sensor readings at once
  async getAllSensorReadings(): Promise<SensorReading[]> {
    const readings: SensorReading[] = [];
    
    for (const [sensorId] of this.sensors) {
      const reading = await this.readSensor(sensorId);
      if (reading) {
        readings.push(reading);
      }
    }
    
    return readings;
  }

  // Initialize default sensors (call this on app startup)
  initializeDefaultSensors(): void {
    // Register sensors for existing devices
    const defaultSensors: SensorConfig[] = [
      {
        sensorId: 'SENSOR_001',
        deviceName: 'Oven',
        pollInterval: 2000, // 2 seconds
        calibrationFactor: 1.0
      },
      {
        sensorId: 'SENSOR_002',
        deviceName: 'PC',
        pollInterval: 1000, // 1 second
        calibrationFactor: 1.0
      },
      {
        sensorId: 'SENSOR_003',
        deviceName: 'Refrigerator',
        pollInterval: 5000, // 5 seconds
        calibrationFactor: 1.0
      },
      {
        sensorId: 'SENSOR_004',
        deviceName: 'TV',
        pollInterval: 3000, // 3 seconds
        calibrationFactor: 1.0
      }
    ];

    defaultSensors.forEach(config => {
      this.registerSensor(config);
    });
  }

  // Cleanup all sensors
  cleanup(): void {
    for (const [sensorId] of this.sensors) {
      this.stopPolling(sensorId);
    }
    this.sensors.clear();
    this.pollingIntervals.clear();
  }
}

// Export singleton instance
export const sensorAPI = SensorAPIService.getInstance();

// Utility functions for easy integration
export const initializeSensors = () => sensorAPI.initializeDefaultSensors();
export const cleanupSensors = () => sensorAPI.cleanup();
