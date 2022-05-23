import { videos } from './videos'

const NoWebm = new Set(['TelegramBot (like TwitterBot)'])

export const loaders: Record<string, (req: Request) => Promise<Response>> = {
  original: async () => {
    const video = await MY_BUCKET.get(videos.original)
    return new Response(video?.body, {
      headers: {
        'Content-Type': 'video/mp4',
        'Condent-Length': '4451123',
      },
    })
  },
  game_over: async (request: Request) => {
    const ua = request.headers.get('User-Agent')
    if (ua && NoWebm.has(ua)) {
      const video = await MY_BUCKET.get(videos.game_over_mp4)
      return new Response(video?.body, {
        headers: {
          'Content-Type': 'video/mp4',
        },
      })
    } else {
      const video = await MY_BUCKET.get(videos.game_over)
      return new Response(video?.body, {
        headers: {
          'Content-Type': 'video/webm',
        },
      })
    }
  },
  all_clear: async (request: Request) => {
    const ua = request.headers.get('User-Agent')
    if (ua && NoWebm.has(ua)) {
      const video = await MY_BUCKET.get(videos.all_clear_mp4)
      return new Response(video?.body, {
        headers: {
          'Content-Type': 'video/mp4',
        },
      })
    } else {
      const video = await MY_BUCKET.get(videos.all_clear)
      return new Response(video?.body, {
        headers: {
          'Content-Type': 'video/webm',
        },
      })
    }
  },
}
