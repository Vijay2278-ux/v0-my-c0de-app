"use client"

interface WelcomeHeaderProps {
  userName?: string
}

export function WelcomeHeader({ userName }: WelcomeHeaderProps) {
  if (!userName) return null

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-primary/20">
        <p className="text-sm font-medium text-primary">
          Welcome, <span className="font-bold">{userName}</span>! 👋
        </p>
      </div>
    </div>
  )
}
