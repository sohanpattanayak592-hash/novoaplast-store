export const fanClubsData = {
  rcb: {
    id: 'rcb',
    name: 'Royal Challengers Bengaluru',
    shortName: 'RCB',
    sport: 'Cricket',
    league: 'IPL',
    banner: 'https://image.pollinations.ai/prompt/Sports%20Fan%20Club%20Poster%201?width=800&height=1200&nologo=true&model=flux',
    primaryColor: '#EE2737', // Red
    secondaryColor: '#000000', // Black
    history: 'Founded in 2008, RCB is known for its passionate fanbase, the "12th Man Army," and playing bold cricket. Their home ground is the M. Chinnaswamy Stadium.',
    trophies: [
      { name: 'WPL Champions', year: '2024' },
      { name: 'IPL Runners Up', year: '2009, 2011, 2016' }
    ],
    legends: [
      { name: 'Virat Kohli', role: 'Batter', image: 'https://image.pollinations.ai/prompt/Sports%20Fan%20Club%20Poster%202?width=800&height=1200&nologo=true&model=flux' },
      { name: 'AB de Villiers', role: 'Batter', image: 'https://image.pollinations.ai/prompt/Sports%20Fan%20Club%20Poster%203?width=800&height=1200&nologo=true&model=flux' },
      { name: 'Chris Gayle', role: 'Batter', image: 'https://image.pollinations.ai/prompt/Sports%20Fan%20Club%20Poster%204?width=800&height=1200&nologo=true&model=flux' }
    ],
    tags: ['cricket', 'rcb', 'ipl', 'virat-kohli', 'bengaluru'],
    featuredPosters: ['p_1', 'p_2', 'p_3'] // Reference IDs from products.js
  },
  csk: {
    id: 'csk',
    name: 'Chennai Super Kings',
    shortName: 'CSK',
    sport: 'Cricket',
    league: 'IPL',
    banner: 'https://image.pollinations.ai/prompt/Sports%20Fan%20Club%20Poster%205?width=800&height=1200&nologo=true&model=flux',
    primaryColor: '#F9CD05', // Yellow
    secondaryColor: '#0081E9', // Blue
    history: 'One of the most successful franchises in IPL history, known for their consistency and the legendary leadership of MS Dhoni.',
    trophies: [
      { name: 'IPL Champions', year: '2010, 2011, 2018, 2021, 2023' },
      { name: 'CLT20 Champions', year: '2010, 2014' }
    ],
    legends: [
      { name: 'MS Dhoni', role: 'Captain/WK', image: 'https://image.pollinations.ai/prompt/Sports%20Fan%20Club%20Poster%206?width=800&height=1200&nologo=true&model=flux' },
      { name: 'Suresh Raina', role: 'Batter', image: 'https://image.pollinations.ai/prompt/Sports%20Fan%20Club%20Poster%207?width=800&height=1200&nologo=true&model=flux' },
      { name: 'Ravindra Jadeja', role: 'All-Rounder', image: 'https://image.pollinations.ai/prompt/Sports%20Fan%20Club%20Poster%208?width=800&height=1200&nologo=true&model=flux' }
    ],
    tags: ['cricket', 'csk', 'ipl', 'ms-dhoni', 'chennai', 'champion'],
    featuredPosters: ['p_4', 'p_5', 'p_6']
  },
  'real-madrid': {
    id: 'real-madrid',
    name: 'Real Madrid',
    shortName: 'RMA',
    sport: 'Football',
    league: 'La Liga',
    banner: 'https://image.pollinations.ai/prompt/Sports%20Fan%20Club%20Poster%209?width=800&height=1200&nologo=true&model=flux',
    primaryColor: '#FFFFFF', // White
    secondaryColor: '#00529F', // Blue
    history: 'The Kings of Europe. Founded in 1902, Real Madrid holds the record for the most UEFA Champions League titles and is home to the Galácticos.',
    trophies: [
      { name: 'UCL Champions', year: '15 Times' },
      { name: 'La Liga', year: '36 Times' }
    ],
    legends: [
      { name: 'Cristiano Ronaldo', role: 'Forward', image: 'https://image.pollinations.ai/prompt/Sports%20Fan%20Club%20Poster%2010?width=800&height=1200&nologo=true&model=flux' },
      { name: 'Zinedine Zidane', role: 'Midfielder', image: 'https://image.pollinations.ai/prompt/Sports%20Fan%20Club%20Poster%2011?width=800&height=1200&nologo=true&model=flux' },
      { name: 'Sergio Ramos', role: 'Defender', image: 'https://image.pollinations.ai/prompt/Sports%20Fan%20Club%20Poster%2012?width=800&height=1200&nologo=true&model=flux' }
    ],
    tags: ['football', 'real-madrid', 'la-liga', 'champions-league', 'ronaldo'],
    featuredPosters: ['p_31', 'p_32', 'p_33']
  },
  argentina: {
    id: 'argentina',
    name: 'Argentina National Football Team',
    shortName: 'ARG',
    sport: 'Football',
    league: 'International',
    banner: 'https://image.pollinations.ai/prompt/Sports%20Fan%20Club%20Poster%2013?width=800&height=1200&nologo=true&model=flux',
    primaryColor: '#43A1D5', // Light Blue
    secondaryColor: '#FFFFFF', // White
    history: 'La Albiceleste. Known for producing some of the greatest footballing talents in history, culminating in historic World Cup triumphs.',
    trophies: [
      { name: 'FIFA World Cup', year: '1978, 1986, 2022' },
      { name: 'Copa America', year: '15 Times' }
    ],
    legends: [
      { name: 'Lionel Messi', role: 'Forward', image: 'https://image.pollinations.ai/prompt/Sports%20Fan%20Club%20Poster%2014?width=800&height=1200&nologo=true&model=flux' },
      { name: 'Diego Maradona', role: 'Midfielder', image: 'https://image.pollinations.ai/prompt/Sports%20Fan%20Club%20Poster%2015?width=800&height=1200&nologo=true&model=flux' }
    ],
    tags: ['football', 'argentina', 'world-cup', 'messi', 'champion'],
    featuredPosters: ['p_11', 'p_12', 'p_13']
  }
}
