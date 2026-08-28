const POD_IMAGE_API_URL =
  process.env.POD_IMAGE_API_URL ||
  'https://xpresion.caperindia.com/api/v1/Tracking/PODImage';
const TRACKING_USER_ID = process.env.TRACKING_USER_ID || 'API';
const TRACKING_PASSWORD = process.env.TRACKING_PASSWORD || 'Api@70292';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const awb = String(req.query?.awb || '').trim();
  if (!awb) {
    return res.status(400).json({ message: 'AWB number is required' });
  }

  try {
    const response = await fetch(POD_IMAGE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        AWBNo: awb,
        UserID: TRACKING_USER_ID,
        Password: TRACKING_PASSWORD,
      }),
    });

    const data = await response.json();
    const resp = data?.Response;

    if (!resp || String(resp.ErrorCode) !== '0' || !resp.PODImage) {
      return res.status(404).json({ message: 'POD not available' });
    }

    const imageBuffer = Buffer.from(resp.PODImage, 'base64');
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'private, max-age=3600');
    return res.status(200).send(imageBuffer);
  } catch (error) {
    console.error('POD image API error:', error);
    return res.status(500).json({ message: 'Unable to fetch POD image' });
  }
}
