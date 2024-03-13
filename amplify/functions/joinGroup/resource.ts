import { defineFunction } from "@aws-amplify/backend";

export const joinGroup = defineFunction({
  entry: './handler.ts',
  name: 'joinGroup',
})