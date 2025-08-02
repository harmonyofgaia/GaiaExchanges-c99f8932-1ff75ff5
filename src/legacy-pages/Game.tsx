
import { HabboTycoon } from '@/components/games/HabboTycoon'
import { CreativeGameEngine } from '@/components/games/CreativeGameEngine'
import { InvisibleAttachmentSystem } from '@/components/security/InvisibleAttachmentSystem'
import { InvisibleSecurityCore } from '@/components/security/InvisibleSecurityCore'
import { Invisible4StepVerification } from '@/components/security/Invisible4StepVerification'

const Game = () => {
  return (
    <div>
      <InvisibleAttachmentSystem />
      <InvisibleSecurityCore />
      <Invisible4StepVerification />
      <div className="space-y-6">
        <CreativeGameEngine />
        <HabboTycoon />
      </div>
    </div>
  )
}

export default Game
