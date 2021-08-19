import Link from 'next/link'

function NavItem(props: {
  className: string
  navItem: { path: string; label: string }
}) {
  return (
    <li className={props.className}>
      <Link href={props.navItem.path}>
        <a>{props.navItem.label}</a>
      </Link>
    </li>
  )
}

export default NavItem
