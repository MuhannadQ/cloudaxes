import { useState, useEffect } from 'react'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/hooks/useAuth'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(13)
  const { isLoading } = useAuth()

  useEffect(() => {
    const timer1 = setTimeout(() => setProgress(33), 500)
    const timer2 = setTimeout(() => setProgress(50), 1500)
    const timer3 = setTimeout(() => setProgress(77), 3000)
    const timer4 = setTimeout(() => setProgress(93), 4000)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [])

  return (
    <div className="flex h-full items-center justify-center">
      <Progress value={isLoading ? progress : 100} className="w-1/3" />
    </div>
  )
}
