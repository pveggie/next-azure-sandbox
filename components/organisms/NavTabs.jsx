import NavItem from '../molecules/NavItem'

function NavTabs(props) {
  return (
    <nav className={props.className}>
      <ul className="list-none h-full inline-flex items-center">
        {props.navItems.map((navItem) => {
          return (
            <NavItem
              key={navItem.label}
              navItem={navItem}
              className="font-semibold px-4 border-r-2 first:pl-0 last:pr-0 last:border-r-0"
            />
          )
        })}
      </ul>
    </nav>
  )
}

export default NavTabs
