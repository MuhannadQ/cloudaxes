import { z } from 'zod'
import type { Instance } from '@aws-sdk/client-ec2'
import { zString } from './shared'

export const EC2InstanceSchema = z.object({
  id: zString,
  type: zString,
  name: zString,
  state: zString,
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

/*
Instance: 
 'InstanceId'
 'InstanceType'
 'State'
 'PublicIpAddress'
 'PrivateIpAddress'
 'KeyName'
 'Tags'
*/

export function transformEC2Result(instance: Instance): EC2Instance {
  return {
    id: instance.InstanceId!,
    type: instance.InstanceType!,
    name: instance.KeyName!,
    state: instance.State!.Name!,
  }
}
