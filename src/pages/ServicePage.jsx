import { Navigate, useLocation } from 'react-router-dom'
import FAQ from '../components/ui/FAQ'
import HeroVideo from '../components/ui/HeroVideo'
import PageBanner from '../components/ui/PageBanner'
import TickList from '../components/ui/TickList'
import { getIndustry, getPageMeta, getService } from '../data/pages'
import { usePageMeta } from '../hooks/usePageMeta'
import { aos } from '../utils/aos'
import { asset, favicon } from '../utils/asset'

function SectionContent({ section }) {
  return (
    <div className="box-info-pround">
      <div className="text-left">
        <img className="mb-15" src={favicon} alt="Caper" />
        <h2 className="color-grey-600 mb-20">{section.heading}</h2>
        {section.paragraph && (
          <p className="font-md color-grey-700">{section.paragraph}</p>
        )}
      </div>
      <div className="mt-30">
        <TickList items={section.ticks} />
      </div>
    </div>
  )
}

export default function ServicePage({ type = 'service' }) {
  const { pathname } = useLocation()
  const slug = pathname.replace(/^\//, '')
  const page = type === 'industry' ? getIndustry(slug) : getService(slug)

  usePageMeta(getPageMeta(slug))

  if (!page) return <Navigate to="/" replace />

  const lastSection = page.section3 ?? page.section2
  const sidebarImage = page.image2 || page.image
  const thirdSectionImage = page.image3 || page.image

  return (
    <>
      <PageBanner
        heading={page.banner.heading}
        paragraph={page.banner.paragraph}
      />

      {type === 'service' && page.video && (
        <section className="section pt-100" {...aos('fade-up')}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6 mb-30" {...aos('fade-right')}>
                <div className="box-info-pround">
                  <div className="text-left">
                    <img className="mb-15" src={favicon} alt="Caper" />
                    <h2 className="color-grey-600 mb-20">{page.hero.heading}</h2>
                    {(page.hero.introParagraph || page.hero.paragraph) && (
                      <p className="font-md color-grey-700">{page.hero.introParagraph || page.hero.paragraph}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mb-30" {...aos('fade-left', 150)}>
                <HeroVideo
                  key={slug}
                  layout="embed"
                  videoId={page.video.videoId}
                  title={page.video.title}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section pt-100" {...aos('fade-up')}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 mb-30" {...aos('fade-right')}>
              <img className="img-main w-100" src={asset(page.image)} alt="Caper" />
            </div>
            <div className="col-xl-6 col-lg-6 mb-30" {...aos('fade-left', 150)}>
              <SectionContent section={page.section1} />
            </div>
          </div>
        </div>
      </section>

      <section className="section mt-100 pt-100 pb-100 bg-2 position-relative" {...aos('fade-up')}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6" {...aos('fade-right', 100)}>
              <SectionContent section={lastSection} />
            </div>
          </div>
        </div>
        <div
          className="box-image-touch"
          style={{
            backgroundImage: `url(${asset(sidebarImage)})`,
          }}
        />
      </section>

      {page.section3 && (
        <section className="section mt-100 pt-100" {...aos('fade-up')}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6 mb-30 order-lg-1" {...aos('fade-right', 150)}>
                <SectionContent section={page.section2} />
              </div>
              <div className="col-xl-6 col-lg-6 mb-30 order-lg-2" {...aos('fade-left')}>
                <img className="img-main w-100" src={asset(thirdSectionImage)} alt="Caper" />
              </div>
            </div>
          </div>
        </section>
      )}

      <FAQ
        items={page.faqs}
        subtitle="Feeling inquisitive? Have a read through some of our FAQs or contact our team for help."
      />
    </>
  )
}
