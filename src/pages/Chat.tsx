
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Chat() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Connect with the GAiA community in real-time.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
