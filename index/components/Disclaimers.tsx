'use client'

export default function Disclaimers() {
  return (
    <footer className="bg-dark-300 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Disclaimers importantes */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <h3 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Contenido Ilegal
            </h3>
            <p className="text-sm text-gray-400">
              Rechazamos completamente cualquier forma de pornografía ilegal,
              incluyendo pero no limitado a: contenido que involucre menores de edad,
              violencia no consentida, o cualquier material que viole las leyes vigentes.
            </p>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <h3 className="text-orange-400 font-semibold mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              Distribución Sin Consentimiento
            </h3>
            <p className="text-sm text-gray-400">
              Nos oponemos firmemente a la distribución de contenido íntimo sin
              el consentimiento de las personas involucradas. Esto incluye
              "revenge porn" y cualquier material compartido sin autorización.
            </p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <h3 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Deepfakes / IA No Autorizada
            </h3>
            <p className="text-sm text-gray-400">
              Rechazamos el uso de tecnología de deepfakes o inteligencia artificial
              para crear contenido sexual de personas sin su consentimiento explícito.
              Este tipo de contenido es dañino e ilegal.
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Tu Seguridad
            </h3>
            <p className="text-sm text-gray-400">
              Este sitio solo indexa y enlaza a otros sitios. No alojamos contenido.
              Navega con precaución, usa protección contra malware y nunca compartas
              información personal en sitios no verificados.
            </p>
          </div>
        </div>

        {/* Links y copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                Términos de Uso
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                DMCA
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                Contacto
              </a>
            </div>
            <p className="text-sm text-gray-600">
              2024 Porn Index. Solo para mayores de 18 años.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
