
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Lore() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">GAiA Lore</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Discover the story and mythology behind the GAiA universe.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
