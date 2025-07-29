
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Trading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Trading</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Trade GAiA tokens and other digital assets.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
