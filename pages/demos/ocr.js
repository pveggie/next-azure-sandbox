import DefaultLayout from '../../components/layouts/DefaultLayout'

function Ocr() {
  const pageTitle = 'Optical Character Recognition'
  return (
    <DefaultLayout pageTitle={pageTitle}>
      <h1 className="text-5xl text-gray-800">{pageTitle}</h1>
    </DefaultLayout>
  )
}

export default Ocr
