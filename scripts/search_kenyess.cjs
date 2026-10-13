const https = require('https');
const fs = require('fs');

async function searchYahooImages(query) {
  const url = `https://images.search.yahoo.com/search/images?p=${encodeURIComponent(query)}`;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Find rurl / img urls
        const regex = /imgurl=(https%3A%2F%2F[^&]+)/gi;
        const matches = [];
        let m;
        while ((m = regex.exec(data)) !== null) {
          matches.push(decodeURIComponent(m[1]));
        }
        resolve(matches);
      });
    }).on('error', () => resolve([]));
  });
}

(async () => {
  const images = await searchYahooImages('bawang goreng kenyess');
  console.log('Yahoo matches:', images.slice(0, 5));
})();
