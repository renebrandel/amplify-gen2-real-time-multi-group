import type { Schema } from '../amplify/data/resource'

export function Post({ tweet }: { tweet: Schema["Tweet"] }) {
  return <div
  style={{
    flexDirection: 'column',
    padding: 8,
    border: "1px solid black",
    borderRadius: 8,
    maxWidth: 300,
  }}>
    <div style={{flexWrap: 'wrap'}}>
      <div style={{background: 'lightgreen'}}>#{tweet.community}</div>
      <i>{new Date(tweet.createdAt).toLocaleString()}</i>
    </div>
    {tweet.content}
  </div>
}