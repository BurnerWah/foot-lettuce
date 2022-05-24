import { videos } from './videos'

const NoWebm = new Set(['TelegramBot (like TwitterBot)'])

/**
 * It takes two videos, one in webm format and one in mp4 format, and returns a function that takes a
 * request and returns a response
 * @param {videos} webm - videos
 * @param {videos} mp4 - videos
 * @returns A function that returns a promise that resolves to a response.
 */
function WebmHandlerGen(
  webm: videos,
  mp4: videos,
): (request: Request) => Promise<Response> {
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
  game_over: WebmHandlerGen(videos.game_over, videos.game_over_mp4),
  all_clear: WebmHandlerGen(videos.all_clear, videos.all_clear_mp4),
}
