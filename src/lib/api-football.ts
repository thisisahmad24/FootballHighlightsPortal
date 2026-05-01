const API_KEY = process.env.API_FOOTBALL_KEY;
const API_URL = 'https://v3.football.api-sports.io';

export async function getMatchHighlights() {
  if (!API_KEY) return [];

  try {
    const response = await fetch(`${API_URL}/highlights`, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) throw new Error('API fetch failed');
    const data = await response.json();
    return data.response || [];
  } catch (error) {
    console.error('API-Football error:', error);
    return [];
  }
}
