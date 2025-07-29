
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Events() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Events</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Discover and participate in GAiA community events.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
