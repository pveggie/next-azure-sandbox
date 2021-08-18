import React from 'react'
import classNames from 'classnames'
import NavItem from '../molecules/NavItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class NavList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const navClassName = classNames(
      `fixed top-${this.props.fromTop} left-0 h-screen w-full bg-gray-900 transform transition-transform motion-reduce:transition-none`,
      {
        '-translate-x-full': !this.state.isOpen,
      }
    )

    return (
      <div className={this.props.className}>
        <button
          onClick={this.toggleMenu}
          className="inline-flex items-center w-6 mr-4"
        >
          <FontAwesomeIcon icon={this.state.isOpen ? 'times' : 'bars'} />
        </button>

        <nav className={navClassName}>
          <ul className="list-none ">
            {this.props.navItems.map((navItem) => {
              return (
                <NavItem
                  key={navItem.label}
                  navItem={navItem}
                  className="font-bold mx-6 px-2 py-6 border-b border-gray-300"
                />
              )
            })}
          </ul>
        </nav>
      </div>
    )
  }
}

export default NavList
