import fs from 'fs';

let c = fs.readFileSync('src/pages/HomePage.jsx', 'utf-8');

// I will find the Trending section, and append my new sections right after it.
const trendingSectionEnd = c.indexOf('</section>', c.indexOf('id="trending-collections"')) + 10;

const before = c.substring(0, trendingSectionEnd);
const after = c.substring(trendingSectionEnd);

const newCarousels = `

      {/* ===== 🏆 IPL 2026 CHAMPIONS CAROUSEL ===== */}
      <section className="py-20 px-4 border-y border-white/5" id="champions-carousel">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2">
              <span className="text-yellow-500">🏆</span> RCB Champions 2026
            </h2>
            <Link to="/collections/rcb-ipl-2026-champions" className="text-novo-400 hover:text-novo-300 text-sm font-medium transition-colors flex items-center gap-1">
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide">
            {collectionsData.find(c => c.id === 'col_1')?.posters.slice(0, 8).map(poster => (
              <Link key={poster.id} to="/collections/rcb-ipl-2026-champions" className="snap-start shrink-0 w-[200px] md:w-[240px] group block glass-card rounded-2xl overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <PosterImage src={poster.image} alt={poster.title} className="group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className="bg-red-500/20 backdrop-blur text-red-400 border border-red-500/30 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      CHAMPIONS
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-white mb-1 truncate text-sm">{poster.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-novo-400 font-bold text-sm">₹{poster.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 👑 VIRAT KOHLI CAROUSEL ===== */}
      <section className="py-20 px-4 bg-dark-950 border-y border-white/5" id="virat-carousel">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2">
              <span className="text-orange-500">👑</span> King Kohli Collection
            </h2>
            <Link to="/collections/virat-kohli-collection" className="text-novo-400 hover:text-novo-300 text-sm font-medium transition-colors flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide">
            {collectionsData.find(c => c.id === 'col_10')?.posters.slice(0, 8).map(poster => (
              <Link key={poster.id} to="/collections/virat-kohli-collection" className="snap-start shrink-0 w-[200px] md:w-[240px] group block glass-card rounded-2xl overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <PosterImage src={poster.image} alt={poster.title} className="group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className="bg-dark-900/80 backdrop-blur border border-white/10 text-white/80 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      VIRAT KOHLI
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-white mb-1 truncate text-sm">{poster.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-novo-400 font-bold text-sm">₹{poster.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ❤️ RCB FAN FAVORITES CAROUSEL ===== */}
      <section className="py-20 px-4 border-y border-white/5" id="rcb-fan-carousel">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2">
              <span className="text-red-500">❤️</span> RCB Fan Favorites
            </h2>
            <Link to="/collections/rcb-fan-collection" className="text-novo-400 hover:text-novo-300 text-sm font-medium transition-colors flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide">
            {collectionsData.find(c => c.id === 'col_16')?.posters.slice(0, 8).map(poster => (
              <Link key={poster.id} to="/collections/rcb-fan-collection" className="snap-start shrink-0 w-[200px] md:w-[240px] group block glass-card rounded-2xl overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <PosterImage src={poster.image} alt={poster.title} className="group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className="bg-dark-900/80 backdrop-blur border border-white/10 text-white/80 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      FAN CLUB
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-white mb-1 truncate text-sm">{poster.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-novo-400 font-bold text-sm">₹{poster.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
`;

fs.writeFileSync('src/pages/HomePage.jsx', before + newCarousels + after);
console.log('HomePage updated with 3 carousels.');
