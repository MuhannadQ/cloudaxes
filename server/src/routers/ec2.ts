import { createTRPCRouter } from 'src/trpc'
import { protectedProcedure } from 'src/methods'
import { getEC2Instance, getEC2InstancesCount, listEC2Instances } from 'src/services'
import { PaginatedQuerySchema } from 'src/schema'
import { EC2KeySchema, EC2QuerySchema } from 'src/schema'

export const ec2Router = createTRPCRouter({
  count: protectedProcedure.query(() => getEC2InstancesCount()),
  get: protectedProcedure.input(EC2KeySchema).query(({ input }) => getEC2Instance(input)),
  list: protectedProcedure
    .input(PaginatedQuerySchema(EC2QuerySchema))
    .query(({ input }) => listEC2Instances(input.query, input.page)),
})
