import { defineFunction } from "@aws-amplify/backend";

export const leaveGroup = defineFunction({
  entry: './handler.ts',
  name: 'leaveGroup'
})