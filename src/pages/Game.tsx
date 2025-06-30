
import { HabboTycoon } from '@/components/games/HabboTycoon'
import { InvisibleAttachmentSystem } from '@/components/security/InvisibleAttachmentSystem'
import { InvisibleSecurityCore } from '@/components/security/InvisibleSecurityCore'
import { InvisibleAdminProtection } from '@/components/security/InvisibleAdminProtection'

const Game = () => {
  return (
    <div>
      <InvisibleAttachmentSystem />
      <InvisibleSecurityCore />
      <InvisibleAdminProtection />
      <HabboTycoon />
    </div>
  )
}

export default Game
