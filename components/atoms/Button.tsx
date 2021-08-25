import classNames from 'classnames'
import { PropsWithChildren, ReactNode } from 'react'

interface AnyButton {
  className?: string
  primary?: boolean
  secondary?: boolean
  onClick?: () => void
}

interface BasicButton extends AnyButton {
  label: string | ReactNode | false
}

interface CustomButton extends AnyButton {
  children: ReactNode | false
}

type ButtonProps = BasicButton | CustomButton

function Button({
  primary,
  secondary,
  className,
  onClick,
  ...typeProps
}: PropsWithChildren<ButtonProps>): JSX.Element {
  const buttonClasses = classNames(
    className,
    'flex items-center px-3 py-2 font-bold',
    {
      'bg-pink-600 text-white': primary,
      'bg-gray-600 text-white': secondary,
    }
  )

  const buttonEl = (
    <button type="button" className={buttonClasses} onClick={onClick}>
      {'children' in typeProps ? typeProps.children : typeProps.label}
    </button>
  )

  return buttonEl
}

export default Button
