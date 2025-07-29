
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Lending() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Lending</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Lend and borrow GAiA tokens and other digital assets.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
