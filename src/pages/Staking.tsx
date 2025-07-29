
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Staking() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Staking</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Stake your GAiA tokens to earn rewards.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
