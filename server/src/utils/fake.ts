import type { DescribeInstancesCommandInput, Instance } from '@aws-sdk/client-ec2'

import { EC2_LIST_LIMIT } from './constants'
import { fakeEc2s } from './fakeEC2s'

type EC2Filter = {
  Name: 'instance-state-name' | 'instance-type'
  Values: string[]
}

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
    instances: params.Filters?.length
      ? filterInstances(instances, params.Filters as EC2Filter[])
      : instances,
    nextToken,
  }
}

const filterInstances = (instances: Instance[], filters: EC2Filter[]) =>
  instances.filter((instance) => filters.every((filter) => checkFilter(instance, filter)))

function checkFilter(instance: Instance, filter: EC2Filter) {
  let value: string | undefined

  switch (filter.Name) {
    case 'instance-state-name':
      value = instance.State?.Name
      break
    case 'instance-type':
      value = instance.InstanceType
  }

  return filter.Values.includes(value ?? '')
}
