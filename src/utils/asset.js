const assetModules = import.meta.glob('../assets/**/*', {
  eager: true,
  query: '?url',
  import: 'default',
})

const assetMap = new Map()

for (const [modulePath, url] of Object.entries(assetModules)) {
  const relative = modulePath.replace('../assets/', '').replace(/\\/g, '/')
  assetMap.set(relative, url)
  assetMap.set(`assets/${relative}`, url)
}

export function asset(path) {
  if (!path) return ''

  const clean = path.replace(/^\/+/, '').replace(/^assets\//, '')
  return assetMap.get(clean) ?? assetMap.get(`assets/${clean}`) ?? ''
}

export const favicon = asset('images/favicon.svg')
export const logo = asset('images/logo.svg')
