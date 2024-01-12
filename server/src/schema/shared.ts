import type { ZodTypeAny } from 'zod'
import { z } from 'zod'

export const zString = z.string().trim().min(1)
export const zEmail = z.string().email()

const PageSchema = z.number().int().positive()
export const PaginatedQuerySchema = <T extends ZodTypeAny>(QuerySchema: T) => {
  return z.object({ query: QuerySchema, page: z.optional(PageSchema) })
}
