const allowedOrigins = [
  'https://card-net.shane-b.workers.dev',
  'http://localhost:3000',
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
      const action = request.headers.get('Cn-action');
      switch (action) {
        case 'getPosts': {
          return await getPosts(request);
        }
        case 'postContent': {
          return await postContent(request);
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

// async function getRecentPosts(request) {
//   let valKV = await CN_KV_SPACE.get('hello')

//   return new Response(valKV, {
//     headers: {
//       'Content-type': 'application/json',
//       ...corsHeaders(checkOrigin(request)),
//     },
//   })
// }

async function getPosts(request) {
  const postJSON = await request.json()
  const quantity = parseInt(postJSON.quantity)
  let recentID = parseInt(postJSON.recentID)
  // 0 indicates to fetch most recent posts
  if(recentID == 0) recentID = parseInt(await CN_KV_SPACE.get('postCount'));

  let postOutput = {}
  let postArray = []
  for (let i = recentID; i > recentID - quantity; i--) {
    if(i < 1) break;
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
  let postCount = parseInt(await CN_KV_SPACE.get('postCount'));
  let countString = (postCount + 1).toString();
  await CN_KV_SPACE.put('postCount', countString);
  postJSON.id = countString;
  await CN_KV_SPACE.put(countString, JSON.stringify(postJSON));
  console.log(JSON.stringify(postJSON));
  return new Response('CONTENT ADDED', {
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
