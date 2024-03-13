import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { createAndJoinGroup } from './functions/createAndJoinGroup/resource';
import { CfnRolePolicy } from 'aws-cdk-lib/aws-iam';
import { Stack } from 'aws-cdk-lib';
import { listGroups } from './functions/listGroups/resource';

const backend = defineBackend({
  auth,
  data,
  listGroups,
  createAndJoinGroup
});

// We need to still manually add these policies. All of this CDK code would go away when we ship "manageGroups" access on auth
new CfnRolePolicy(Stack.of(backend.auth.resources.userPool), "ListGroupRolePolicy", {
  policyName: "GrantAccessToListGroups",
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  roleName: backend.listGroups.resources.lambda.role?.roleName!,
  policyDocument: {
    "Version": "2012-10-17",
    "Statement": {
      "Effect": "Allow",
      "Action": "cognito-idp:ListGroups",
      "Resource": backend.auth.resources.userPool.userPoolArn!
    }
  }
})
new CfnRolePolicy(Stack.of(backend.auth.resources.userPool), "CreateAndJoinRolePolicy", {
  policyName: "GrantAccessToCreateAndJoins",
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  roleName: backend.createAndJoinGroup.resources.lambda.role?.roleName!,
  policyDocument: {
    "Version": "2012-10-17",
    "Statement": {
      "Effect": "Allow",
      "Action": ["cognito-idp:ListGroups", "cognito-idp:CreateGroup"],
      "Resource": backend.auth.resources.userPool.userPoolArn!
    }
  }
})