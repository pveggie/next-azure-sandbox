import DefaultLayout from '../../components/layouts/DefaultLayout'

function IngredientCheck() {
  const pageTitle = 'Ingredient Check'
  return (
    <DefaultLayout pageTitle={pageTitle}>
      <h1 className="text-5xl text-gray-800">{pageTitle}</h1>
    </DefaultLayout>
  )
}

export default IngredientCheck
