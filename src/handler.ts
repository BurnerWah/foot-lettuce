import { Router } from 'itty-router'
import { loaders } from './loaders'

const router = Router()

router.get('/game-over', loaders.game_over)
router.get('/nothing', loaders.game_over)
router.get('/all-clear', loaders.all_clear)
router.get('/this-is-lettuce', loaders.all_clear)
router.get('/burger-king-lettuce', loaders.all_clear)
router.get('/original', loaders.original)
router.get('/', loaders.original)
router.all('*', loaders.original)

export async function handleRequest(request: Request): Promise<Response> {
  return router.handle(request)
}
