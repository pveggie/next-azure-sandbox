/** @desc Header shared by all pages on the site. Contains the site navigation  */
import React from 'react'
import NavList from '../organisms/NavList'
import NavTabs from '../organisms/NavTabs'

import { siteTitle, navItems } from '../../utils/siteConfig'

class SiteHeader extends React.Component {
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
        className={`flex md:justify-between items-center h-${this.state.heightFactor} pl-5 bg-gray-800 text-gray-100 shadow-lg`}
      >
        <NavList
          navItems={navItems}
          fromTop={this.state.heightFactor}
          className="md:hidden"
        />
        <h1 className="text-2xl font-semibold pl-">{siteTitle}</h1>
        <NavTabs
          navItems={navItems}
          className="hidden md:block h-full px-5 bg-gradient-to-r from-gray-800 to-gray-600"
        />
      </header>
    )
  }
}

export default SiteHeader
