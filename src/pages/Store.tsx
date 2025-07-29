
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Store() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Store</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Browse and purchase GAiA merchandise and digital items.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
