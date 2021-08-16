import SmallCard from '../components/SmallCard'
import { projectIcons } from '../components/Icons'

import { projects } from '../utils/projectsData'

const Home = () => (
  <div className="container mx-auto home">
    <h1 className="text-5xl text-gray-700">
      What Can I Deploy to Static Apps?
    </h1>
    <div className="grid grid-cols-3">
      {projects.map((project) => {
        const Icon = projectIcons[project.id]
        return (
          <SmallCard
            key={project.id}
            Icon={Icon}
            title={project.name}
            slug={project.slug}
          />
        )
      })}
    </div>
  </div>
)

export default Home
