export function aos(animation = 'fade-up', delay) {
  const props = { 'data-aos': animation }
  if (delay != null && delay > 0) {
    props['data-aos-delay'] = String(delay)
  }
  return props
}

export function aosStagger(index, step = 100, animation = 'fade-up') {
  return aos(animation, index * step)
}
