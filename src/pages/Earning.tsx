
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Earning() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Earning</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Discover multiple ways to earn GAiA tokens.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
