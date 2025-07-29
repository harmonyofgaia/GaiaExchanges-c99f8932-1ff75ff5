
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Portfolio() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Track and manage your GAiA assets and investments.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
