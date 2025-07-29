
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function DeFi() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">DeFi</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Access decentralized finance features and services.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
