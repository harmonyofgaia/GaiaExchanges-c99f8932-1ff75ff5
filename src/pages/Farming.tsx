
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Farming() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Yield Farming</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Participate in yield farming to maximize your returns.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
