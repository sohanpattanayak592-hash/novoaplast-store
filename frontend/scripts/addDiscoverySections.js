import fs from 'fs';

let c = fs.readFileSync('src/pages/HomePage.jsx', 'utf-8');

// I will find the Bestsellers section and prepend my new sections right before it.
const bestsellersSectionStart = c.indexOf('{/* ===== BESTSELLERS GRID ===== */}');

const before = c.substring(0, bestsellersSectionStart);
const after = c.substring(bestsellersSectionStart);

// We need recentlyAdded and popularThisWeek defined in the component.
// We can just get all posters and filter/sort them inline.
const discoverySections = `
      {/* ===== RECENTLY ADDED ===== */}
      <section className="py-24 px-4 bg-dark-900" id="recently-added">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="badge-durable mb-4 inline-flex">Fresh Drops</span>
            <h2 className="section-heading text-white mt-2">
              Recently <span className="text-novo-gradient">Added</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-xl mx-auto">The newest arrivals in our premium poster collection.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {collectionsData.flatMap(c => c.posters.map(p => ({...p, collectionTitle: c.title, collectionId: c.id}))).filter(p => p.isNew).slice(0, 8).map((poster, i) => (
              <motion.div key={poster.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Link to={\`/collections/\${poster.collectionId}\`} className="block glass-card rounded-2xl overflow-hidden group">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <PosterImage src={poster.image} alt={poster.title} className="group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className="bg-dark-900/80 backdrop-blur border border-white/10 text-white/80 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {poster.collectionTitle}
                      </span>
                      <span className="bg-novo-500/20 backdrop-blur text-novo-400 border border-novo-500/30 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        NEW
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-white mb-1 truncate text-sm md:text-base">{poster.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-novo-400 font-bold">₹{poster.price}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POPULAR THIS WEEK ===== */}
      <section className="py-24 px-4 border-y border-white/5" id="popular-this-week">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="badge-durable mb-4 inline-flex">Trending High</span>
            <h2 className="section-heading text-white mt-2">
              Popular <span className="text-novo-gradient">This Week</span>
            </h2>
            <p className="text-white/40 mt-4 max-w-xl mx-auto">Based on the highest views and orders across India.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {collectionsData.flatMap(c => c.posters.map(p => ({...p, collectionTitle: c.title, collectionId: c.id}))).sort((a, b) => b.downloads - a.downloads).slice(0, 8).map((poster, i) => (
              <motion.div key={poster.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Link to={\`/collections/\${poster.collectionId}\`} className="block glass-card rounded-2xl overflow-hidden group">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <PosterImage src={poster.image} alt={poster.title} className="group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className="bg-dark-900/80 backdrop-blur border border-white/10 text-white/80 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {poster.collectionTitle}
                      </span>
                      <span className="bg-orange-500/20 backdrop-blur text-orange-400 border border-orange-500/30 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {Math.floor(poster.downloads / 100) * 100}+ SOLD
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-white mb-1 truncate text-sm md:text-base">{poster.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-novo-400 font-bold">₹{poster.price}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
`;

fs.writeFileSync('src/pages/HomePage.jsx', before + discoverySections + after);
console.log('Discovery Sections added to HomePage.');
