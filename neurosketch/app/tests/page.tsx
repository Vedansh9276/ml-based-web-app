import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { ReactionTest } from "@/components/reaction-test"
import { SpiralTest } from "@/components/spiral-test"
import { TapTest } from "@/components/tap-test"
import { VoiceTest } from "@/components/voice-test"

export default async function TestsPage() {
  const session = await getSession()
  if (!session) redirect("/login")

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Neurological Tests</h1>
          <p className="text-muted-foreground">Complete these tests to assess your neurological health</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <ReactionTest email={session.email} />
          <SpiralTest email={session.email} />
          <TapTest email={session.email} />
          <VoiceTest email={session.email} />
        </div>
      </div>
    </div>
  )
}

