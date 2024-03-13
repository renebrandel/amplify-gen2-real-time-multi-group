import { defineAuth } from '@aws-amplify/backend';
import { postConfirmationTrigger } from '../functions/postConfirmationTrigger/resource';
import { createAndJoinGroup } from '../functions/createAndJoinGroup/resource';
import { joinGroup } from '../functions/joinGroup/resource';
import { leaveGroup } from '../functions/leaveGroup/resource';
import { listGroups } from '../functions/listGroups/resource';

/**
 * Define and configure your auth resource
 * When used alongside data, it is automatically configured as an auth provider for data
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    // add social providers
    // externalProviders: {
    /**
     * first, create your secrets using `amplify sandbox secret`
     * then, import `secret` from `@aws-amplify/backend`
     * @see https://docs.amplify.aws/gen2/deploy-and-host/sandbox-environments/features/#setting-secrets
     */
    // loginWithAmazon: {
    //   clientId: secret('LOGINWITHAMAZON_CLIENT_ID'),
    //   clientSecret: secret('LOGINWITHAMAZON_CLIENT_SECRET'),
    // }
    // configure callback and logout URLs
    // callbackUrls: ['http://localhost:3000'],
    // logoutUrls: ['http://localhost:3000'],
    // },
  },
  triggers: {
    postConfirmation: postConfirmationTrigger
  },
  groups: ['Everyone'],
  access: allow => [
    allow.resource(postConfirmationTrigger).to(['addUserToGroup']),
    allow.resource(createAndJoinGroup).to(['addUserToGroup']),
    allow.resource(joinGroup).to(['addUserToGroup']),
    allow.resource(leaveGroup).to(['manageGroupMembership']),
    allow.resource(listGroups).to(['listGroupsForUser'])
  ]
});
