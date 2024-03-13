import { defineFunction } from "@aws-amplify/backend";

export const listGroups = defineFunction({
  entry: './handler.ts',
  name: "listGroups"
})