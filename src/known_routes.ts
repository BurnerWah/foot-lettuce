interface RouteAlias {
  equivalent: string
  aliases: string[]
}

interface KnownRoutes {
  main: string[]
  aliases: RouteAlias[]
}

function routeMapper(path: string) {
  return `https://footlettuce.xyz/${path}`
}

export const known_routes: KnownRoutes = {
  main: ['', 'original', 'game-over', 'all-clear'].map(routeMapper),
  aliases: [
    {
      equivalent: routeMapper('game-over'),
      aliases: ['nothing'].map(routeMapper),
    },
    {
      equivalent: routeMapper('all-clear'),
      aliases: ['this-is-lettuce', 'burger-king-lettuce'].map(routeMapper),
    },
  ],
}
