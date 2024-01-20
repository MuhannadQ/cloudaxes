import type { Instance, DescribeInstancesCommandInput } from '@aws-sdk/client-ec2'
import {
  DescribeInstancesCommand,
  EC2Client,
  EC2ServiceException,
} from '@aws-sdk/client-ec2'
import { TRPCError } from '@trpc/server'

import type { EC2Instance, EC2Key, EC2Query, Paginate } from 'src/schema'
import { transformEC2Result } from 'src/schema'
import { EC2_LIST_LIMIT, IsProductionEnv } from 'src/utils/constants'
import { fakeDescribeInstances } from 'src/utils/fake'

const client = new EC2Client({
  region: process.env.REGION,
})

// Notes:
// 1. NextToken is The token to include in another request to get the next page of items. This value is null when there are no more items to return.
// 2. If you do not specify instance IDs or filters, the output includes information for all instances

export async function getEC2InstancesCount(): Promise<number> {
  // probably not the best implementation. I added it to use it for the frontend table total row count
  const { instances } = await describeInstances({})
  return instances.length
}

export async function getEC2Instance(key: EC2Key): Promise<EC2Instance> {
  const params: DescribeInstancesCommandInput = {
    InstanceIds: [key.id],
    MaxResults: 1,
  }
  const { instances } = await describeInstances(params)
  const [instance] = instances
  if (!instance) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `Requested instance with id: ${key.id} doesn't exist`,
    })
  }
  return transformEC2Result(instance)
}

export async function listEC2Instances(
  query: EC2Query,
  page: Paginate
): Promise<{ instances: EC2Instance[]; nextToken: string | null }> {
  const params: DescribeInstancesCommandInput = {
    // Can use query for filtering
    // Filters: [
    //   { Name: 'instance-state-name', Values: ['running'] },
    // ],
    MaxResults: page.size ?? EC2_LIST_LIMIT,
    NextToken: page.nextToken,
  }
  const { instances, nextToken } = await describeInstances(params)
  return { instances: instances.map(transformEC2Result), nextToken }
}

async function describeInstances(
  params: DescribeInstancesCommandInput
): Promise<{ instances: Instance[]; nextToken: string | null }> {
  if (!IsProductionEnv) {
    return fakeDescribeInstances(params)
  }

  const instances: Instance[] = []

  try {
    const command = new DescribeInstancesCommand(params)
    const res = await client.send(command)

    if (res.Reservations) {
      res.Reservations.forEach((reservation) => {
        if (reservation.Instances) {
          reservation.Instances.forEach((instance) => {
            console.log(
              `Instance ID: ${instance.InstanceId}, State: ${instance.State?.Name}`
            )
            instances.push(instance)
          })
        }
      })
    }
    const nextToken = res.NextToken as string | null // this shouldn't be undefined
    return { instances, nextToken }
  } catch (error) {
    handleEC2Error(error)
  }

  return { instances: [], nextToken: null }
}

function handleEC2Error(error: unknown) {
  if (error instanceof EC2ServiceException) {
    console.error('EC2 Error:', error)
    return error.name
  }
  console.error(error)
  return 'Unknown Error'
}
