/** @desc Header for the content specific to the page, i.e. the page title */
interface Props {
  className?: string
  pageTitle: string
  intro?: string
}

function PageHeader(props: Props): JSX.Element {
  const { className = '', pageTitle, intro } = props

  return (
    <div className={`${className} mb-6`}>
      <h1 className="mb-8 text-gray-800 text-4xl font-black">{pageTitle}</h1>
      {intro && <p className="mb-0 text-gray-500 text-2xl">{intro}</p>}
    </div>
  )
}

export default PageHeader
