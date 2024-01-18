import { Button } from '@/components/ui/button'
import Icons from '@/components/Icons'

type Props = {
  label: string
  isLoading: boolean
}
export default function AuthButton({ label, isLoading }: Props) {
  return (
    <Button disabled={isLoading} className="w-full">
      {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </Button>
  )
}
