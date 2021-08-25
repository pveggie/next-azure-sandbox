import { PropsWithChildren } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  isLoading: boolean
  isMask?: boolean
}

function Loader({
  children,
  isLoading,
  isMask,
}: PropsWithChildren<Props>): JSX.Element {
  const loaderIcon = (
    <FontAwesomeIcon icon="spinner" className="w-5 h-5 animate-spin" />
  )

  const loaderBox = (
    <div
      className={classNames({
        'absolute inset-0 flex justify-center items-center font-bold bg-gray-100 text-gray-700 bg-opacity-80 z-20':
          isMask,
      })}
    >
      {loaderIcon}
      {children}
    </div>
  )

  const element = children ? loaderBox : loaderIcon

  return <>{isLoading && element}</>
}

export default Loader
