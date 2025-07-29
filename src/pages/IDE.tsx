
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function IDE() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">IDE</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Develop applications on the GAiA platform with our integrated development environment.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
