import DefaultLayout from '../components/layouts/DefaultLayout'
import { technologies } from '../utils/technologies'

const Home = () => (
  <DefaultLayout
    isHome
    pageTitle="Welcome"
    intro="Test site for trying out React, Next, Tailwindcss and Microsoft Azure."
  >
    <section className="content">
      <p>
        This site has been built to try out various technologies. The code is
        hosted on{' '}
        <a
          href="https://github.com/pveggie/next-azure-sandbox"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        .
      </p>

      <p>
        You can find information and documentation for each technology in their
        official sites.
      </p>

      <ul className="list-disc list-inside">
        {technologies.map((technology) => {
          return (
            <li key={technology.name}>
              <a href={technology.url} target="_blank" rel="noreferrer">
                <strong>{technology.name}</strong> - {technology.description}
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  </DefaultLayout>
)

export default Home
