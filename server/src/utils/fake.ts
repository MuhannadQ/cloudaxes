import type { DescribeInstancesCommandInput } from '@aws-sdk/client-ec2'

import { EC2_LIST_LIMIT } from './constants'
import fakeEc2s from './fakeEC2s'

export function fakeDescribeInstances(params: DescribeInstancesCommandInput) {
  if (params.InstanceIds) {
    const id = params.InstanceIds[0]
    const found = fakeEc2s.find((ec2) => ec2.InstanceId === id)
    return {
      instances: found ? [found] : [],
      nextToken: null,
    }
  }

  const limit = params.MaxResults ?? EC2_LIST_LIMIT
  const page = +(params.NextToken ?? '0')

  const from = page * limit
  const to = from + limit
  const instances = fakeEc2s.slice(from, to)

  const noMoreInstances = instances.length < limit || instances.length === to
  const nextToken = noMoreInstances ? null : (page + 1).toString()

  return {
    instances,
    nextToken,
  }
}
