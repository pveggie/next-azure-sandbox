import Link from 'next/link'

export interface NavItemInterface {
  label: string
  path: string
}

function NavItem(props: {
  className: string
  navItem: NavItemInterface
}): JSX.Element {
  const { className, navItem } = props
  return (
    <li className={className}>
      <Link href={navItem.path}>
        <a>{navItem.label}</a>
      </Link>
    </li>
  )
}

export default NavItem
