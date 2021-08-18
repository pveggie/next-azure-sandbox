function NavTabs(props) {
  return (
    <nav className={props.className}>
      <ul className="list-none flex">
        {props.navItems.map((navItem) => {
          return (
            <li
              key={navItem}
              className="font-semibold px-4 border-r-2 last:pr-0 last:border-r-0"
            >
              {navItem}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default NavTabs
