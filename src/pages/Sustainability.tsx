
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Sustainability() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Sustainability</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Learn about GAiA's commitment to environmental sustainability.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
