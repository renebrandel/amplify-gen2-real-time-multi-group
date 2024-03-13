import { defineFunction } from "@aws-amplify/backend";

export const createAndJoinGroup = defineFunction({
  entry: './handler.ts',
  name: 'createAndJoinGroupFunction',
})