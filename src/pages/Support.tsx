
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Support() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Support</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Get help and support for your GAiA experience.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
