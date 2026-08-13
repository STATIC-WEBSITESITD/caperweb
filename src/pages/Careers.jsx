import CareersForm from '../components/ui/CareersForm'
import PageBanner from '../components/ui/PageBanner'
import { getPageMeta } from '../data/pages'
import { usePageMeta } from '../hooks/usePageMeta'
import { aos } from '../utils/aos'

export default function Careers() {
  usePageMeta(getPageMeta('careers'))

  return (
    <>
      <PageBanner
        heading="Careers"
        paragraph="Join our dynamic team and build a rewarding career in logistics and supply chain management. Explore our open positions and submit your application."
      />

      <section className="section pt-100" {...aos('fade-up')}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-12 col-lg-12" {...aos('fade-up', 100)}>
              <CareersForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
