import Link from 'next/link'

function NavItem(props) {
  return (
    <li className="font-bold mx-6 px-2 py-6 border-b border-gray-300">
      <Link href={props.navItem.path}>
        <a>{props.navItem.label}</a>
      </Link>
    </li>
  )
}

export default NavItem
