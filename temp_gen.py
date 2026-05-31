import json
import random

POSTER_PRICE = 199

def make_poster(p_id, title, tags, img_idx):
    tag = tags[0].replace('-', '')
    return {
        'id': p_id,
        'title': title,
        'image': f'https://loremflickr.com/800/1200/{tag}?lock={img_idx}',
        'price': POSTER_PRICE,
        'downloads': random.randint(100, 5000),
        'tags': tags,
        'isNew': random.random() > 0.8,
        'isTrending': random.random() > 0.7,
        'badge': random.choice(['BESTSELLER', 'TRENDING', 'FAN FAVORITE', None, None, None])
    }

collections = []
c_idx = 1
p_idx = 1

events = [
    ('IPL 2025 Champions', 'cricket', 'IPL 2025 Championship Celebration Posters'),
    ('FIFA World Cup Champions', 'football', 'Historic World Cup Winning Moments'),
    ('ICC Cricket World Cup Moments', 'cricket', 'Legendary Cricket World Cup Posters'),
    ('UEFA Champions League Winners', 'football', 'Champions League Glory Posters'),
    ('Formula 1 World Champions', 'f1', 'F1 Championship Winning Cars and Drivers')
]
for title, tag, desc in events:
    posters = [make_poster(f'p_{p_idx+i}', f'{title} Moment {i+1}', [tag, 'champion', 'event'], p_idx+i) for i in range(10)]
    p_idx += 10
    collections.append({
        'id': f'col_{c_idx}', 'title': title, 'slug': title.lower().replace(' ', '-'),
        'description': desc, 'genre': 'sports', 'genreName': 'Sports Events',
        'priority': 1, 'tags': [tag, 'champion', 'event'], 'posters': posters,
        'thumbnail': f'https://loremflickr.com/1200/800/{tag.replace("-", "")}?lock={c_idx}'
    })
    c_idx += 1

moments = [
    ('Virat Kohli Trophy Celebrations', 'viratkohli', 'Virat Kohli Lifting Trophies'),
    ('Messi World Cup Trophy Lift', 'messi', 'Lionel Messi World Cup Celebration'),
    ('Dhoni World Cup Winning Moments', 'dhoni', 'MS Dhoni 2011 World Cup Six'),
    ('Ronaldo Champions League', 'ronaldo', 'Cristiano Ronaldo UCL Moments')
]
for title, tag, desc in moments:
    posters = [make_poster(f'p_{p_idx+i}', f'{title} Poster {i+1}', [tag, 'moment', 'legend'], p_idx+i) for i in range(8)]
    p_idx += 8
    collections.append({
        'id': f'col_{c_idx}', 'title': title, 'slug': title.lower().replace(' ', '-'),
        'description': desc, 'genre': 'sports', 'genreName': 'Iconic Moments',
        'priority': 2, 'tags': [tag, 'moment'], 'posters': posters,
        'thumbnail': f'https://loremflickr.com/1200/800/{tag.replace("-", "")}?lock={c_idx}'
    })
    c_idx += 1

legends = [
    ('Virat Kohli', 'viratkohli'), ('MS Dhoni', 'dhoni'), ('Rohit Sharma', 'rohitsharma'),
    ('Cristiano Ronaldo', 'ronaldo'), ('Lionel Messi', 'messi'), ('Neymar', 'neymar')
]
for name, tag in legends:
    posters = [make_poster(f'p_{p_idx+i}', f'{name} Legend Poster {i+1}', [tag, 'legend', 'player'], p_idx+i) for i in range(8)]
    p_idx += 8
    collections.append({
        'id': f'col_{c_idx}', 'title': f'{name} Collection', 'slug': name.lower().replace(' ', '-'),
        'description': f'Premium posters of {name}', 'genre': 'athletes', 'genreName': 'Sports Legends',
        'priority': 3, 'tags': [tag, 'legend'], 'posters': posters,
        'thumbnail': f'https://loremflickr.com/1200/800/{tag.replace("-", "")}?lock={c_idx}'
    })
    c_idx += 1

fan_clubs = [
    ('RCB', 'rcb', ['Virat Kohli', 'AB de Villiers', 'Chris Gayle']),
    ('CSK', 'csk', ['MS Dhoni', 'Suresh Raina', 'Ravindra Jadeja']),
    ('MI', 'mi', ['Rohit Sharma', 'Jasprit Bumrah', 'Kieron Pollard']),
    ('Real Madrid', 'realmadrid', ['Cristiano Ronaldo', 'Zinedine Zidane']),
    ('Barcelona', 'barcelona', ['Lionel Messi', 'Xavi', 'Iniesta'])
]
for team, tag, club_legends in fan_clubs:
    posters = [make_poster(f'p_{p_idx+i}', f'{team} Fan Poster {i+1}', [tag, 'team', 'fan-club'], p_idx+i) for i in range(8)]
    p_idx += 8
    collections.append({
        'id': f'col_{c_idx}', 'title': f'{team} Fan Collection', 'slug': team.lower().replace(' ', '-'),
        'description': f'Official fan posters for {team}', 'genre': 'teams', 'genreName': 'Fan Clubs',
        'priority': 4, 'tags': [tag, 'team'], 'legends': club_legends, 'posters': posters,
        'thumbnail': f'https://loremflickr.com/1200/800/{tag.replace("-", "")}?lock={c_idx}'
    })
    c_idx += 1

general = [
    ('Supercars & Hypercars', 'cars', 'cars'),
    ('Anime & Manga', 'anime', 'entertainment'),
    ('Travel & Nature', 'travel', 'lifestyle'),
    ('Motivation & Quotes', 'motivation', 'lifestyle'),
    ('Gaming Setups', 'gaming', 'entertainment')
]
for title, tag, genre in general:
    posters = [make_poster(f'p_{p_idx+i}', f'{title} Poster {i+1}', [tag, genre, 'lifestyle'], p_idx+i) for i in range(8)]
    p_idx += 8
    collections.append({
        'id': f'col_{c_idx}', 'title': title, 'slug': title.lower().replace(' ', '-').replace('&', 'and'),
        'description': f'Premium {title.lower()} posters', 'genre': genre, 'genreName': 'Lifestyle',
        'priority': 5, 'tags': [tag, genre], 'posters': posters,
        'thumbnail': f'https://loremflickr.com/1200/800/{tag}?lock={c_idx}'
    })
    c_idx += 1

js_code = f"""// Auto-generated collections data
import {{ POSTER_SIZES }} from './pricingConfig';

export const collectionsData = {json.dumps(collections, indent=2)};

// Helper Functions
export const getTrendingCollections = () => collectionsData.filter(c => c.priority <= 2).slice(0, 15);
export const getRecentlyAdded = () => collectionsData.filter(c => c.posters.some(p => p.isNew)).slice(0, 10);
export const getDailyFeatured = () => collectionsData.find(c => c.priority === 1) || collectionsData[0];

export const getAllGenres = () => [
  {{ id: 'sports', name: 'Sports Events & Moments' }},
  {{ id: 'athletes', name: 'Sports Legends' }},
  {{ id: 'teams', name: 'Fan Clubs' }},
  {{ id: 'cars', name: 'Cars & Vehicles' }},
  {{ id: 'anime', name: 'Anime & Entertainment' }},
  {{ id: 'lifestyle', name: 'Lifestyle & Motivation' }}
];

export const getCollectionsByGenre = (genreId) => collectionsData.filter(c => c.genre === genreId);

export const getSimilarCollections = (collectionId) => {{
  const target = collectionsData.find(c => c.id === collectionId);
  if (!target) return [];
  return collectionsData.filter(c => c.id !== collectionId && (c.genre === target.genre || c.priority === target.priority)).slice(0, 5);
}};

export const searchProducts = (query) => {{
  const q = query.toLowerCase();
  const results = [];
  
  collectionsData.forEach(collection => {{
    const colMatch = collection.title.toLowerCase().includes(q) || collection.genreName.toLowerCase().includes(q);
    
    collection.posters.forEach(poster => {{
      if (colMatch || poster.title.toLowerCase().includes(q) || poster.tags.some(t => t.toLowerCase().includes(q))) {{
        results.push({{ ...poster, collectionId: collection.id, collectionTitle: collection.title }});
      }}
    }});
  }});
  
  return results.slice(0, 50); // limit results
}};

export const getBestSellers = () => {{
  const allPosters = collectionsData.flatMap(c => c.posters.map(p => ({{...p, collectionId: c.id}})));
  return allPosters.filter(p => p.badge === 'BESTSELLER' || p.badge === 'TRENDING').sort((a, b) => b.downloads - a.downloads).slice(0, 8);
}};
"""

with open('frontend/src/data/collectionsData.js', 'w', encoding='utf-8') as f:
    f.write(js_code)
print('Done!')
