
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Prediction() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Prediction Markets</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Participate in prediction markets and earn rewards.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
