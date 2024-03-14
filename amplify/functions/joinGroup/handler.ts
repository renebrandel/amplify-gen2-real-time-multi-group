import { CognitoIdentityProviderClient, AdminAddUserToGroupCommand } from '@aws-sdk/client-cognito-identity-provider'
import type { AppSyncIdentityCognito } from 'aws-lambda';
import type { Schema } from '../../data/resource';

export const handler: Schema["joinGroup"]["functionHandler"] = async (event) => {
  const client = new CognitoIdentityProviderClient()

  const groupName = event.arguments.name
  
  const addUserParams = {
    GroupName: groupName,
    UserPoolId: process.env.amplifyAuth_USERPOOL_ID,
    Username: (event.identity as AppSyncIdentityCognito).sub
  }

  await client.send(new AdminAddUserToGroupCommand(addUserParams))

  return true
};