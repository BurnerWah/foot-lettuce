import { Router } from 'itty-router'
import { json } from 'itty-router-extras'
import { known_routes } from './known_routes'
import { loaders } from './loaders'

const router = Router()

router.get('/game-over', loaders.game_over)
router.get('/nothing', loaders.game_over)
router.get('/all-clear', loaders.all_clear)
router.get('/this-is-lettuce', loaders.all_clear)
router.get('/burger-king-lettuce', loaders.all_clear)
router.get('/original', loaders.original)
router.get('/list', () => json(known_routes))
router.get('/', loaders.original)
router.all('*', loaders.original)

/**
 * Handles incoming requests
 * @param {Request} request - The incoming request.
 * @returns A Promise that resolves to a Response object.
 */
export async function handleRequest(request: Request): Promise<Response> {
  return router.handle(request)
}
