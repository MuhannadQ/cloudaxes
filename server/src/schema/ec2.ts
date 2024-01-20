import type { Instance, InstanceStateName, _InstanceType } from '@aws-sdk/client-ec2'
import { z } from 'zod'

import { zString } from './shared'

export const EC2InstanceSchema = z.object({
  id: zString,
  type: zString,
  name: zString,
  state: zString,
  az: zString,
  publicIP: z.optional(zString),
  privateIP: zString,
})

export const EC2KeySchema = EC2InstanceSchema.pick({
  id: true,
})

export const EC2QuerySchema = EC2InstanceSchema.pick({
  type: true,
  name: true,
  state: true,
}).partial()

export type EC2Instance = z.infer<typeof EC2InstanceSchema>
export type EC2Key = z.infer<typeof EC2KeySchema>
export type EC2Query = z.infer<typeof EC2QuerySchema>

// Using this instead of the Instance type from AWS because it has better assumptions about field values
export type AWSEC2Instance = {
  InstanceId: string
  InstanceType: _InstanceType
  State: { Name: InstanceStateName }
  KeyName: string
  Placement: { AvailabilityZone: string }
  PublicIpAddress: string | undefined
  PrivateIpAddress: string
  Tags: string[]
}

export function transformEC2Result(instance: Instance): EC2Instance {
  const ins = instance as AWSEC2Instance
  return {
    id: ins.InstanceId,
    type: ins.InstanceType,
    state: ins.State.Name,
    name: ins.KeyName,
    az: ins.Placement.AvailabilityZone,
    publicIP: ins.PublicIpAddress,
    privateIP: ins.PrivateIpAddress,
  }
}
