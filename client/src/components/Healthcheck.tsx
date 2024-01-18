import { TRPC_API_URL, trpc } from '@/lib/trpc'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import Icons from '@/components/Icons'

export default function Healthcheck() {
  const hcQuery = trpc.healthcheck.useQuery()
  let errorMessage = ''
  if (hcQuery.isError) {
    if (hcQuery.error.data?.code) {
      errorMessage = hcQuery.error.message
    } else {
      errorMessage = 'No connection to server' // 'hcQuery.error.message' is "Failed to fetch"
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Run Healtcheck
          <Icons.heart className="ml-2 h-4 w-4 text-red-600" fill="currentColor" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>TRPC server healthcheck</DialogTitle>
          <DialogDescription>
            <code>trpc.healthcheck.useQuery()</code> returned:
          </DialogDescription>
        </DialogHeader>
        <div>
          {hcQuery.isLoading ? (
            'Loading...'
          ) : (
            <Badge variant={errorMessage ? 'destructive' : 'default'}>
              {errorMessage || hcQuery.data}
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={`${TRPC_API_URL}/healthcheck`} readOnly />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Icons.copy className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
