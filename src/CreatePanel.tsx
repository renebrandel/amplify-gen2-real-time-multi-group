import { useRef } from "react"
import { generateClient } from "aws-amplify/data"
import type { Schema } from "../amplify/data/resource"

const client = generateClient<Schema>()

export function CreatePanel({ myGroups }: { myGroups: string[] }) {
  const communityRef = useRef<HTMLSelectElement>(null)
  const tweetRef = useRef<HTMLInputElement>(null)

  return <>
    <h1>Create tweet</h1>
    <select ref={communityRef}>
      {myGroups.map(g => <option key={g} value={g}>{g}</option>)}
    </select>
    <input placeholder="Enter tweet here" ref={tweetRef}></input>
    <button onClick={async () => {
      if (!communityRef.current || !tweetRef.current) {
        return
      }
      await client.models.Tweet.create({
        community: communityRef.current?.value,
        content: tweetRef.current?.value,
      })
    }}>Tweet</button>
  </> 
}