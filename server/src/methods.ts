import { t } from 'src/trpc'
import { isAuthorized } from 'src/middleware/auth'

export const publicProcedure = t.procedure
export const protectedProcedure = publicProcedure.use(isAuthorized)
