import { CognitoIdentityProviderClient, AdminAddUserToGroupCommand, GetGroupCommand, CreateGroupCommand } from '@aws-sdk/client-cognito-identity-provider'
import type { AppSyncIdentityCognito } from 'aws-lambda';
import type { Schema } from '../../data/resource';

export const handler: Schema["createAndJoinGroup"]["functionHandler"]= async (event) => {
  const client = new CognitoIdentityProviderClient()

  const groupName = event.arguments.name
  
  const addUserParams = {
    GroupName: groupName,
    UserPoolId: process.env.amplifyAuth_USERPOOL_ID,
    Username: (event.identity as AppSyncIdentityCognito).sub
  }

  try {
    await client.send(new GetGroupCommand({
      GroupName: groupName,
      UserPoolId: process.env.amplifyAuth_USERPOOL_ID,
    }))
  } catch(e) {
    await client.send(new CreateGroupCommand({
      GroupName: groupName,
      UserPoolId: process.env.amplifyAuth_USERPOOL_ID,
    })) 
  }

  await client.send(new AdminAddUserToGroupCommand(addUserParams))

  return true
};