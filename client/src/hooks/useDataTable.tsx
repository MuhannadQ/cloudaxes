import { useContext } from 'react'
import { DataTableContext } from '@/context/DataTableProvider'

export const useDataTable = () => {
  const context = useContext(DataTableContext)
  if (!context) {
    throw new Error('useDataTable must be used within a DataTableProvider')
  }
  return context
}
