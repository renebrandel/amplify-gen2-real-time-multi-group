import { CognitoIdentityProviderClient, AdminAddUserToGroupCommand, GetGroupCommand, CreateGroupCommand } from '@aws-sdk/client-cognito-identity-provider'
import { env } from '@env/createAndJoinGroup'
import type { AppSyncIdentityCognito, AppSyncResolverHandler } from 'aws-lambda';

export const handler: AppSyncResolverHandler<{ name: string }, boolean> = async (event) => {
  const client = new CognitoIdentityProviderClient()

  const groupName = event.arguments.name
  
  const addUserParams = {
    GroupName: groupName,
    UserPoolId: env.amplifyAuth_USERPOOL_ID,
    Username: (event.identity as AppSyncIdentityCognito).sub
  }

  try {
    await client.send(new GetGroupCommand({
      GroupName: groupName,
      UserPoolId: env.amplifyAuth_USERPOOL_ID,
    }))
  } catch(e) {
    await client.send(new CreateGroupCommand({
      GroupName: groupName,
      UserPoolId: env.amplifyAuth_USERPOOL_ID,
    })) 
  }

  await client.send(new AdminAddUserToGroupCommand(addUserParams))

  return true
};