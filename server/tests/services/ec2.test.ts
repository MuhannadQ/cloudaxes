import { describe, expect, it } from 'vitest'
import type { TRPCError } from '@trpc/server'
import type { ZodError } from 'zod'

import { createContextInner, mockAuthorizedSession } from 'src/context'
import { createCaller } from 'src/routers/_app'
import { FAKE_COUNT } from 'src/utils/fakeEC2s'

describe('#ec2Service', async () => {
  const ctx = await createContextInner({ session: mockAuthorizedSession })
  const caller = createCaller(ctx)

  it('should return count of all instances', async () => {
    const result = await caller.ec2.count()
    expect(result).toBe(FAKE_COUNT.all)
  })

  it('should throw on non existent instance id request', async () => {
    let trpcError: TRPCError | undefined

    try {
      await caller.ec2.get({ id: 'non-existent-instance-id' })
    } catch (error) {
      trpcError = error as TRPCError
    }

    expect(trpcError?.code).toBe('NOT_FOUND')
  })

  it('should return one ec2 instance', async () => {
    const existingId = 'i-a588782'
    const result = await caller.ec2.get({ id: existingId })

    expect(result.id).toBe(existingId)
  })

  it('should list all ec2 instances', async () => {
    const result = await caller.ec2.list({ query: {}, page: {} })

    expect(result.nextToken).toBe(null)
    expect(result.instances.length).toBe(FAKE_COUNT.all)
  })

  it('should throw on invalid filter values', async () => {
    let trpcError: TRPCError | undefined

    try {
      await caller.ec2.list({ query: { state: ' ' }, page: { size: 0 } })
    } catch (error) {
      trpcError = error as TRPCError
    }

    expect(trpcError?.code).toBe('BAD_REQUEST')
    expect(trpcError?.cause?.name).toBe('ZodError')
    expect((trpcError?.cause as ZodError).issues.length).toBe(2)
  })

  it('should list ec2 instances filtered by state', async () => {
    const result = await caller.ec2.list({
      query: { state: 'running' },
      page: {},
    })

    expect(result.instances.length).toBe(FAKE_COUNT.running)
  })

  it('should list ec2 instances filtered by type', async () => {
    const result = await caller.ec2.list({
      query: { type: 't2.micro' },
      page: {},
    })

    expect(result.instances.length).toBe(FAKE_COUNT.t2micro)
  })

  it('should list ec2 instances filtered by state & type', async () => {
    const result = await caller.ec2.list({
      query: { state: 'running', type: 't2.micro' },
      page: {},
    })

    expect(result.instances.length).toBe(FAKE_COUNT.running_t2micro)
  })
})
