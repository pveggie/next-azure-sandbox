import React from 'react'
import NavList from '../organisms/NavList'
import NavTabs from '../organisms/NavTabs'

import { siteTitle, navItems } from '../../utils/siteConfig'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      heightFactor: 20,
    }
  }

  // componentDidMount() {
  //   const headerHeight = this.divElement.clientHeight
  //   this.setState({ headerHeight })
  // }

  render() {
    return (
      <header
        className={`flex sm:justify-between items-center bg-indigo-900 text-gray-100 h-${this.state.heightFactor} px-5 mb-10`}
      >
        <NavList
          navItems={navItems}
          fromTop={this.state.heightFactor}
          className="sm:hidden"
        />
        <h1 className="text-2xl font-semibold">{siteTitle}</h1>
        <NavTabs navItems={navItems} className="hidden sm:block" />
      </header>
    )
  }
}

export default Header
