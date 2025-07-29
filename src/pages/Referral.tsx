
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Referral() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Referral Program</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Earn rewards by referring friends to the GAiA ecosystem.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
