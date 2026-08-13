import ContactForm from '../components/ui/ContactForm'
import PageBanner from '../components/ui/PageBanner'
import { getPageMeta } from '../data/pages'
import { usePageMeta } from '../hooks/usePageMeta'
import { aos } from '../utils/aos'

export default function Contact() {
  usePageMeta(getPageMeta('contact'))

  return (
    <>
      <PageBanner
        heading="Contact Us"
        paragraph="Can't find the answer you are looking for? Please chat to our friendly team for quotes, support, or branch enquiries."
      />

      <section className="section pt-100" {...aos('fade-up')}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-12 col-lg-12" {...aos('fade-up', 100)}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
