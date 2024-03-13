import { defineFunction } from "@aws-amplify/backend";

export const postConfirmationTrigger = defineFunction({
  entry: './handler.ts',
  name: "postConfirmationTrigger",
  environment: {
    GROUP: 'Everyone'
  },
})