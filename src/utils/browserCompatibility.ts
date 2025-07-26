
interface BrowserInfo {
  name: string
  version: string
  isSupported: boolean
  adminAccess: boolean
}

export function detectBrowser(): BrowserInfo {
  const userAgent = navigator.userAgent
  let browserName = 'Unknown'
  let version = 'Unknown'
  const isSupported = true
  let adminAccess = false

  if (userAgent.includes('Firefox')) {
    browserName = 'Firefox'
    adminAccess = true // Only Firefox has admin access
    const firefoxVersion = userAgent.match(/Firefox\/(\d+\.\d+)/)
    version = firefoxVersion ? firefoxVersion[1] : 'Unknown'
  } else if (userAgent.includes('Chrome') && !userAgent.includes('Edge')) {
    browserName = 'Chrome'
    const chromeVersion = userAgent.match(/Chrome\/(\d+\.\d+)/)
    version = chromeVersion ? chromeVersion[1] : 'Unknown'
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browserName = 'Safari'
    const safariVersion = userAgent.match(/Version\/(\d+\.\d+)/)
    version = safariVersion ? safariVersion[1] : 'Unknown'
  } else if (userAgent.includes('Edge')) {
    browserName = 'Edge'
    const edgeVersion = userAgent.match(/Edge\/(\d+\.\d+)/)
    version = edgeVersion ? edgeVersion[1] : 'Unknown'
  }

  return {
    name: browserName,
    version,
    isSupported,
    adminAccess
  }
}

export function ensureCrossBrowserCompatibility(): boolean {
  const features = {
    webGL: !!window.WebGLRenderingContext,
    canvas: !!document.createElement('canvas').getContext,
    localStorage: typeof Storage !== 'undefined',
    webSockets: typeof WebSocket !== 'undefined',
    audioContext: !!(window.AudioContext || (window as any).webkitAudioContext),
    deviceOrientation: 'DeviceOrientationEvent' in window,
    geolocation: 'geolocation' in navigator,
    webRTC: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
  }

  const requiredFeatures = ['webGL', 'canvas', 'localStorage', 'webSockets']
  const supportedFeatures = requiredFeatures.filter(feature => features[feature as keyof typeof features])

  return supportedFeatures.length === requiredFeatures.length
}

export function getOptimalSettings() {
  const browser = detectBrowser()
  const settings = {
    enableWebGL: true,
    enableAudio: true,
    enableFullscreen: true,
    enableGamepad: true,
    performanceMode: 'high',
    maxTextureSize: 2048
  }

  // Optimize settings based on browser
  switch (browser.name) {
    case 'Firefox':
      settings.performanceMode = 'ultra' // Best performance for admin
      settings.maxTextureSize = 4096
      break
    case 'Chrome':
      settings.performanceMode = 'high'
      break
    case 'Safari':
      settings.enableWebGL = false // Safari WebGL issues
      settings.performanceMode = 'medium'
      break
    case 'Edge':
      settings.performanceMode = 'high'
      break
  }

  return settings
}
