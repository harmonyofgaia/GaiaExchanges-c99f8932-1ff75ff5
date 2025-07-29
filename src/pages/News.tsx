
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function News() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">News</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Stay updated with the latest GAiA news and announcements.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
