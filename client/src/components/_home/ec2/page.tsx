import { columns, skeletonColumns } from '@/components/data-table/columns/ec2'
import DataTable from '@/components/data-table'
import ec2sJson from '@/data/ec2s.json'
import { Task } from '@/types'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import Icons from '@/components/Icons'
import { cn } from '@/lib/utils'

export default function EC2Page() {
  const [fakeLoading, setFakeLoading] = useState(true)

  if (fakeLoading) {
    setTimeout(() => {
      setFakeLoading(false)
    }, 2000)
  }

  const tableColumns = useMemo(
    () => (fakeLoading ? skeletonColumns : columns),
    [fakeLoading]
  )
  const tableData: Task[] = useMemo(
    () => (fakeLoading ? Array(30).fill({}) : ec2sJson),
    [fakeLoading]
  )
  return (
    <div className="flex h-full flex-col space-y-8 p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of our ec2 instances!
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="px-2"
          onClick={() => setFakeLoading((isLoading) => !isLoading)}
        >
          <Icons.reload className={cn('h-4 w-4', fakeLoading && 'animate-spin')} />
          <span className="sr-only">Reload</span>
        </Button>
      </div>
      <DataTable data={tableData} columns={tableColumns} />
    </div>
  )
}
