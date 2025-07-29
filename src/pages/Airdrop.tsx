
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Airdrop() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Airdrop</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Participate in GAiA token airdrops and rewards.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
