import { 
  ForbesLogo, 
  EntrepreneurLogo, 
  BloombergLogo, 
  GQLogo, 
  TWSJLogo, 
  FastCompanyLogo, 
  YahooFinanceLogo, 
  TechCrunchLogo,
  LosAngelesTimesLogo,
  RollingStoneLogo,
  VentureBeatLogo,
  WWDLogo,
  BillboardLogo,
  HarpersBazaarLogo,
  CosmopolitanLogo,
  ElleLogo,
  GlamourLogo,
  AppleNewsLogo,
  GoogleNewsLogo,
  TheRealDealLogo,
  CoinDeskLogo,
  ArabianBusinessLogo,
  UsWeeklyLogo,
  ElFinancieroLogo,
  TravelLeisureLogo,
  EsquireLogo,
} from '../assets'

const MediaSection = () => {
  const mediaLogos = [
    { name: 'The Wall Street Journal', logo: TWSJLogo },
    { name: 'Bloomberg', logo: BloombergLogo },
    { name: 'Forbes México', logo: ForbesLogo },
    { name: 'Los Angeles Times', logo: LosAngelesTimesLogo },
    { name: 'Variety', logo: null },
    { name: 'Rolling Stone', logo: RollingStoneLogo },
    { name: 'Entrepreneur', logo: EntrepreneurLogo },
    { name: 'TechCrunch', logo: TechCrunchLogo },
    { name: 'VentureBeat', logo: VentureBeatLogo },
    { name: 'Yahoo Finance', logo: YahooFinanceLogo },
    { name: 'E! News', logo: null },
    { name: 'WWD', logo: WWDLogo },
    { name: 'Billboard', logo: BillboardLogo },
    { name: "Harper's Bazaar", logo: HarpersBazaarLogo },
    { name: 'Cosmopolitan', logo: CosmopolitanLogo },
    { name: 'Elle', logo: ElleLogo },
    { name: 'Glamour', logo: GlamourLogo },
    { name: 'GQ', logo: GQLogo },
    { name: 'Fast Company', logo: FastCompanyLogo },
    { name: 'Apple News', logo: AppleNewsLogo },
    { name: 'Google News', logo: GoogleNewsLogo },
    { name: 'The Real Deal', logo: TheRealDealLogo },
    { name: 'CoinDesk', logo: CoinDeskLogo },
    { name: 'Arabian Business', logo: ArabianBusinessLogo },
    { name: 'Paper Magazine', logo: null },
    { name: 'Us Weekly', logo: UsWeeklyLogo },
    { name: 'El Financiero', logo: ElFinancieroLogo },
    { name: 'EL CEO', logo: null },
    { name: 'Travel + Leisure', logo: TravelLeisureLogo },
    { name: 'Esquire', logo: EsquireLogo },
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
        <div className="flex-1 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 sm:gap-3 md:gap-4">
          {mediaLogos.map((media, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center p-2 sm:p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 min-h-[60px]"
            >
              {media.logo ? (
                <img 
                  src={media.logo} 
                  alt={media.name}
                  className="max-h-6 sm:max-h-7 md:max-h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  title={media.name}
                />
              ) : (
                <div className="text-center px-1">
                  <p className="text-xs font-bold text-gray-800 leading-tight">
                    {media.name}
                  </p>
                  <div className="mt-1 h-0.5 w-6 bg-gray-300 mx-auto"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Media Names List */}
        <div className="mt-3 sm:mt-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-black mb-3 text-center">
              Medios de Prestigio Internacional
            </h3>
            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                The Wall Street Journal · Bloomberg · Forbes México · Los Angeles Times · Variety · Rolling Stone · Entrepreneur · TechCrunch · VentureBeat · Yahoo Finance · E! News · WWD · Billboard · Harper's Bazaar · Cosmopolitan · Elle · Glamour · GQ · Fast Company · Apple News · Google News · The Real Deal · CoinDesk · Arabian Business · Paper Magazine · Us Weekly · El Financiero · EL CEO · Travel + Leisure · Esquire
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MediaSection
