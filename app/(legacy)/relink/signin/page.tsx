'use client'

import { Button } from '@/components/legacy/ui/button'
import { Card } from '@/components/legacy/ui/card'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Redirect if already signed in
    if (status === 'authenticated') {
      router.push('/relink/edit')
    }

    // Check for error in URL params
    const errorParam = searchParams.get('error')
    if (errorParam) {
      setError(decodeURIComponent(errorParam))
    }
  }, [status, searchParams, router])

  const handleDiscordSignIn = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await signIn('discord', { callbackUrl: '/relink/edit' })
    } catch (err) {
      console.error('Sign in error:', err)
      setError('Failed to sign in. Please try again.')
      setIsLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center px-4">
      <Card className="p-8 bg-white/10 backdrop-blur-sm border-purple-500/30 max-w-md w-full text-center">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            Officers Only
          </h1>
          <p className="text-gray-300">
            Please sign in with Discord to access the Relink editor
          </p>
          <p className="text-sm text-gray-400 mt-2">
            You must have the admin role in the AI Society Discord server
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3 text-left">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

        <Button 
          size="lg" 
          className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
          onClick={handleDiscordSignIn}
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in with Discord'}
        </Button>
      </Card>
    </div>
  )
}
