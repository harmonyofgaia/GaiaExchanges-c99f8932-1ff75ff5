
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function DAO() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">DAO</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Participate in the GAiA Decentralized Autonomous Organization.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
