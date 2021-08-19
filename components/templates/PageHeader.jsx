/** @desc Header for the content specific to the page, i.e. the page title */
function PageHeader(props) {
  return (
    <div className={`${props.className} mb-6`}>
      <h1 className="mb-8 text-4xl text-gray-800 font-black">
        {props.pageTitle}
      </h1>
      <p className="mb-0 text-2xl text-gray-500">{props.intro}</p>
    </div>
  )
}

export default PageHeader
