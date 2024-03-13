import { CognitoIdentityProviderClient, AdminRemoveUserFromGroupCommand } from '@aws-sdk/client-cognito-identity-provider'
import { env } from '@env/leaveGroup'
import type { AppSyncIdentityCognito, AppSyncResolverHandler } from 'aws-lambda';

export const handler: AppSyncResolverHandler<{ name: string }, boolean> = async (event) => {
  const client = new CognitoIdentityProviderClient()

  const groupName = event.arguments.name
  
  await client.send(new AdminRemoveUserFromGroupCommand({
    GroupName: groupName,
    UserPoolId: env.amplifyAuth_USERPOOL_ID,
    Username: (event.identity as AppSyncIdentityCognito).sub,
  }))

  return true
};