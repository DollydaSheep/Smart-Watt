# Smart Watt Data Management System

This directory contains the centralized data management system for Smart Watt, designed to be easily integrated with real-time sensor data.

## 📁 File Structure

```
src/
├── data/
│   ├── deviceData.ts      # Central device database and management
│   └── README.md          # This file
├── services/
│   └── sensorAPI.ts       # Sensor integration service
└── components/            # UI components (use data from above)
```

## 🔧 Core Components

### 1. Device Data Management (`deviceData.ts`)

**Purpose**: Central database for all device information with real-time update capabilities.

**Key Features**:
- ✅ Type-safe device interface
- ✅ Consistent color mapping
- ✅ Real-time data updates
- ✅ Power consumption calculations
- ✅ Device management (add/remove/toggle)
- ✅ Filtering by type and location

**Usage**:
```typescript
import { DeviceDataManager, getCurrentDeviceData } from '@/data/deviceData';

// Get current top devices
const topDevices = getCurrentDeviceData();

// Update device power (for sensor integration)
DeviceDataManager.updateDevicePower('SENSOR_001', 4.5);

// Get total power consumption
const totalPower = DeviceDataManager.getTotalPowerConsumption();
```

### 2. Sensor API Service (`sensorAPI.ts`)

**Purpose**: Handle communication with real watt sensors and update device data.

**Supported Sensor Types**:
- 🌐 **HTTP-based sensors** (WiFi smart plugs, IoT devices)
- 🔌 **Serial/USB sensors** (Arduino, custom hardware)
- 📡 **Real-time polling** with configurable intervals

**Usage**:
```typescript
import { sensorAPI, initializeSensors } from '@/services/sensorAPI';

// Initialize all sensors on app startup
initializeSensors();

// Register a new sensor
sensorAPI.registerSensor({
  sensorId: 'SENSOR_005',
  deviceName: 'Washing Machine',
  apiEndpoint: 'http://192.168.1.100:8080', // For WiFi sensors
  pollInterval: 2000,
  calibrationFactor: 1.2
});
```

## 🚀 Integration with Real Sensors

### Step 1: Replace Mock Data

1. **Remove simulation**: Comment out `DeviceDataManager.simulateRealTimeUpdates()` in `page.tsx`
2. **Initialize sensors**: Call `initializeSensors()` in your app startup

### Step 2: Configure Sensor Endpoints

For **WiFi-based sensors** (smart plugs, IoT devices):
```typescript
const sensorConfig = {
  sensorId: 'SENSOR_001',
  deviceName: 'Oven',
  apiEndpoint: 'http://192.168.1.100:8080/api/power',
  pollInterval: 2000,
  calibrationFactor: 1.0
};
```

For **Serial/USB sensors** (Arduino, custom hardware):
```typescript
const sensorConfig = {
  sensorId: 'SENSOR_002',
  deviceName: 'PC',
  pollInterval: 1000,
  calibrationFactor: 1.0
  // No apiEndpoint = uses serial communication
};
```

### Step 3: Implement Real API Calls

Replace mock functions in `sensorAPI.ts`:

**HTTP Sensors**:
```typescript
private async readHTTPSensor(config: SensorConfig): Promise<SensorReading> {
  const response = await fetch(`${config.apiEndpoint}/power`);
  const data = await response.json();
  
  return {
    sensorId: config.sensorId,
    powerValue: data.power * (config.calibrationFactor || 1),
    voltage: data.voltage,
    current: data.current,
    timestamp: new Date(data.timestamp),
    status: 'online'
  };
}
```

**Serial Sensors** (using Web Serial API):
```typescript
private async readSerialSensor(config: SensorConfig): Promise<SensorReading> {
  const port = await navigator.serial.requestPort();
  await port.open({ baudRate: 9600 });
  
  const reader = port.readable.getReader();
  const { value } = await reader.read();
  const sensorData = JSON.parse(new TextDecoder().decode(value));
  
  return {
    sensorId: config.sensorId,
    powerValue: sensorData.power * (config.calibrationFactor || 1),
    timestamp: new Date(),
    status: 'online'
  };
}
```

## 📊 Data Flow

```
Real Sensors → SensorAPI → DeviceDataManager → UI Components
     ↓              ↓              ↓              ↓
  Hardware     Polling &      Central DB    3D Visualization
   Readings    Processing    & Calculations  & Device List
```

## 🔄 Real-time Updates

The system automatically:
1. **Polls sensors** at configured intervals
2. **Updates device data** with new readings
3. **Recalculates percentages** and totals
4. **Triggers UI updates** via React state

## 🎛️ Configuration Options

### Device Properties
```typescript
interface Device {
  id: number;
  name: string;
  color: string;           // UI color
  percentage: number;      // Usage percentage
  power: string;          // Display value
  powerValue: number;     // Numeric value for calculations
  isOnline: boolean;      // Device status
  lastUpdated: Date;      // Last sensor reading
  sensorId?: string;      // Linked sensor ID
  location?: string;      // Physical location
  deviceType: 'appliance' | 'electronics' | 'hvac' | 'lighting';
}
```

### Sensor Configuration
```typescript
interface SensorConfig {
  sensorId: string;        // Unique sensor identifier
  deviceName: string;      // Associated device name
  apiEndpoint?: string;    // HTTP endpoint (if applicable)
  pollInterval: number;    // Polling frequency (ms)
  calibrationFactor?: number; // Power reading adjustment
}
```

## 🛠️ Development vs Production

### Development Mode
- Uses `simulateRealTimeUpdates()` for mock data
- Updates every 5 seconds with random fluctuations
- No real sensor communication

### Production Mode
- Replace simulation with `initializeSensors()`
- Configure real sensor endpoints
- Implement actual API communication
- Add error handling and reconnection logic

## 📈 Future Enhancements

- **Database persistence** (PostgreSQL, MongoDB)
- **Historical data storage** and analytics
- **Alert system** for power anomalies
- **Energy cost calculations**
- **Machine learning** for usage prediction
- **Mobile app integration**
- **Multi-location support**

## 🔧 Troubleshooting

### Common Issues

1. **Sensors not updating**: Check network connectivity and API endpoints
2. **Incorrect power values**: Adjust calibration factors
3. **UI not refreshing**: Verify React state updates in components
4. **Serial connection fails**: Ensure proper permissions and baud rate

### Debug Mode

Enable detailed logging:
```typescript
// Add to sensorAPI.ts
console.log('Sensor reading:', reading);
console.log('Device updated:', deviceId, powerValue);
```

## 📞 Support

For sensor integration help:
1. Check device documentation
2. Test API endpoints manually
3. Verify sensor calibration
4. Review network configuration
