import { CognitoIdentityProviderClient, AdminListGroupsForUserCommand, ListGroupsCommand } from '@aws-sdk/client-cognito-identity-provider'
import { env } from '@env/listGroupsLambda'

export const handler: AWSLambda.Handler = async (event) => {
  const client = new CognitoIdentityProviderClient()

  const allGroups = await client.send(new ListGroupsCommand({
    UserPoolId: env.amplifyAuth_USERPOOL_ID,
  }))
  
  const myGroups = await client.send(new AdminListGroupsForUserCommand({
    UserPoolId: env.amplifyAuth_USERPOOL_ID,
    Username: (event.identity as AWSLambda.AppSyncIdentityCognito).sub,
  }))

  return allGroups.Groups?.map(group => ({
    name: group.GroupName,
    joined: myGroups.Groups?.some(g => g.GroupName === group.GroupName) ?? false,
  })) ?? []
}