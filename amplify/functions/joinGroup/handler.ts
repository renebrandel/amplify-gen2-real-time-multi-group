import { CognitoIdentityProviderClient, AdminAddUserToGroupCommand } from '@aws-sdk/client-cognito-identity-provider'
import { env } from '@env/joinGroup'
import type { AppSyncIdentityCognito, AppSyncResolverHandler } from 'aws-lambda';

export const handler: AppSyncResolverHandler<{ name: string }, boolean> = async (event) => {
  const client = new CognitoIdentityProviderClient()

  const groupName = event.arguments.name
  
  const addUserParams = {
    GroupName: groupName,
    UserPoolId: env.amplifyAuth_USERPOOL_ID,
    Username: (event.identity as AppSyncIdentityCognito).sub
  }

  await client.send(new AdminAddUserToGroupCommand(addUserParams))

  return true
};