import { t } from './trpc'
import { isAuthorized } from './middleware/auth'

export const publicProcedure = t.procedure
export const protectedProcedure = publicProcedure.use(isAuthorized)
