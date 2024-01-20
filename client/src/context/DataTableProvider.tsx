import { createContext, useState } from 'react'

interface DataTableContextProps {
  rowCount: number

  pageSizes: number[]

  pageSize: number
  changePageSize: (size: number) => void

  page: number // in table
  changePage: (page: number) => void

  // nextTokens: string[]
}

export const DataTableContext = createContext<DataTableContextProps | undefined>(
  undefined
)

interface DataTableProviderProps {
  rowCount: number
  pageSizes: number[]
  children: React.ReactNode
}

export const DataTableProvider = ({
  rowCount,
  pageSizes,
  children,
}: DataTableProviderProps) => {
  const [pageSize, setPageSize] = useState(10) // limit
  const [page, setPage] = useState(1)

  const contextValue: DataTableContextProps = {
    rowCount,

    pageSizes,

    pageSize,
    changePageSize: setPageSize,

    page,
    changePage: setPage,

    // nextTokens: [''],
  }

  return (
    <DataTableContext.Provider value={contextValue}>{children}</DataTableContext.Provider>
  )
}
