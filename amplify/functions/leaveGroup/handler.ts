import { CognitoIdentityProviderClient, AdminRemoveUserFromGroupCommand } from '@aws-sdk/client-cognito-identity-provider'
import type { AppSyncIdentityCognito } from 'aws-lambda';
import { Schema } from '../../data/resource';

export const handler: Schema["leaveGroup"]["functionHandler"] = async (event) => {
  const client = new CognitoIdentityProviderClient()

  const groupName = event.arguments.name
  
  await client.send(new AdminRemoveUserFromGroupCommand({
    GroupName: groupName,
    UserPoolId: process.env.amplifyAuth_USERPOOL_ID,
    Username: (event.identity as AppSyncIdentityCognito).sub,
  }))

  return true
};