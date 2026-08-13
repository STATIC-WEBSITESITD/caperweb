import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function upsertMeta(selector, attributes) {
  const { key, value, attr = 'name' } = attributes
  if (!value) return

  let el = document.querySelector(`${selector}[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

export function usePageMeta({ title, description, keywords }) {
  const { pathname } = useLocation()

  useEffect(() => {
    if (title) document.title = title

    upsertMeta('meta', { key: 'description', value: description })
    upsertMeta('meta', { key: 'keywords', value: keywords })
    upsertMeta('meta', { key: 'og:title', value: title, attr: 'property' })
    upsertMeta('meta', { key: 'og:description', value: description, attr: 'property' })
    upsertMeta('meta', { key: 'og:type', value: 'website', attr: 'property' })
    upsertMeta('meta', {
      key: 'og:url',
      value: `${window.location.origin}${pathname}`,
      attr: 'property',
    })
    upsertMeta('meta', { key: 'twitter:card', value: 'summary_large_image' })
    upsertMeta('meta', { key: 'twitter:title', value: title })
    upsertMeta('meta', { key: 'twitter:description', value: description })
  }, [title, description, keywords, pathname])
}
