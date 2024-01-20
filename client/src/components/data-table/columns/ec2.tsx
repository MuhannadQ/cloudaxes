import { ColumnDef } from '@tanstack/react-table'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'

import type { EC2Instance } from '@/types'
import { stateNames } from '@/data/ec2'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import Icons from '@/components/Icons'
import DataTableColumnHeader from '../DataTableColumnHeader'
import DataTableRowActions from '../DataTableRowActions'

export const columns: ColumnDef<EC2Instance>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Instance" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => <Badge variant="secondary">{row.getValue('type')}</Badge>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <span className="max-w-[500px] truncate font-medium">{row.getValue('name')}</span>
    ),
  },
  {
    accessorKey: 'state',
    header: ({ column }) => <DataTableColumnHeader column={column} title="State" />,
    cell: ({ row }) => {
      const state = stateNames.find((state) => state.value === row.getValue('state'))

      if (!state) {
        return null
      }

      return (
        <div className="flex items-center">
          {state.icon && <state.icon className="text-muted-foreground mr-2 h-4 w-4" />}
          <span>{state.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'az',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Availability Zone" />
    ),
    filterFn: (row, id, value) => {
      const regionName = row.getValue<string>(id).slice(0, -1)
      return value.includes(regionName)
    },
  },
  {
    accessorKey: 'publicIP',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Public IP Address" />
    ),
    cell: ({ row }) =>
      row.getValue('publicIP') ? (
        <div className="flex items-center">
          <Icons.globe className="mr-1" />
          <Badge variant="outline" className="px-1">
            {row.getValue('publicIP')}
          </Badge>
        </div>
      ) : (
        '-'
      ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'privateIP',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Private IP Address" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className="px-1">
        {row.getValue('privateIP')}
      </Badge>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]

export const skeletonColumns: ColumnDef<EC2Instance>[] = [
  {
    // select
    ...columns[0],
  },
  {
    // id
    ...columns[1],
    cell: () => <Skeleton className="my-1.5 h-5 w-20" />,
  },

  {
    // type
    ...columns[2],
    cell: () => <Skeleton className="h-5 w-12" />,
  },
  {
    //  name
    ...columns[3],
    cell: () => <Skeleton className="h-5 w-48" />,
  },
  {
    // state
    ...columns[4],
    cell: () => (
      <div className="my-1.5 flex space-x-2">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-5 w-20" />
      </div>
    ),
  },
  {
    // az
    ...columns[5],
    cell: () => <Skeleton className="h-5 w-20" />,
  },
  {
    // public ip
    ...columns[6],
    cell: () => <Skeleton className="h-5 w-20" />,
  },
  {
    // private ip
    ...columns[7],
    cell: () => <Skeleton className="h-5 w-20" />,
  },
  {
    // actions
    ...columns[8],
    cell: () => <DotsHorizontalIcon className="my-2 h-4 w-4" />,
  },
]
