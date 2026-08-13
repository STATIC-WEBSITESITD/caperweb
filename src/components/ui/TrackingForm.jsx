import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { aos } from '../../utils/aos'

const MAX_AWB = 10

function parseAwbNumbers(value) {
  return [
    ...new Set(
      value
        .split(/[\n,]+/)
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ]
}

function displayValue(value) {
  if (value === null || value === undefined || value === '' || value === 'No') {
    return '—'
  }
  return value
}

function ShipmentResult({ item, isOpen, onToggle }) {
  const t = item.tracking || {}
  const events = item.events || []
  const awb = t.AWBNo || item.awb
  const status = t.Status || ''

  return (
    <div className="tracking-shipment">
      <button
        type="button"
        className={`tracking-accordion__header${isOpen ? ' is-open' : ''}`}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>AWB: {awb}</span>
        <span>
          Status: {status}{' '}
          <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'}`} aria-hidden="true" />
        </span>
      </button>

      {isOpen && (
        <div className="tracking-accordion__body">
          <h3 className="text-center color-grey-900 mb-10">AWB: {awb}</h3>
          <div className="text-center mb-15">
            <span className="tracking-status-badge">{status}</span>
          </div>
          <div className="tracking-shipment-meta">
            <span>
              <strong>Origin:</strong> {displayValue(t.Origin)}
            </span>
            <span>
              <strong>Destination:</strong> {displayValue(t.Destination)}
            </span>
            <span>
              <strong>Service:</strong> {displayValue(t.ServiceName)}
            </span>
          </div>

          <div className="tracking-table-wrap">
            <table className="tracking-table">
              <thead>
                <tr>
                  <th>AWB No.</th>
                  <th>Booking Date</th>
                  <th>Shipper</th>
                  <th>Consignee</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Weight</th>
                  <th>Ref No.</th>
                  <th>Status</th>
                  <th>Delivery Date</th>
                  <th>Delivery Time</th>
                  <th>Receiver</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{displayValue(t.AWBNo)}</td>
                  <td>{displayValue(t.BookingDate1 || t.BookingDate)}</td>
                  <td>{displayValue(t.Shipper_Name)}</td>
                  <td>{displayValue(t.Consignee)}</td>
                  <td>{displayValue(t.Origin)}</td>
                  <td>{displayValue(t.Destination)}</td>
                  <td>{displayValue(t.Weight)}</td>
                  <td>{displayValue(t.RefNo)}</td>
                  <td>{displayValue(t.Status)}</td>
                  <td>{displayValue(t.DeliveryDate1 || t.DeliveryDate)}</td>
                  <td>{displayValue(t.DeliveryTime1 || t.DeliveryTime)}</td>
                  <td>{displayValue(t.ReceiverName)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {events.length > 0 && (
            <div className="tracking-table-wrap">
              <table className="tracking-table tracking-table--events">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr key={`${event.EventDate}-${event.EventTime}-${index}`}>
                      <td>{displayValue(event.EventDate1 || event.EventDate)}</td>
                      <td>{displayValue(event.EventTime1 || event.EventTime)}</td>
                      <td>{displayValue(event.Location)}</td>
                      <td>{displayValue(event.Status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function TrackingForm() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [awb, setAwb] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [results, setResults] = useState(null)
  const [openIndex, setOpenIndex] = useState(0)

  const trackShipments = async (awbValue) => {
    const awbList = parseAwbNumbers(awbValue)

    if (!awbList.length) {
      setError('Please enter at least one AWB number')
      setResults(null)
      return
    }

    if (awbList.length > MAX_AWB) {
      setError('Up to 10 AWB numbers are allowed at a time')
      setResults(null)
      return
    }

    setLoading(true)
    setError('')
    setResults(null)
    setOpenIndex(0)

    try {
      const response = await fetch('/api/tracking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ AWBNo: awbList.join(',') }),
      })

      const contentType = response.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        setError('Tracking service is temporarily unavailable. Please try again later.')
        return
      }

      const data = await response.json()

      if (!response.ok || !data.success) {
        setError(data.message || 'Unable to fetch tracking details. Please try again.')
        return
      }

      if (!data.results?.length) {
        setError('No tracking data found')
        return
      }

      setResults(data.results)
      const firstSuccess = data.results.findIndex((item) => item.success && item.tracking)
      setOpenIndex(firstSuccess >= 0 ? firstSuccess : 0)
    } catch (err) {
      console.error('Tracking error:', err)
      setError('Unable to fetch tracking details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const trackingNo = searchParams.get('tracking_no')
    if (!trackingNo) return

    const cleaned = trackingNo.trim().replace(/\s+/g, ',')
    setAwb(cleaned)
    trackShipments(cleaned)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount from URL
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const cleaned = awb.trim()
    setSearchParams(cleaned ? { tracking_no: cleaned } : {})
    trackShipments(cleaned)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row align-items-center justify-content-center" {...aos('fade-up')}>
          <div className="col-md-8 col-lg-6" {...aos('fade-up', 100)}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="awb"
                placeholder="Enter AWB number(s), separated by comma"
                value={awb}
                onChange={(event) => setAwb(event.target.value)}
                aria-label="AWB numbers"
                required
              />
            </div>
            <div className="text-center" {...aos('fade-up', 150)}>
              <button
                className="btn btn-brand-1-big w-100"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Tracking...' : 'Track Now'}
              </button>
            </div>
          </div>
        </div>
      </form>

      {(loading || error || results) && (
        <div className="tracking-results mt-50" {...aos('fade-up', 200)}>
          {loading && (
            <div className="tracking-loading">
              <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
              <p className="mb-0">Fetching tracking details...</p>
            </div>
          )}

          {error && !loading && (
            <div className="tracking-error">
              <h5 className="mb-0">{error}</h5>
            </div>
          )}

          {!loading &&
            results?.map((item, index) =>
              item.success && item.tracking ? (
                <ShipmentResult
                  key={item.awb}
                  item={item}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex((prev) => (prev === index ? -1 : index))}
                />
              ) : (
                <div key={item.awb} className="tracking-error">
                  <h5>No data for AWB: {item.awb}</h5>
                  <p className="mb-0">{item.message || 'Invalid or unknown AWB'}</p>
                </div>
              ),
            )}
        </div>
      )}
    </>
  )
}
