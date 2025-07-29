
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Vault() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Vault</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Secure storage and management for your digital assets.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
