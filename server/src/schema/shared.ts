import type { ZodTypeAny } from 'zod'
import { z } from 'zod'

export const zString = z.string().trim().min(1) // add message min(1,'This cannot be empty')

export const PaginateSchema = z
  .object({ nextToken: zString, size: z.number().positive() })
  .partial()

export const PaginatedQuerySchema = <T extends ZodTypeAny>(QuerySchema: T) => {
  return z.object({ query: QuerySchema, page: PaginateSchema })
}

export type Paginate = z.infer<typeof PaginateSchema>
