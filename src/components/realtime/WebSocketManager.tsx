
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

interface WebSocketMessage {
  type: string
  data: any
  timestamp: number
}

export function WebSocketManager() {
  const [isConnected, setIsConnected] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    // Initialize WebSocket connection for real-time data
    const connectWebSocket = () => {
      try {
        // Simulated WebSocket connection (replace with actual endpoint)
        wsRef.current = new WebSocket('wss://api.gaiaexchanges.com/realtime')
        
        wsRef.current.onopen = () => {
          setIsConnected(true)
          console.log('🔗 WebSocket connected - Real-time data active')
          toast.success('Real-time connection established')
        }

        wsRef.current.onmessage = (event) => {
          const message: WebSocketMessage = JSON.parse(event.data)
          setLastMessage(message)
          setMessageCount(prev => prev + 1)
          console.log('📡 Real-time update:', message)
        }

        wsRef.current.onclose = () => {
          setIsConnected(false)
          console.log('🔌 WebSocket disconnected - Attempting reconnection')
          setTimeout(connectWebSocket, 5000)
        }

      } catch (error) {
        console.error('WebSocket connection failed:', error)
        setTimeout(connectWebSocket, 10000)
      }
    }

    connectWebSocket()

    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  return {
    isConnected,
    messageCount,
    lastMessage,
    sendMessage: (data: any) => {
      if (wsRef.current && isConnected) {
        wsRef.current.send(JSON.stringify(data))
      }
    }
  }
}
