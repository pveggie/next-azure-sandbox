import type { NavItemInterface } from '../components/molecules/NavItem'

const siteTitle = 'Next Sandbox'

const navItems: NavItemInterface[] = [
  { path: '/', label: 'Home' },
  { path: '/demos/ocr', label: 'OCR' },
  { path: '/demos/translation', label: 'Translation' },
  // { path: '/demos/ingredient-check', label: 'Ingredient Check' },
]

export { siteTitle, navItems }
