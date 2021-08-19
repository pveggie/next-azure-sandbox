import Link from 'next/link'

function NavItem(props) {
  return (
    <li className={props.className}>
      <Link href={props.navItem.path}>
        <a>{props.navItem.label}</a>
      </Link>
    </li>
  )
}

export default NavItem
