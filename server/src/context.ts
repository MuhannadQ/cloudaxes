import type { APIGatewayProxyEventV2 } from 'aws-lambda'
import type { CreateAWSLambdaContextOptions } from '@trpc/server/adapters/aws-lambda'

export interface ISession {
  user: {
    id: string
  }
}

export type Context = { session: ISession | null }

// created for each request
export const createContext = async ({
  event,
  context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>): Promise<Context> => {
  return {
    session: fakeSession,
  }
}
interface CreateContextOptions {
  session: ISession | null
}

export async function createContextInner(_opts: CreateContextOptions) {
  return _opts
}

const fakeSession = {
  user: {
    id: '123123',
  },
}
