import React from 'react'
import classNames from 'classnames'
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
      `fixed top-${this.props.fromTop} left-0 h-screen w-full bg-gray-900 transform`,
      {
        '-translate-x-full': !this.state.isOpen,
      }
    )

    return (
      <div className={this.props.className}>
        <button onClick={this.toggleMenu} className="w-6 mr-4">
          <FontAwesomeIcon icon={this.state.isOpen ? 'times' : 'bars'} />
        </button>

        <nav className={navClassName}>
          <ul className="list-none ">
            {this.props.navItems.map((navItem) => {
              return (
                <li
                  key={navItem}
                  className="font-bold mx-6 px-2 py-6 border-b border-gray-300"
                >
                  {navItem}
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    )
  }
}

export default NavList
