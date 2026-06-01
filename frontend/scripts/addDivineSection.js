import fs from 'fs';

let content = fs.readFileSync('src/pages/HomePage.jsx', 'utf-8');

const divineSection = `
      {/* ===== ✨ DIVINE & SPIRITUAL COLLECTION CARD ===== */}
      <section className="py-20 px-4 bg-dark-950 border-y border-white/5" id="divine-collection">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center bg-dark-900 border border-white/5 rounded-3xl p-6 md:p-12 overflow-hidden relative">
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-novo-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="flex-1 z-10">
              <span className="badge-neon text-[10px] py-1 px-3 bg-novo-500/20 text-novo-400 border border-novo-500/30 mb-4 inline-block">
                NEW COLLECTION
              </span>
              <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-4 leading-tight">
                Divine & <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-novo-400 to-novo-600">Spiritual</span>
              </h2>
              <p className="text-white/60 text-lg mb-8 max-w-md">
                Premium divine and spiritual posters featuring gods, temples, sacred symbols, meditation themes, devotional artwork, and inspirational spiritual wall decor.
              </p>
              
              <div className="flex items-center gap-6">
                <Link to="/collections/col_26" className="btn-novo flex items-center gap-2">
                  Explore Collection <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex flex-col">
                  <span className="text-2xl font-display font-bold text-white">
                    {collectionsData.find(c => c.id === 'col_26')?.posters.length || 47}
                  </span>
                  <span className="text-white/40 text-sm uppercase tracking-wider font-bold">Premium Posters</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full relative z-10">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-card shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src={collectionsData.find(c => c.id === 'col_26')?.thumbnail || "/curated/WhatsApp Image 2026-06-01 at 5.14.30 PM.jpeg"} 
                  alt="Divine & Spiritual Collection" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-60" />
              </div>
            </div>

          </div>
        </div>
      </section>
`;

// Insert it before Virat Kohli carousel
const insertPoint = '{/* ===== 👑 VIRAT KOHLI CAROUSEL ===== */}';
if (content.includes(insertPoint)) {
  content = content.replace(insertPoint, divineSection + '\\n      ' + insertPoint);
  fs.writeFileSync('src/pages/HomePage.jsx', content, 'utf-8');
  console.log('Added Divine section to HomePage.jsx!');
} else {
  console.log('Could not find Virat Kohli carousel to insert before.');
}
