export async function handleRequest(request: Request): Promise<Response> {
  const response = await fetch('https://files.catbox.moe/7acdh6.mp4', {
    cf: { cacheEverything: true },
  })
  return response
}
