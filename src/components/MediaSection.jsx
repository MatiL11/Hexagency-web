import { 
  ForbesLogo, 
  EntrepreneurLogo, 
  BloombergLogo, 
  GQLogo, 
  CNNLogo, 
  BBCLogo, 
  TWSJLogo, 
  BusinessInsiderLogo, 
  FastCompanyLogo, 
  YahooFinanceLogo, 
  ElEconomistaLogo, 
  MilenioLogo, 
  ElUniversalLogo, 
  VogueLogo, 
  TechCrunchLogo, 
  FinancialTimesLogo, 
  FortuneLogo, 
  ReutersLogo, 
  MarketWatchLogo, 
} from '../assets'

const MediaSection = () => {
  const mediaLogos = [
    { name: 'Forbes', logo: ForbesLogo },
    { name: 'Entrepreneur', logo: EntrepreneurLogo },
    { name: 'Bloomberg', logo: BloombergLogo },
    { name: 'GQ', logo: GQLogo },
    { name: 'CNN', logo: CNNLogo },
    { name: 'BBC News', logo: BBCLogo },
    { name: 'The Wall Street Journal', logo: TWSJLogo },
    { name: 'Business Insider', logo: BusinessInsiderLogo },
    { name: 'Fast Company', logo: FastCompanyLogo },
    { name: 'Yahoo Finance', logo: YahooFinanceLogo },
    { name: 'El Economista', logo: ElEconomistaLogo },
    { name: 'Milenio', logo: MilenioLogo },
    { name: 'El Universal', logo: ElUniversalLogo },
    { name: 'Vogue Business', logo: VogueLogo },
    { name: 'TechCrunch', logo: TechCrunchLogo },
    { name: 'Financial Times', logo: FinancialTimesLogo },
    { name: 'Fortune', logo: FortuneLogo },
    { name: 'Reuters', logo: ReutersLogo },
    { name: 'MarketWatch', logo: MarketWatchLogo },
  ]

  return (
    <section id="medios" className="h-full bg-white flex flex-col overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6">
            SECCIÓN DE MEDIOS
          </h2>
          <div className="h-1 w-12 sm:w-24 bg-black mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Nuestros proyectos y clientes tienen acceso a visibilidad en medios de prestigio internacional.
          </p>
        </div>

        {/* Media Logos Grid */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 sm:gap-6 md:gap-8">
          {mediaLogos.map((media, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img 
                src={media.logo} 
                alt={media.name}
                className="max-h-8 sm:max-h-10 md:max-h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                title={media.name}
              />
            </div>
          ))}
        </div>

        {/* Media Names List */}
        <div className="mt-4 sm:mt-6">
          <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg sm:text-xl font-semibold text-black mb-4 text-center">
              Medios de Prestigio Internacional
            </h3>
            <div className="text-center">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Forbes · Entrepreneur · Bloomberg · GQ · CNN · BBC News · The Wall Street Journal · Business Insider · Fast Company · Yahoo Finance · Expansión · El Economista · Milenio · El Universal · Reforma · Vogue Business · INC · TechCrunch · Rolling Stone Business · Financial Times · Fortune · The Guardian · Reuters · LinkedIn News LATAM · MarketWatch · Forbes Centroamérica · Business Mexico.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MediaSection
