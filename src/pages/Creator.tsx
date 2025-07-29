
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Creator() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Creator Hub</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Create and monetize content in the GAiA ecosystem.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
