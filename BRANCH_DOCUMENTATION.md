# Smart Watt - Branch Documentation
## Branch: update-homepagejuliuspathc

---

## 📋 Executive Summary

This documentation covers the comprehensive updates made to the Smart Watt energy monitoring dashboard, focusing on homepage improvements, component restructuring, and enhanced user experience. The branch introduces a modern, interactive interface with 3D visualizations, animated components, and improved power management controls.

---

## 🎯 Project Overview

**Project Name:** Smart Watt  
**Version:** 0.1.0  
**Framework:** Next.js 15.5.2 with React 19.1.0  
**Branch:** update-homepagejuliuspathc  
**Last Updated:** September 2025  

### Key Technologies
- **Frontend:** Next.js, React, TypeScript
- **Styling:** Tailwind CSS, DaisyUI
- **3D Graphics:** React Three Fiber, Three.js
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React, Remix Icons

---

## 🚀 Major Features Implemented

### 1. Homepage Redesign
- **Complete UI overhaul** with modern, responsive design
- **Logo integration** with SmartWatt branding
- **Responsive layout** supporting mobile and desktop views
- **Component-based architecture** for better maintainability

### 2. HomeUsage Component
- **Swipeable carousel interface** with 4 main sections:
  - Total Usage Display
  - Connected Devices Overview
  - AI Insights Panel
  - Power Limiter Control
- **Touch and mouse gesture support** for navigation
- **Animated number counters** with smooth transitions
- **Real-time status indicators** with pulsing animations

### 3. 3D Visualization System
- **Interactive 3D sphere visualization** using React Three Fiber
- **Dynamic device representation** with size-based power consumption
- **Central power limiter sphere** with color-coded status
- **Proximity-based positioning** for intuitive power usage display
- **Smooth animations** and transitions

### 4. Power Limiter Control
- **Collapsible interface** with expand/collapse functionality
- **Real-time usage monitoring** with percentage calculations
- **Color-coded status system:**
  - Green: Safe operation (< 80%)
  - Yellow: Warning zone (80-100%)
  - Red: Over limit (> 100%)
- **Interactive limit adjustment** with input validation
- **Progress bar visualization** for usage tracking

---

## 📁 Component Architecture

### Core Components

#### 1. HomeUsage Component (`src/components/homeusage.tsx`)
```typescript
interface HomeUsageProps {
  devices: Device[];
  totalDevices: number;
  totalUsage: number;
  powerLimit: number;
  onPowerLimitChange: (limit: number) => void;
}
```

**Features:**
- Swipeable carousel with 4 panels
- Animated number display with easing functions
- Touch and mouse gesture support
- Real-time device status monitoring
- Responsive grid layout for device display

#### 2. PowerLimiterControl Component (`src/components/PowerLimiterControl.tsx`)
```typescript
interface PowerLimiterControlProps {
  currentUsage: number;
  powerLimit: number;
  onLimitChange: (newLimit: number) => void;
}
```

**Features:**
- Collapsible UI with smooth animations
- Input validation for power limits
- Color-coded status indicators
- Progress bar with dynamic styling
- Keyboard and blur event handling

#### 3. Visualization3D Component (`src/components/Visualization3D.tsx`)
**Features:**
- 3D sphere rendering with React Three Fiber
- Dynamic device positioning based on power consumption
- Central power limiter with status-based coloring
- Smooth camera animations and transitions
- Exponential scaling for dramatic visual differences

#### 4. AnimatedNumber Component (Embedded in HomeUsage)
**Features:**
- Smooth counting animations with easing
- Configurable duration and animation curves
- Performance-optimized with requestAnimationFrame
- Fade-in and slide-up entrance effects

---

## 🎨 Design System

### Color Palette
- **Primary Green:** `#10b981` (Emerald)
- **Warning Yellow:** `#f59e0b` (Amber)
- **Danger Red:** `#ef4444` (Red)
- **Secondary Blue:** `#3b82f6` (Blue)
- **Background Dark:** `#161617`
- **Background Light:** `#f3f4f6`

### Device Color Assignments
```javascript
const deviceColors = {
  'Oven': '#10b981',        // Emerald
  'PC': '#3b82f6',          // Blue
  'Refrigerator': '#f59e0b', // Amber
  'TV': '#ef4444',          // Red
  'Washing Machine': '#8b5cf6', // Violet
  'Air Conditioner': '#06b6d4', // Cyan
  // ... additional devices
};
```

### Animation Specifications
- **Entrance Duration:** 1.5 seconds with ease-out curve
- **Carousel Transition:** 300ms ease-in-out
- **Pulse Animation:** 3-second loop with opacity and scale changes
- **Number Counting:** Custom easing with cubic deceleration

---

## 📊 Data Management

### Device Data Structure
```typescript
interface Device {
  id: number;
  name: string;
  color: string;
  percentage: number;
  power: string;
}
```

### Sample Device Configuration
```javascript
const allDevices = [
  { name: 'Water Heater', percentage: 45, power: '0.54 kW' },
  { name: 'Air Conditioner', percentage: 40, power: '0.48 kW' },
  { name: 'Oven', percentage: 35, power: '0.42 kW' },
  { name: 'Refrigerator', percentage: 30, power: '0.36 kW' },
  // ... additional devices
];
```

### Power Calculation Logic
- **Total Usage:** Sum of all connected device power consumption
- **Usage Percentage:** `(currentUsage / powerLimit) * 100`
- **Status Determination:** Based on percentage thresholds (80%, 100%)
- **Dynamic Scaling:** Exponential scaling using `Math.pow(percentage, 0.7)`

---

## 🔧 Technical Implementation

### State Management
- **React Hooks:** useState, useEffect, useRef for local state
- **Prop Drilling:** Parent-to-child data flow for device information
- **Event Handling:** Touch, mouse, and keyboard event management
- **Animation Controls:** Framer Motion animation orchestration

### Performance Optimizations
- **requestAnimationFrame:** For smooth number animations
- **Component Memoization:** Preventing unnecessary re-renders
- **Lazy Loading:** Dynamic imports for heavy 3D components
- **Responsive Images:** Next.js Image component with optimization

### Responsive Design
- **Mobile-First Approach:** Touch-friendly interface design
- **Breakpoint System:** Tailwind CSS responsive utilities
- **Flexible Layouts:** CSS Grid and Flexbox for adaptability
- **Touch Gestures:** Swipe navigation for mobile devices

---

## 🎭 User Experience Features

### Interactive Elements
1. **Swipeable Carousel:** Intuitive navigation between dashboard sections
2. **Collapsible Controls:** Space-efficient power limiter interface
3. **Animated Feedback:** Visual confirmation for user interactions
4. **Status Indicators:** Real-time system health monitoring

### Accessibility Features
- **ARIA Labels:** Screen reader support for navigation elements
- **Keyboard Navigation:** Full keyboard accessibility
- **Color Contrast:** WCAG-compliant color combinations
- **Focus Management:** Proper focus handling for interactive elements

### Visual Hierarchy
- **Typography Scale:** Clear information hierarchy with font sizes
- **Color Coding:** Consistent status indication across components
- **Spacing System:** Tailwind CSS spacing for visual rhythm
- **Icon Usage:** Lucide React icons for consistent iconography

---

## 🏗️ File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout configuration
│   └── page.tsx                # Main homepage component
├── components/
│   ├── homeusage.tsx           # Main carousel component
│   ├── PowerLimiterControl.tsx # Power management interface
│   ├── Visualization3D.tsx     # 3D sphere visualization
│   ├── AIInsights.tsx          # AI recommendations panel
│   ├── ConnectedDevices.tsx    # Device management component
│   └── ui/                     # Reusable UI components
│       ├── AnimatedNumber.tsx  # Number animation component
│       ├── button.tsx          # Button component
│       ├── card.tsx            # Card component
│       └── ...                 # Additional UI components
└── styles/
    └── globals.css             # Global styles and Tailwind imports
```

---

## 📈 Performance Metrics

### Bundle Size Optimization
- **Next.js Code Splitting:** Automatic route-based splitting
- **Dynamic Imports:** Lazy loading for 3D components
- **Tree Shaking:** Unused code elimination
- **Image Optimization:** Next.js automatic image optimization

### Animation Performance
- **Hardware Acceleration:** CSS transforms for smooth animations
- **Frame Rate Targeting:** 60fps animation performance
- **Memory Management:** Proper cleanup of animation listeners
- **Reduced Layout Thrashing:** Transform-only animations

---

## 🔒 Security Considerations

### Input Validation
- **Power Limit Input:** Regex validation for numeric input
- **Range Checking:** Minimum/maximum power limit enforcement
- **XSS Prevention:** Proper input sanitization
- **Type Safety:** TypeScript for compile-time type checking

### Data Protection
- **Client-Side Only:** No sensitive data transmission
- **Local State Management:** Browser-based state storage
- **Secure Dependencies:** Regular dependency updates
- **CSP Headers:** Content Security Policy implementation

---

## 🧪 Testing Strategy

### Component Testing
- **Unit Tests:** Individual component functionality
- **Integration Tests:** Component interaction testing
- **Visual Regression:** UI consistency verification
- **Accessibility Testing:** WCAG compliance validation

### Performance Testing
- **Load Time Metrics:** Core Web Vitals monitoring
- **Animation Smoothness:** Frame rate analysis
- **Memory Usage:** Memory leak detection
- **Bundle Analysis:** Code splitting effectiveness

---

## 🚀 Deployment Configuration

### Build Process
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "postbuild": "next-sitemap"
  }
}
```

### Environment Setup
- **Node.js:** Version 18+ required
- **Package Manager:** npm or yarn
- **Build Target:** Static export for deployment
- **Deployment Platform:** Netlify-ready configuration

---

## 📝 Recent Commits

### Commit History
1. **27d06c1** - "make HomeUsage component"
   - Created comprehensive HomeUsage component with carousel functionality
   - Implemented swipeable navigation system
   - Added animated number displays

2. **20dfaa4** - "update homepage, removed logo, replace with total usage component"
   - Restructured homepage layout
   - Integrated HomeUsage component into main page
   - Removed redundant logo placement

3. **486eae5** - Previous desktop view updates
4. **6900602** - Page.tsx updates
5. **ef2fe27** - Sidemenu.jsx updates

---

## 🔮 Future Enhancements

### Planned Features
1. **Real-time Data Integration:** WebSocket connection for live updates
2. **Historical Analytics:** Power usage trends and patterns
3. **Smart Recommendations:** AI-powered energy optimization
4. **Mobile App:** React Native companion application
5. **Advanced 3D Features:** More interactive visualization elements

### Technical Improvements
1. **State Management:** Redux or Zustand for complex state
2. **Testing Coverage:** Comprehensive test suite implementation
3. **Performance Monitoring:** Real-time performance analytics
4. **Internationalization:** Multi-language support
5. **Progressive Web App:** PWA capabilities for mobile experience

---

## 🛠️ Development Setup

### Prerequisites
```bash
Node.js >= 18.0.0
npm >= 8.0.0 or yarn >= 1.22.0
```

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd Smart-Watt

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Commands
```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Generate sitemap
npm run postbuild
```

---

## 📞 Support and Maintenance

### Code Maintainers
- **Primary Developer:** Julius (Branch Creator)
- **Review Team:** Smart Watt Development Team
- **Documentation:** Auto-generated and manually maintained

### Issue Reporting
- **Bug Reports:** Use GitHub Issues with bug template
- **Feature Requests:** Use GitHub Issues with feature template
- **Performance Issues:** Include performance profiling data
- **Security Concerns:** Report privately to security team

### Update Schedule
- **Minor Updates:** Weekly releases for bug fixes
- **Major Updates:** Monthly releases for new features
- **Security Patches:** Immediate releases as needed
- **Dependency Updates:** Quarterly dependency reviews

---

## 📚 Additional Resources

### Documentation Links
- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber Guide](https://docs.pmnd.rs/react-three-fiber)
- [Framer Motion API](https://www.framer.com/motion/)
- [Tailwind CSS Reference](https://tailwindcss.com/docs)

### Design Resources
- [Component Design System](./design-system.md)
- [Color Palette Guide](./colors.md)
- [Animation Guidelines](./animations.md)
- [Responsive Design Rules](./responsive.md)

---

## 📄 License and Legal

### License Information
- **License Type:** Private/Proprietary
- **Copyright:** Smart Watt Development Team
- **Usage Rights:** Internal use only
- **Distribution:** Restricted to authorized personnel

### Third-Party Licenses
- **React:** MIT License
- **Next.js:** MIT License
- **Three.js:** MIT License
- **Tailwind CSS:** MIT License
- **Framer Motion:** MIT License

---

*This documentation was generated on September 23, 2025, for the update-homepagejuliuspathc branch of the Smart Watt project.*

---

**Document Version:** 1.0  
**Last Updated:** September 23, 2025  
**Next Review Date:** October 23, 2025
