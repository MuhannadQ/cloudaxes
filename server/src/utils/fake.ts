import { faker } from '@faker-js/faker'
import type { Instance } from '@aws-sdk/client-ec2'
import { InstanceStateName, _InstanceType } from '@aws-sdk/client-ec2'

const instanceTypes = Object.values(_InstanceType)
const instanceStateNames = Object.values(InstanceStateName)

function createRandomEC2Instance(): Instance {
  return {
    InstanceId: faker.string.uuid(),
    KeyName: faker.internet.userName(),
    InstanceType: faker.helpers.arrayElement(instanceTypes),
    State: {
      Name: faker.helpers.arrayElement(instanceStateNames),
    },
  }
}

export const fakeEC2Instances = (count: number) =>
  faker.helpers.multiple(createRandomEC2Instance, { count })
