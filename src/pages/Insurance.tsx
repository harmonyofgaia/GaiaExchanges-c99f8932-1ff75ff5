
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Insurance() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Insurance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Protect your digital assets with GAiA insurance products.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
