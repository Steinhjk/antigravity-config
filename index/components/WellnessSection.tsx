'use client'

interface Resource {
  title: string
  description: string
  url: string
  type: 'video' | 'app' | 'link'
}

const meditationResources: Resource[] = [
  {
    title: 'Meditación Guiada - 10 minutos',
    description: 'Sesión corta para calmar la mente y reducir el estrés',
    url: 'https://www.youtube.com/watch?v=inpok4MKVLM',
    type: 'video',
  },
  {
    title: 'Headspace',
    description: 'App de meditación con sesiones guiadas para principiantes',
    url: 'https://www.headspace.com',
    type: 'app',
  },
  {
    title: 'Calm',
    description: 'Meditaciones, historias para dormir y música relajante',
    url: 'https://www.calm.com',
    type: 'app',
  },
]

const yogaResources: Resource[] = [
  {
    title: 'Yoga With Adriene',
    description: 'Canal de YouTube con clases gratuitas para todos los niveles',
    url: 'https://www.youtube.com/@yogawithadriene',
    type: 'video',
  },
  {
    title: 'Down Dog',
    description: 'App que genera sesiones de yoga personalizadas',
    url: 'https://www.downdogapp.com',
    type: 'app',
  },
]

const mentalHealthResources: Resource[] = [
  {
    title: 'Teléfono de la Esperanza (España)',
    description: 'Línea de ayuda 24/7: 717 003 717',
    url: 'https://telefonodelaesperanza.org',
    type: 'link',
  },
  {
    title: 'BetterHelp',
    description: 'Terapia online con profesionales licenciados',
    url: 'https://www.betterhelp.com',
    type: 'app',
  },
  {
    title: 'Línea de la Vida (México)',
    description: 'Atención psicológica gratuita: 800 911 2000',
    url: 'https://www.gob.mx/salud',
    type: 'link',
  },
]

const datingApps: Resource[] = [
  {
    title: 'Tinder',
    description: 'La app de citas más popular del mundo',
    url: 'https://tinder.com',
    type: 'app',
  },
  {
    title: 'Bumble',
    description: 'Donde las mujeres dan el primer paso',
    url: 'https://bumble.com',
    type: 'app',
  },
  {
    title: 'Hinge',
    description: 'Diseñada para ser eliminada - conexiones reales',
    url: 'https://hinge.co',
    type: 'app',
  },
  {
    title: 'OkCupid',
    description: 'Citas basadas en compatibilidad',
    url: 'https://www.okcupid.com',
    type: 'app',
  },
]

function ResourceCard({ resource }: { resource: Resource }) {
  const getIcon = () => {
    switch (resource.type) {
      case 'video':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'app':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        )
    }
  }

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-dark-100 rounded-lg p-4 border border-gray-800 hover:border-primary-500/50 transition-all hover:shadow-lg hover:shadow-primary-500/5"
    >
      <div className="flex items-start gap-3">
        <div className="text-primary-400 mt-0.5">{getIcon()}</div>
        <div>
          <h4 className="font-medium text-white mb-1">{resource.title}</h4>
          <p className="text-sm text-gray-400">{resource.description}</p>
        </div>
      </div>
    </a>
  )
}

export default function WellnessSection() {
  return (
    <div className="space-y-12">
      {/* Mensaje principal */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4">
          Equilibrio y Bienestar
        </h2>
        <p className="text-gray-400 leading-relaxed">
          La sexualidad es una parte natural de la vida, pero el equilibrio es clave.
          Aquí encontrarás recursos para cuidar tu salud mental, física y emocional.
          Recuerda: una relación sana con la sexualidad incluye autocuidado,
          conexiones reales y momentos de reflexión.
        </p>
      </div>

      {/* Meditación */}
      <section>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </span>
          Meditación y Mindfulness
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {meditationResources.map((resource) => (
            <ResourceCard key={resource.title} resource={resource} />
          ))}
        </div>
      </section>

      {/* Yoga */}
      <section>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </span>
          Yoga y Ejercicio
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {yogaResources.map((resource) => (
            <ResourceCard key={resource.title} resource={resource} />
          ))}
        </div>
      </section>

      {/* Salud Mental */}
      <section>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </span>
          Ayuda Psicológica
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mentalHealthResources.map((resource) => (
            <ResourceCard key={resource.title} resource={resource} />
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Si estás pasando por un momento difícil, no dudes en buscar ayuda profesional.
          No estás solo/a.
        </p>
      </section>

      {/* Apps de Citas */}
      <section>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center text-pink-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </span>
          Conexiones Reales - Apps de Citas
        </h3>
        <p className="text-gray-400 mb-4">
          Nada reemplaza las conexiones humanas reales. Si buscas conocer gente nueva,
          estas apps pueden ayudarte a encontrar personas compatibles.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {datingApps.map((resource) => (
            <ResourceCard key={resource.title} resource={resource} />
          ))}
        </div>
      </section>

      {/* Mensaje final */}
      <div className="bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-xl p-6 border border-primary-500/20">
        <p className="text-center text-gray-300">
          <strong className="text-white">Recuerda:</strong> El consumo de pornografía
          debe ser responsable y equilibrado. Si sientes que está afectando tu vida
          diaria, relaciones o bienestar, considera hablar con un profesional.
          Tu salud mental y emocional son importantes.
        </p>
      </div>
    </div>
  )
}
