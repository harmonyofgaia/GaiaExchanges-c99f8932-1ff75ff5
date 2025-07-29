
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Ecosystem() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Ecosystem</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Explore the complete GAiA ecosystem and its interconnected services.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
