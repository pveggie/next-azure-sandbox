import NavItem, { NavItemInterface } from '../molecules/NavItem'

interface Props {
  className: string
  navItems: NavItemInterface[]
}

function NavTabs(props: Props): JSX.Element {
  const { className, navItems } = props
  return (
    <nav className={className}>
      <ul className="list-none h-full inline-flex items-center">
        {navItems.map((navItem) => (
          <NavItem
            key={navItem.label}
            navItem={navItem}
            className="font-semibold px-4 border-r-2 first:pl-0 last:pr-0 last:border-r-0"
          />
        ))}
      </ul>
    </nav>
  )
}

export default NavTabs
