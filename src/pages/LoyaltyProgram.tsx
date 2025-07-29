
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function LoyaltyProgram() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Loyalty Program</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Join the GAiA loyalty program and earn exclusive rewards.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
