
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Launchpad() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Launchpad</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Discover and invest in new projects launching on GAiA.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
