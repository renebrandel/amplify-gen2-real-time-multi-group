import { useEffect, useState } from 'react'
import { generateClient } from 'aws-amplify/data'
import { Schema } from '../amplify/data/resource'
import { Post } from './Tweet'
import { CreatePanel } from './CreatePanel'
import { fetchAuthSession } from 'aws-amplify/auth'

const client = generateClient<Schema>()

type Group = {
  name: string,
  joined: boolean
}

function App() {
  const [groups, setGroups] = useState<Group[]>([])
  const [tweets, setTweets] = useState<Schema["Tweet"][]>([])

  const refreshGroups = async () => {
    const { data: groups } = await client.queries.listGroups({ test: true })
    await fetchAuthSession({ forceRefresh: true });
    setGroups(groups)
  }

  useEffect(() => { refreshGroups() }, [])

  useEffect(() => {
    const sub = client.models.Tweet.observeQuery().subscribe({
      next: (data) => {
        setTweets([...data.items])
      }
    })
    return () => sub.unsubscribe()
  }, [groups])

  return (
    <>
      My Groups:
      <ul>
        {groups.map(group => <li key={group.name}><button style={{
          backgroundColor: group.joined ? "lightgreen" : "pink"
        }} onClick={async () => {
          if (!group.joined) {
            await client.mutations.joinGroup({
              name: group.name
            })
          } else {
            await client.mutations.leaveGroup({
              name: group.name
            })
          }
          refreshGroups()
        }}>{group.name}</button></li>)}
      </ul>
      <hr />
      <button onClick={async () => {
        await client.mutations.createAndJoinGroup({
          name: window.prompt("Group name?") ?? "TestGroup"
        })
      }}>Create Group</button>
      <hr />
      <CreatePanel myGroups={groups.filter(g => g.joined).map(g => g.name)} />

      <hr />
      My tweets:
      <ul>
        {tweets.map(tweet => <Post key={tweet.id} tweet={tweet} />)}
      </ul>
    </>
  )
}

export default App
