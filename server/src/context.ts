import type { APIGatewayProxyEventV2 } from 'aws-lambda'
import type { CreateAWSLambdaContextOptions } from '@trpc/server/adapters/aws-lambda'

export interface ISession {
  user: {
    id: string
    authorized: boolean
  }
}

export type Context = { session: ISession | null }

// created for each request
export const createContext = async ({
  event,
  context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>): Promise<Context> => {
  return {
    session: mockAuthorizedSession,
  }
}

interface CreateContextOptions {
  session: ISession | null
}

export async function createContextInner(_opts: CreateContextOptions) {
  return _opts
}

export const mockAuthorizedSession = {
  user: {
    id: 'user_123',
    authorized: true,
  },
}

export const mockUnauthorizedSession = {
  user: {
    id: 'user_123',
    authorized: false,
  },
}
