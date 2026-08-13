import { aos } from '../../utils/aos'
import { favicon } from '../../utils/asset'

export default function PageBanner({ heading, paragraph }) {
  return (
    <section className="section" {...aos('fade-up')}>
      <div className="banner-howitwork3">
        <div className="container">
          <div className="box-info-trackyourparcel">
            <img className="mx-auto mb-15" src={favicon} alt="Caper" {...aos('zoom-in')} />
            <h2 className="color-grey-600 mb-25" {...aos('fade-up', 100)}>
              {heading}
            </h2>
            {paragraph && (
              <p className="color-grey-700 font-md" {...aos('fade-up', 200)}>
                {paragraph}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
