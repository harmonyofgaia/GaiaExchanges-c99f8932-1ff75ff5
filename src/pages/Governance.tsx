
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Governance() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Governance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Participate in GAiA governance and shape the future.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
