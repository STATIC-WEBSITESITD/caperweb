import { aosStagger } from '../../utils/aos'

export default function TickList({ items }) {
  if (!items?.length) return null

  return (
    <ul className="list-ticks">
      {items.map((item, index) => (
        <li key={item} {...aosStagger(index, 80, 'fade-right')}>
          <i className="fa-solid fa-check w-6 h-6 icon-16" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}
