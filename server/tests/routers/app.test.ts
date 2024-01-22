import { describe, expect, it } from 'vitest'
import { TRPCError } from '@trpc/server'

import {
  createContextInner,
  mockAuthorizedSession,
  mockUnauthorizedSession,
} from 'src/context'
import { createCaller } from 'src/routers/_app'

describe('#appRouter', () => {
  describe('given an unauthorized session', async () => {
    const ctx = await createContextInner({ session: mockUnauthorizedSession })
    const caller = createCaller(ctx)

    it('should return healthcheck status ok', async () => {
      const result = await caller.healthcheck()
      expect(result).toBe('yay!')
    })

    it('should return unauthorized on ec2 route access', async () => {
      await expect(caller.ec2.count()).rejects.toThrow(
        new TRPCError({ code: 'UNAUTHORIZED' })
      )
      await expect(caller.ec2.list({ query: {}, page: {} })).rejects.toThrow(
        new TRPCError({ code: 'UNAUTHORIZED' })
      )
    })
  })

  describe('given an authorized session', async () => {
    const ctx = await createContextInner({ session: mockAuthorizedSession })
    const caller = createCaller(ctx)

    it('should return healthcheck status ok', async () => {
      const result = await caller.healthcheck()
      expect(result).toBe('yay!')
    })

    it('should return all instances information', async () => {
      const countResult = await caller.ec2.count() // count all

      const listResult = await caller.ec2.list({ query: {}, page: {} }) // query all

      expect(listResult.nextToken).toBe(null)
      expect(listResult.instances.length).toBe(countResult)

      const randomIndex = Math.floor(Math.random() * countResult)
      const randomInstance = listResult.instances[randomIndex]

      const getResult = await caller.ec2.get({ id: randomInstance.id })

      expect(getResult).toStrictEqual(randomInstance)
    })
  })
})
