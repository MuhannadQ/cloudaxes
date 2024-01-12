import type {
  DescribeInstancesRequest,
  Instance,
  DescribeInstancesCommandInput,
} from '@aws-sdk/client-ec2'
import { DescribeInstancesCommand, EC2Client } from '@aws-sdk/client-ec2'
import type { EC2Instance, EC2Key, EC2Query } from 'src/schema'
import { transformEC2Result } from 'src/schema'
import { fakeEC2Instances } from 'src/utils/fake'

const LIST_LIMIT = 20

const client = new EC2Client({
  region: process.env.REGION,
})

export async function getEC2Instance(key: EC2Key): Promise<EC2Instance> {
  const [instance] = fakeEC2Instances(1)
  return transformEC2Result(instance)
}

export async function listEC2Instances(
  query: EC2Query,
  page?: number
): Promise<EC2Instance[]> {
  const params: DescribeInstancesCommandInput = {}
  const instances = await describeInstances(params)
  return instances.map(transformEC2Result)
}

async function describeInstances(params: DescribeInstancesRequest): Promise<Instance[]> {
  if (process.env.NODE_ENV == 'test') {
    return fakeEC2Instances(5)
  }

  const instances: Instance[] = []

  try {
    const command = new DescribeInstancesCommand(params)
    const response = await client.send(command)

    console.log(response)

    if (response.Reservations) {
      response.Reservations.forEach((reservation) => {
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
  } catch (error) {
    console.error('Error:', (error as Error).message)
  }
  return instances
}
