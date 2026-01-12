import { AtpAgent } from '@atproto/api'

export const agent: AtpAgent = new AtpAgent({
  service: 'https://api.bsky.app'
});
