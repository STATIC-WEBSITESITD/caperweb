import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const TRACKING_API_URL = 'https://xpresion.caperindia.com/api/v1/Tracking/Tracking'
const TRACKING_USER_ID = 'API'
const TRACKING_PASSWORD = 'Api@70292'
const MAX_AWB = 10

function parseAwbList(raw) {
  if (!raw) return []
  return [
    ...new Set(
      String(raw)
        .split(/[\s,]+/)
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ]
}

async function fetchTracking(awbNo) {
  const response = await fetch(TRACKING_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      AWBNo: awbNo,
      UserID: TRACKING_USER_ID,
      Password: TRACKING_PASSWORD,
    }),
  })

  if (!response.ok) {
    return {
      awb: awbNo,
      success: false,
      message: 'Unable to reach tracking service',
      tracking: null,
      events: [],
    }
  }

  const decoded = await response.json()
  const resp = decoded?.Response
  const isSuccess =
    resp &&
    String(resp.ErrorCode) === '0' &&
    Array.isArray(resp.Tracking) &&
    resp.Tracking.length > 0

  if (isSuccess) {
    return {
      awb: awbNo,
      success: true,
      message: resp.ErrorDisc || 'Success',
      tracking: resp.Tracking[0] || null,
      events: resp.Events || [],
    }
  }

  return {
    awb: awbNo,
    success: false,
    message: resp?.ErrorDisc || 'No tracking data found',
    tracking: null,
    events: [],
  }
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8')
        resolve(raw ? JSON.parse(raw) : {})
      } catch (error) {
        reject(error)
      }
    })
    req.on('error', reject)
  })
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

function trackingDevApiPlugin() {
  return {
    name: 'tracking-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/tracking')) {
          next()
          return
        }

        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }

        if (req.method !== 'POST') {
          sendJson(res, 405, { success: false, message: 'Method not allowed' })
          return
        }

        try {
          const body = await readJsonBody(req)
          const awbList = parseAwbList(body.AWBNo)

          if (!awbList.length) {
            sendJson(res, 400, {
              success: false,
              message: 'Please enter at least one AWB number',
            })
            return
          }

          if (awbList.length > MAX_AWB) {
            sendJson(res, 400, {
              success: false,
              message: 'Up to 10 AWB numbers are allowed at a time',
            })
            return
          }

          const results = []
          for (const awbNo of awbList) {
            try {
              results.push(await fetchTracking(awbNo))
            } catch {
              results.push({
                awb: awbNo,
                success: false,
                message: 'Unable to reach tracking service',
                tracking: null,
                events: [],
              })
            }
          }

          sendJson(res, 200, { success: true, results })
        } catch (error) {
          console.error('Tracking dev API error:', error)
          sendJson(res, 500, {
            success: false,
            message: 'Unable to fetch tracking details. Please try again.',
          })
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), trackingDevApiPlugin()],

  server: {
    proxy: {
      '/api/contact': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/api/careers': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },

  build: {
    cssMinify: false,
  },
})
