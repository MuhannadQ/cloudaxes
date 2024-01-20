import { useMemo, useState } from 'react'

import { EC2Instance } from '@/types'
import { DataTableProvider } from '@/context/DataTableProvider'
// import { useDataTable } from '@/hooks/useDataTable'
import DataTable from '@/components/data-table'
import { Button } from '@/components/ui/button'
import Icons from '@/components/Icons'
import { columns, skeletonColumns } from '@/components/data-table/columns/ec2'
import { getErrorMessage, trpc } from '@/lib/trpc'
import { cn } from '@/lib/utils'

const TABLE_PAGE_SIZES = [10, 20, 30, 40, 50]

export default function EC2Page() {
  const { isError, error, isLoading, data } = trpc.ec2.count.useQuery()
  const [fakeLoading, setFakeLoading] = useState(false)

  const errorMessage = isError ? getErrorMessage(error) : ''
  const count = data ?? 0

  if (fakeLoading) {
    setTimeout(() => setFakeLoading(false), 2000)
  }

  return (
    <div className="flex h-full flex-col space-y-8 p-8">
      <div className="flex justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">EC2</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of our ec2 instances!
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="px-2"
          onClick={() => setFakeLoading(true)}
        >
          <Icons.reload className={cn('h-4 w-4', fakeLoading && 'animate-spin')} />
          <span className="sr-only">Reload</span>
        </Button>
      </div>
      {errorMessage || isLoading ? (
        <div>{errorMessage || 'Loading...'}</div>
      ) : (
        <DataTableProvider rowCount={count} pageSizes={TABLE_PAGE_SIZES}>
          <EC2Table reload={fakeLoading} />
        </DataTableProvider>
      )}
    </div>
  )
}

type EC2TableProps = {
  reload: boolean
}

const EC2Table = ({ reload }: EC2TableProps) => {
  // const {  } = useDataTable()
  const { isError, error, isLoading, data } = trpc.ec2.list.useQuery({
    query: {},
    page: {},
  })

  const errorMessage = isError ? getErrorMessage(error) : ''

  const tableColumns = useMemo(
    () => (isLoading || reload ? skeletonColumns : columns),
    [isLoading, reload]
  )

  const tableData: EC2Instance[] = useMemo(
    () => (isLoading ? fakeTableData : data!.instances),
    [isLoading, data]
  )

  if (errorMessage) return errorMessage

  return <DataTable data={tableData} columns={tableColumns} />
}

const fakeTableData = Array(30).fill({})
