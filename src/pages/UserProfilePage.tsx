
import { UserProfile } from '@/components/user/UserProfile'
import { useAuth } from '@/components/auth/AuthProvider'
import { useParams } from 'react-router-dom'

export default function UserProfilePage() {
  const { user } = useAuth()
  const { userId } = useParams<{ userId?: string }>()
  
  // Determine if the current user is viewing their own profile
  const isOwner = !userId || userId === user?.id

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        <UserProfile isOwner={isOwner} />
      </div>
    </div>
  )
}
