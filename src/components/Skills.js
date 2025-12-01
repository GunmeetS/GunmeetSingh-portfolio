import { 
  SiNextdotjs, SiReact, SiJavascript, SiTypescript, SiTailwindcss, SiPostgresql, SiMongodb, SiPrisma, SiGit, SiVercel, SiMysql,SiPython, SiLaravel, SiVisualstudiocode
} from '@/components/Icons'
import { FadeIn, ScaleIn } from '@/components/ScrollAnimation'

export default function Skills() {

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'Next.js', icon: SiNextdotjs, color: 'text-black dark:text-white' },
      { name: 'React', icon: SiReact, color: 'text-blue-500' },
      { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-500' },
      { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-600' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-500' },
    ]
  },
  {
    title: 'Backend & Databases',
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-700' },
      { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500' },
      { name: 'Prisma', icon: SiPrisma, color: 'text-indigo-600' },
      { name: 'MySQL', icon: SiMysql, color: 'text-blue-500' },
      { name: 'Python', icon: SiPython, color: 'text-blue-500' }, 
      { name: 'Laravel', icon: SiLaravel, color: 'text-red-600' }, 
    ]
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'Git/GitHub', icon: SiGit, color: 'text-orange-600' },
      { name: 'Vercel', icon: SiVercel, color: 'text-black dark:text-white' },
      { name: 'VS Code', icon: SiVisualstudiocode, color: 'text-blue-600' }, 
    ]
  }
];

  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-br from-teal-50 to-cream-100 dark:from-charcoal-800 dark:to-charcoal-900">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Technical Skills
          </h2>
        </FadeIn>
        
        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.title}>
              <FadeIn delay={categoryIndex * 0.2}>
                <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-200">
                  {category.title}
                </h3>
              </FadeIn>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {category.skills.map((skill, skillIndex) => {
                  const Icon = skill.icon
                  return (
                    <ScaleIn key={skill.name} delay={categoryIndex * 0.2 + skillIndex * 0.1}>
                      <div className="flex flex-col items-center p-6 bg-white dark:bg-charcoal-800 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 hover:scale-105 animate-float">
                        <Icon className={`text-5xl mb-3 ${skill.color}`} />
                        <span className="text-sm font-medium text-center text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                      </div>
                    </ScaleIn>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
