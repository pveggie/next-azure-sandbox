/** @desc Header shared by all pages on the site. Contains the site navigation  */
import React from 'react'
import NavList from '../organisms/NavList'
import NavTabs from '../organisms/NavTabs'

import { siteTitle, navItems } from '../../utils/siteConfig'

type Props = Record<string, unknown>

interface State {
  heightFactor: number
}

class SiteHeader extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      heightFactor: 20,
    }
  }

  render(): JSX.Element {
    const { heightFactor } = this.state
    return (
      <header
        className={`sticky inset-0 flex md:justify-between items-center h-${heightFactor} px-5 bg-gray-800 text-gray-100 shadow-lg`}
      >
        <NavList
          navItems={navItems}
          fromTop={heightFactor}
          className="md:hidden"
        />
        <h1 className="text-2xl font-semibold pr-10">{siteTitle}</h1>
        <NavTabs navItems={navItems} className="hidden md:block h-full" />
      </header>
    )
  }
}

export default SiteHeader
