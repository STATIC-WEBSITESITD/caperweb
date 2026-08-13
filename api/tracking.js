const TRACKING_API_URL =
  process.env.TRACKING_API_URL ||
  'https://xpresion.caperindia.com/api/v1/Tracking/Tracking';
const TRACKING_USER_ID = process.env.TRACKING_USER_ID || 'API';
const TRACKING_PASSWORD = process.env.TRACKING_PASSWORD || 'Api@70292';
const MAX_AWB = 10;

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function parseAwbList(raw) {
  if (!raw) return [];
  return [
    ...new Set(
      String(raw)
        .split(/[\s,]+/)
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ];
}

function getRequestBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
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
  });

  if (!response.ok) {
    return {
      awb: awbNo,
      success: false,
      message: 'Unable to reach tracking service',
      tracking: null,
      events: [],
    };
  }

  const decoded = await response.json();
  const resp = decoded && decoded.Response;
  const isSuccess =
    resp &&
    String(resp.ErrorCode) === '0' &&
    Array.isArray(resp.Tracking) &&
    resp.Tracking.length > 0;

  if (isSuccess) {
    return {
      awb: awbNo,
      success: true,
      message: resp.ErrorDisc || 'Success',
      tracking: resp.Tracking[0] || null,
      events: resp.Events || [],
    };
  }

  return {
    awb: awbNo,
    success: false,
    message: (resp && resp.ErrorDisc) || 'No tracking data found',
    tracking: null,
    events: [],
  };
}

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  const body = getRequestBody(req);
  const awbList = parseAwbList(body.AWBNo);

  if (!awbList.length) {
    return res.status(400).json({
      success: false,
      message: 'Please enter at least one AWB number',
    });
  }

  if (awbList.length > MAX_AWB) {
    return res.status(400).json({
      success: false,
      message: 'Up to 10 AWB numbers are allowed at a time',
    });
  }

  try {
    const results = [];
    for (const awbNo of awbList) {
      try {
        results.push(await fetchTracking(awbNo));
      } catch (error) {
        console.error('Tracking fetch failed for', awbNo, error);
        results.push({
          awb: awbNo,
          success: false,
          message: 'Unable to reach tracking service',
          tracking: null,
          events: [],
        });
      }
    }

    return res.status(200).json({
      success: true,
      results,
    });
  } catch (error) {
    console.error('Tracking API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch tracking details. Please try again.',
    });
  }
}
