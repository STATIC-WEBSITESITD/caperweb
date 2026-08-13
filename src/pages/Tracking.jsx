import PageBanner from '../components/ui/PageBanner'
import TrackingForm from '../components/ui/TrackingForm'
import { getPageMeta } from '../data/pages'
import { usePageMeta } from '../hooks/usePageMeta'
import { aos } from '../utils/aos'

export default function Tracking() {
  usePageMeta(getPageMeta('tracking'))

  return (
    <>
      <PageBanner
        heading="Tracking Your Shipment"
        paragraph="Track up to 10 numbers at a time. Separate by a comma (,) or return (enter)."
      />

      <section className="section pt-100 pb-100" {...aos('fade-up')}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-12 col-lg-12" {...aos('fade-up', 100)}>
              <TrackingForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
