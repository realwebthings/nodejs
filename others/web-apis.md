# Web APIs Reference Guide

## Network & Connectivity

### Network Information API
```javascript
navigator.connection.effectiveType // '4g', '3g', 'slow-2g'
navigator.connection.downlink // Bandwidth estimate (Mbps)
navigator.connection.rtt // Round-trip time (ms)
navigator.connection.saveData // Data saver mode
navigator.connection.onchange = () => {} // Connection change event
```

### Online Status
```javascript
navigator.onLine // true/false
window.addEventListener('online', () => {})
window.addEventListener('offline', () => {})
```

## Device & Hardware

### Battery API
```javascript
navigator.getBattery().then(battery => {
  battery.level // 0.0 to 1.0
  battery.charging // true/false
  battery.chargingTime // seconds
  battery.dischargingTime // seconds
})
```

### Device Memory
```javascript
navigator.deviceMemory // RAM in GB (approximate)
navigator.hardwareConcurrency // CPU cores
navigator.maxTouchPoints // Touch support level
```

### Device Orientation
```javascript
window.addEventListener('deviceorientation', e => {
  e.alpha // Z-axis rotation (0-360)
  e.beta // X-axis rotation (-180 to 180)
  e.gamma // Y-axis rotation (-90 to 90)
})
```

### Vibration API
```javascript
navigator.vibrate(200) // Single vibration
navigator.vibrate([100, 30, 100]) // Pattern
navigator.vibrate(0) // Stop vibration
```

## Location & Sensors

### Geolocation API
```javascript
navigator.geolocation.getCurrentPosition(
  position => {
    position.coords.latitude
    position.coords.longitude
    position.coords.accuracy
  },
  error => console.error(error),
  { enableHighAccuracy: true, timeout: 5000 }
)

navigator.geolocation.watchPosition(callback)
```

### Ambient Light Sensor
```javascript
navigator.permissions.query({name: 'ambient-light-sensor'})
new AmbientLightSensor().addEventListener('reading', e => {
  console.log(e.target.illuminance) // Lux value
})
```

## Media & Input

### Media Devices
```javascript
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  // Use camera/microphone
})

navigator.mediaDevices.enumerateDevices().then(devices => {
  // List cameras, microphones, speakers
})
```

### Screen Capture
```javascript
navigator.mediaDevices.getDisplayMedia({
  video: true,
  audio: true
}).then(stream => {
  // Screen sharing
})
```

### Gamepad API
```javascript
window.addEventListener('gamepadconnected', e => {
  console.log('Gamepad connected:', e.gamepad)
})

navigator.getGamepads() // Array of connected gamepads
```

## Storage & Performance

### Storage API
```javascript
navigator.storage.estimate().then(estimate => {
  estimate.quota // Total storage quota
  estimate.usage // Used storage
  estimate.usageDetails // Breakdown by type
})

navigator.storage.persist() // Request persistent storage
```

### Performance API
```javascript
performance.memory.usedJSHeapSize // Memory usage
performance.memory.totalJSHeapSize // Total heap
performance.memory.jsHeapSizeLimit // Heap limit

performance.navigation.type // Navigation type
performance.timing.loadEventEnd // Page load time
```

### Web Workers
```javascript
const worker = new Worker('worker.js')
worker.postMessage({data: 'hello'})
worker.onmessage = e => console.log(e.data)
```

## Permissions & Security

### Permissions API
```javascript
navigator.permissions.query({name: 'camera'}).then(result => {
  result.state // 'granted', 'denied', 'prompt'
})

// Available permissions:
// camera, microphone, geolocation, notifications,
// persistent-storage, push, screen-wake-lock
```

### Credential Management
```javascript
navigator.credentials.create({
  publicKey: {
    // WebAuthn options
  }
})

navigator.credentials.get({
  password: true,
  federated: { providers: ['https://accounts.google.com'] }
})
```

## User Interface

### Clipboard API
```javascript
navigator.clipboard.writeText('Hello World')
navigator.clipboard.readText().then(text => console.log(text))

navigator.clipboard.write([
  new ClipboardItem({
    'text/plain': new Blob(['Hello'], {type: 'text/plain'})
  })
])
```

### Share API
```javascript
navigator.share({
  title: 'Check this out',
  text: 'Amazing content',
  url: 'https://example.com'
})
```

### Fullscreen API
```javascript
document.documentElement.requestFullscreen()
document.exitFullscreen()
document.fullscreenElement // Currently fullscreen element
```

### Screen Wake Lock
```javascript
navigator.wakeLock.request('screen').then(wakeLock => {
  // Prevent screen from turning off
  wakeLock.release() // Release when done
})
```

## Communication

### Service Workers
```javascript
navigator.serviceWorker.register('/sw.js').then(registration => {
  registration.update()
  registration.unregister()
})

navigator.serviceWorker.ready.then(registration => {
  // Service worker is active
})
```

### Push Notifications
```javascript
navigator.serviceWorker.ready.then(registration => {
  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: 'your-key'
  })
})
```

### Broadcast Channel
```javascript
const channel = new BroadcastChannel('my-channel')
channel.postMessage('Hello other tabs!')
channel.onmessage = e => console.log(e.data)
```

## File System

### File System Access API
```javascript
window.showOpenFilePicker().then(fileHandles => {
  // File picker
})

window.showSaveFilePicker().then(fileHandle => {
  // Save file dialog
})

window.showDirectoryPicker().then(dirHandle => {
  // Directory picker
})
```

### Drag and Drop
```javascript
element.addEventListener('drop', e => {
  e.preventDefault()
  const files = e.dataTransfer.files
  // Handle dropped files
})
```

## Payment & Commerce

### Payment Request API
```javascript
const request = new PaymentRequest(
  [{supportedMethods: 'basic-card'}],
  {total: {label: 'Total', amount: {currency: 'USD', value: '10.00'}}}
)

request.show().then(response => {
  // Process payment
  response.complete('success')
})
```

## Experimental APIs

### Web Bluetooth
```javascript
navigator.bluetooth.requestDevice({
  filters: [{services: ['battery_service']}]
}).then(device => {
  // Connect to Bluetooth device
})
```

### Web USB
```javascript
navigator.usb.requestDevice({
  filters: [{vendorId: 0x2341}] // Arduino
}).then(device => {
  // Connect to USB device
})
```

### Web Serial
```javascript
navigator.serial.requestPort().then(port => {
  // Connect to serial device
})
```

## Browser Information

### User Agent
```javascript
navigator.userAgent // Browser string
navigator.platform // Operating system
navigator.language // Primary language
navigator.languages // Language preferences
navigator.cookieEnabled // Cookie support
navigator.doNotTrack // DNT header value
```

### Feature Detection
```javascript
'serviceWorker' in navigator
'geolocation' in navigator
'getBattery' in navigator
'share' in navigator
```

## Notes

- Most APIs require HTTPS in production
- Many require user permission or interaction
- Check browser support before using
- Some APIs are experimental and may change
- Always handle errors and fallbacks gracefully