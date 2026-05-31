export const fanClubsData = {
  rcb: {
    id: 'rcb',
    name: 'Royal Challengers Bengaluru',
    shortName: 'RCB',
    sport: 'Cricket',
    league: 'IPL',
    banner: '/curated/rcb.jpg',
    primaryColor: '#EE2737', // Red
    secondaryColor: '#000000', // Black
    history: 'Founded in 2008, RCB is known for its passionate fanbase, the "12th Man Army," and playing bold cricket. Their home ground is the M. Chinnaswamy Stadium.',
    trophies: [
      { name: 'WPL Champions', year: '2024' },
      { name: 'IPL Runners Up', year: '2009, 2011, 2016' }
    ],
    legends: [
      { name: 'Virat Kohli', role: 'Batter', image: '/curated/virat.jpg' },
      { name: 'AB de Villiers', role: 'Batter', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80' },
      { name: 'Chris Gayle', role: 'Batter', image: 'https://images.unsplash.com/photo-1541252879014-686bd71ad349?auto=format&fit=crop&q=80' }
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
    banner: '/curated/csk.jpg',
    primaryColor: '#F9CD05', // Yellow
    secondaryColor: '#0081E9', // Blue
    history: 'One of the most successful franchises in IPL history, known for their consistency and the legendary leadership of MS Dhoni.',
    trophies: [
      { name: 'IPL Champions', year: '2010, 2011, 2018, 2021, 2023' },
      { name: 'CLT20 Champions', year: '2010, 2014' }
    ],
    legends: [
      { name: 'MS Dhoni', role: 'Captain/WK', image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&q=80' },
      { name: 'Suresh Raina', role: 'Batter', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80' },
      { name: 'Ravindra Jadeja', role: 'All-Rounder', image: 'https://images.unsplash.com/photo-1541252879014-686bd71ad349?auto=format&fit=crop&q=80' }
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
    banner: 'https://images.unsplash.com/photo-1518605368461-1e1c312fb1da?auto=format&fit=crop&q=80',
    primaryColor: '#FFFFFF', // White
    secondaryColor: '#00529F', // Blue
    history: 'The Kings of Europe. Founded in 1902, Real Madrid holds the record for the most UEFA Champions League titles and is home to the GalActicos.',
    trophies: [
      { name: 'UCL Champions', year: '15 Times' },
      { name: 'La Liga', year: '36 Times' }
    ],
    legends: [
      { name: 'Cristiano Ronaldo', role: 'Forward', image: '/curated/ronaldo.jpg' },
      { name: 'Zinedine Zidane', role: 'Midfielder', image: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80' },
      { name: 'Sergio Ramos', role: 'Defender', image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80' }
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
    banner: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&q=80',
    primaryColor: '#43A1D5', // Light Blue
    secondaryColor: '#FFFFFF', // White
    history: 'La Albiceleste. Known for producing some of the greatest footballing talents in history, culminating in historic World Cup triumphs.',
    trophies: [
      { name: 'FIFA World Cup', year: '1978, 1986, 2022' },
      { name: 'Copa America', year: '15 Times' }
    ],
    legends: [
      { name: 'Lionel Messi', role: 'Forward', image: '/curated/messi.jpg' },
      { name: 'Diego Maradona', role: 'Midfielder', image: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80' }
    ],
    tags: ['football', 'argentina', 'world-cup', 'messi', 'champion'],
    featuredPosters: ['p_11', 'p_12', 'p_13']
  }
}
