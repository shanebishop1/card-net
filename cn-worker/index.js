const allowedOrigins = [
  'https://card-net.pages.dev',
  'http://localhost:3000',
  'http://localhost:5000',
]

const corsHeaders = origin => ({
  'Access-Control-Allow-Origin': origin,
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  'Access-Control-Max-Age': '86400',
  'Access-Control-Allow-Headers': '*',
})

const checkOrigin = request => {
  const origin = request.headers.get('Origin')
  const accessibleOrigin = allowedOrigins.find(allowedOrigin =>
    allowedOrigin.includes(origin),
  )
  return accessibleOrigin ? accessibleOrigin : allowedOrigins[0]
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  switch (request.method) {
    case 'GET': {
      return await getRecentPosts(request)
    }
    case 'POST': {
      const action = request.headers.get('Cn-action')
      switch (action) {
        case 'getPosts': {
          return await getPosts(request)
        }
        case 'postContent': {
          return await postContent(request)
        }
        case 'addVote': {
          return await addVote(request)
        }
      }
    }
    case 'OPTIONS': {
      return await handleOptions(request)
    }
    default: {
      console.log('Not a GET, POST, or OPTIONS request')
      return new Response('Bad Request')
    }
  }
}

async function getPosts(request) {
  const postJSON = await request.json()
  const quantity = parseInt(postJSON.quantity)
  let recentID = postJSON.recentID
  // 0 indicates to fetch most recent posts
  if (recentID == 0) recentID = parseInt(await CN_KV_SPACE.get('postCount'))

  let postOutput = {}
  let postArray = []
  for (let i = recentID; i > recentID - quantity; i--) {
    if (i < 1) break
    postArray.push(await CN_KV_SPACE.get(i))
  }
  postOutput.posts = postArray
  return new Response(JSON.stringify(postOutput), {
    headers: {
      'Content-type': 'application/json',
      ...corsHeaders(checkOrigin(request)),
    },
  })
}

async function postContent(request) {
  let postJSON = await request.json()
  let postCount = parseInt(await CN_KV_SPACE.get('postCount'))
  let count = postCount + 1
  await CN_KV_SPACE.put('postCount', count)
  postJSON.id = count
  await CN_KV_SPACE.put(count, JSON.stringify(postJSON))
  console.log(JSON.stringify(postJSON))
  return new Response('CONTENT ADDED', {
    headers: {
      'Content-type': 'application/json',
      ...corsHeaders(checkOrigin(request)),
    },
  })
}

async function addVote(request) {
  let inData = await request.json()
  let id = inData.id
  let voteType = inData.voteType
  let post = JSON.parse(await CN_KV_SPACE.get(id))
  if (voteType == 'up') post.score = post.score + 1
  if (voteType == 'down') post.score = post.score - 1
  console.log('post' + JSON.stringify(post))
  await CN_KV_SPACE.put(id, JSON.stringify(post))

  return new Response('VOTE RECEIVED', {
    headers: {
      'Content-type': 'application/json',
      ...corsHeaders(checkOrigin(request)),
    },
  })
}

async function handleOptions(request) {
  return new Response('OK', {
    headers: corsHeaders(checkOrigin(request)),
  })
}

async function wipePosts(startID, endID) {
  while (startID <= endID) {
    await CN_KV_SPACE.delete(startID)
    startID++
  }
}
