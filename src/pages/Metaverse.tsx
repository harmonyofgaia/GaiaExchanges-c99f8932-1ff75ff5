
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Metaverse() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Metaverse</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Explore the GAiA metaverse and virtual worlds.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
