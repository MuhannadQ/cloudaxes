import {
  CognitoIdentityProviderClient,
  CognitoIdentityProviderServiceException,
  InitiateAuthCommand,
  GlobalSignOutCommand,
  RespondToAuthChallengeCommand,
  InitiateAuthResponse,
  GlobalSignOutResponse,
  RespondToAuthChallengeResponse,
  ChallengeNameType,
  AuthenticationResultType,
  GetUserCommand,
  GetUserResponse,
} from '@aws-sdk/client-cognito-identity-provider'

const AWS_REGION = import.meta.env.VITE_AWS_REGION as string

// import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID

const AWS_COGNITO_USER_POOL_CLIENT_ID = import.meta.env
  .VITE_AWS_COGNITO_USER_POOL_CLIENT_ID as string

export type CognitoLoginRes = { AuthenticationResult?: AuthenticationResultType } | null
export type CognitoErr = string | null

type ChallengeData = {
  session: string
  params: { username: string }
}

class CognitoClient {
  private client: CognitoIdentityProviderClient
  private challenge: ChallengeData | undefined

  constructor() {
    this.client = new CognitoIdentityProviderClient({
      region: AWS_REGION,
    })
  }

  async authenticate(username: string, password: string) {
    let res: InitiateAuthResponse | null = null
    let err: string | null = null

    const command = new InitiateAuthCommand({
      ClientId: AWS_COGNITO_USER_POOL_CLIENT_ID,
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: { USERNAME: username, PASSWORD: password },
    })

    try {
      res = await this.client.send(command)
    } catch (error) {
      err = handleCognitoError(error)
    }

    if (res !== null && res.ChallengeName) {
      this.challenge = {
        session: res.Session as string,
        params: {
          username: res.ChallengeParameters?.USER_ID_FOR_SRP as string,
        },
      }
      res = null
    }

    return { res, err, challenge: this.challenge }
  }

  async respondToNewPasswordChallenge(newPassword: string) {
    if (!this.challenge)
      throw new Error(
        'Cannot call "respondToNewPasswordChallenge" when not in "challenge" state'
      )

    let res: RespondToAuthChallengeResponse | null = null
    let err: string | null = null
    const username = this.challenge.params.username

    const command = new RespondToAuthChallengeCommand({
      ClientId: AWS_COGNITO_USER_POOL_CLIENT_ID,
      ChallengeName: ChallengeNameType.NEW_PASSWORD_REQUIRED,
      ChallengeResponses: {
        USERNAME: username,
        NEW_PASSWORD: newPassword,
      },
      Session: this.challenge.session,
    })

    try {
      res = await this.client.send(command)
      this.challenge = undefined
    } catch (error) {
      err = handleCognitoError(error)
    }

    return { res, err, username }
  }

  async getUser(accessToken?: string) {
    const command = new GetUserCommand({
      AccessToken: accessToken,
    })

    let res: GetUserResponse | null = null
    let err: string | null = null

    try {
      res = await this.client.send(command)
    } catch (error) {
      err = handleCognitoError(error)
    }
    const user = res?.Username ? { username: res.Username } : null
    return { user, err }
  }

  async signOut(accessToken?: string) {
    const command = new GlobalSignOutCommand({
      AccessToken: accessToken,
    })

    let res: GlobalSignOutResponse | null = null
    let err: string | null = null

    try {
      res = await this.client.send(command)
    } catch (error) {
      err = handleCognitoError(error)
    }
    return { res, err }
  }
}

export const cognito = new CognitoClient()

// https://medium.com/@adi2308/aws-cognito-with-reactjs-for-authentication-c8916b873ccb

type SupportedCognitoExceptions =
  | 'NotAuthorizedException' // happens on login or when using expired token
  | 'UserNotFoundException'
  | 'InvalidParameterException'
  | 'InvalidPasswordException'

const CognitoErrorCodeToMessage: Record<string, string> = {
  NotAuthorizedException: 'Incorrect username or password',
  UserNotFoundException: 'User does not exist',
  InvalidParameterException: 'Invalid username or password',
  InvalidPasswordException:
    'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number',
} satisfies Record<SupportedCognitoExceptions, string>

export function getErrorMessage(err: CognitoErr) {
  return err
    ? CognitoErrorCodeToMessage[err] ?? 'Unrecognized error. Check logs.'
    : undefined
}

function handleCognitoError(error: unknown) {
  if (error instanceof CognitoIdentityProviderServiceException) {
    console.error('Cognito Error:', error)
    return error.name
  }
  console.error(error)
  return 'Unknown Error'
}
