import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { siteTitle, navItems } from '../../utils/siteConfig'
export default function Header() {
  return (
    <header className="flex sm:justify-between items-center bg-indigo-900 text-gray-100 p-5 mb-10">
      <FontAwesomeIcon className="sm:hidden mr-4" icon={faBars} />
      <h1 className="text-2xl font-semibold">{siteTitle}</h1>
      <nav>
        <ul className="list-none hidden sm:flex">
          {navItems.map((navItem) => {
            return (
              <li
                key="navItem"
                className="font-semibold px-4 border-r-2 last:pr-0 last:border-r-0"
              >
                {navItem}
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
