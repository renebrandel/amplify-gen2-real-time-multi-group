import { defineFunction } from "@aws-amplify/backend";

export const postConfirmationTrigger = defineFunction({
  entry: './handler.ts',
  environment: {
    GROUP: 'Everyone'
  },
})