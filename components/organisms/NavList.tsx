import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavItem, { NavItemInterface } from '../molecules/NavItem'

interface Props {
  fromTop: string | number
  className: string
  navItems: NavItemInterface[]
}

interface State {
  isOpen: boolean
}

class NavList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isOpen: false,
    }
    // this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu(): void {
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
  }

  render(): JSX.Element {
    const { fromTop, className, navItems } = this.props
    const { isOpen } = this.state
    const navClassName = classNames(
      `fixed top-${fromTop} left-0 h-screen w-full bg-pink-700 transform transition-transform motion-reduce:transition-none`,
      {
        '-translate-x-full': !isOpen,
      }
    )

    return (
      <div className={className}>
        <button
          type="button"
          onClick={() => this.toggleMenu()}
          className="inline-flex items-center w-6 mr-4"
        >
          <FontAwesomeIcon icon={isOpen ? 'times' : 'bars'} />
        </button>

        <nav className={navClassName}>
          <ul className="list-none ">
            {navItems.map((navItem) => (
              <NavItem
                key={navItem.label}
                navItem={navItem}
                className="font-bold mx-6 px-2 py-6 border-b border-gray-300"
              />
            ))}
          </ul>
        </nav>
      </div>
    )
  }
}

export default NavList
