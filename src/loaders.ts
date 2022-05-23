import { videos } from './videos'

const NoWebm = new Set(['TelegramBot (like TwitterBot)'])

function WebmHandlerGen({ webm, mp4 }: { webm: videos; mp4: videos }) {
  return async function (request: Request) {
    const ua = request.headers.get('User-Agent')
    if (ua && NoWebm.has(ua)) {
      const video = await MY_BUCKET.get(mp4)
      return new Response(video?.body, {
        headers: {
          'Content-Type': 'video/mp4',
          'Cache-Control': 'public, max-age=2629800',
        },
      })
    } else {
      const video = await MY_BUCKET.get(webm)
      return new Response(video?.body, {
        headers: {
          'Content-Type': 'video/webm',
          'Cache-Control': 'public, max-age=2629800',
        },
      })
    }
  }
}

export const loaders: Record<string, (req: Request) => Promise<Response>> = {
  original: async () => {
    const video = await MY_BUCKET.get(videos.original)
    return new Response(video?.body, {
      headers: {
        'Content-Type': 'video/mp4',
        'Cache-Control': 'public, max-age=2629800',
      },
    })
  },
  game_over: WebmHandlerGen({
    webm: videos.game_over,
    mp4: videos.game_over_mp4,
  }),
  all_clear: WebmHandlerGen({
    webm: videos.all_clear,
    mp4: videos.all_clear_mp4,
  }),
}
