import NavItem, { NavItemInterface } from '../molecules/NavItem'

interface Props {
  className: string
  navItems: NavItemInterface[]
}

function NavTabs(props: Props): JSX.Element {
  const { className, navItems } = props
  return (
    <nav className={className}>
      <ul className="inline-flex items-center h-full list-none">
        {navItems.map((navItem) => (
          <NavItem
            key={navItem.label}
            navItem={navItem}
            className="first:pl-0 last:pr-0 px-4 font-semibold last:border-r-0 border-r-2"
          />
        ))}
      </ul>
    </nav>
  )
}

export default NavTabs
