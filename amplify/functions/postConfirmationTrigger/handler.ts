import { CognitoIdentityProviderClient, AdminAddUserToGroupCommand } from '@aws-sdk/client-cognito-identity-provider'
import type { PostConfirmationTriggerHandler  } from 'aws-lambda'

export const handler: PostConfirmationTriggerHandler = async (event) => {
  const cognitoIdentityClient = new CognitoIdentityProviderClient()
  
  const addUserParams = {
    GroupName: process.env.GROUP,
    UserPoolId: event.userPoolId,
    Username: event.userName
  }

  await cognitoIdentityClient.send(new AdminAddUserToGroupCommand(addUserParams))

  return event
};