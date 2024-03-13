import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { createAndJoinGroup } from '../functions/createAndJoinGroup/resource';
import { leaveGroup } from '../functions/leaveGroup/resource';
import { joinGroup } from '../functions/joinGroup/resource';
import { listGroups } from '../functions/listGroups/resource';

const schema = a.schema({
  Tweet: a.model({
    content: a.string().required(),
    community: a.string().required()
  }).authorization([
    a.allow.owner().to(["create", "delete"]),
    a.allow.groupDefinedIn("community").to(['read'])
  ]),

  Group: a.customType({
    name: a.string().required(),
    joined: a.boolean().required()
  }),

  createAndJoinGroup: a.mutation()
    .arguments({
      name: a.string().required()
    })
    .returns(a.boolean())
    .authorization([a.allow.private()])
    .function('createAndJoinGroup'),

  joinGroup: a.mutation()
    .arguments({
      name: a.string().required()
    })
    .returns(a.boolean())
    .authorization([a.allow.private()])
    .function('joinGroup'),

  listGroups: a.query()
    .arguments({test: a.boolean()})
    .returns(a.ref('Group').required().array().required())
    .authorization([a.allow.private()])
    .function('listGroups'),

  leaveGroup: a.mutation()
    .arguments({
      name: a.string().required()
    }).returns(a.boolean())
    .authorization([a.allow.private()])
    .function('leaveGroup'),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
  functions: {
    listGroups: listGroups,
    createAndJoinGroup: createAndJoinGroup,
    leaveGroup: leaveGroup,
    joinGroup: joinGroup
  }
});