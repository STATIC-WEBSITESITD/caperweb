import { useEffect, useMemo, useState } from 'react'
import { aos } from '../../utils/aos'
import { favicon } from '../../utils/asset'

function cleanText(text) {
  if (!text) return ''
  return text.replace(/\s+/g, ' ').trim()
}

function getDefaultOpenIndex(items) {
  const index = items.findIndex((item) => item.defaultOpen)
  return index >= 0 ? index : 0
}

export default function FAQ({ items = [], subtitle }) {
  const faqs = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        question: cleanText(item.question),
        answer: cleanText(item.answer),
      })),
    [items],
  )

  const [openIndex, setOpenIndex] = useState(() => getDefaultOpenIndex(faqs))

  useEffect(() => {
    setOpenIndex(getDefaultOpenIndex(faqs))
  }, [faqs])

  if (!faqs.length) return null

  return (
    <section className="section pt-100" {...aos('fade-up')}>
      <div className="container">
        <div className="text-center">
          <img className="mx-auto mb-15" src={favicon} alt="Caper" {...aos('zoom-in')} />
          <h2 className="color-grey-600 mb-20" {...aos('fade-up', 100)}>
            FAQs
          </h2>
          <p className="font-md color-grey-700" {...aos('fade-up', 200)}>
            {subtitle ||
              'Feeling inquisitive? Have a read through some of our FAQs or contact our team for help'}
          </p>
        </div>
        <div className="row justify-content-center mt-50">
          <div className="col-xl-12 col-lg-12">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index
              return (
                <div
                  key={`${item.question}-${index}`}
                  style={{ borderBottom: '1px solid #e5e7eb' }}
                  {...aos('fade-up', index * 60)}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      padding: '22px 0',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: '16px',
                        color: '#1a1a2e',
                        lineHeight: 1.4,
                      }}
                    >
                      {item.question}
                    </span>
                    <span
                      style={{
                        flexShrink: 0,
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isOpen ? '#1a1a2e' : 'var(--color-brand-1, #e8381a)',
                        color: '#fff',
                        fontSize: '18px',
                        fontWeight: 400,
                        lineHeight: 1,
                        transition: 'background 0.2s',
                      }}
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div style={{ paddingBottom: '20px' }}>
                      <p className="font-md color-grey-700" style={{ margin: 0 }}>
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
